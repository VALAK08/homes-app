import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { RouterModule} from '@angular/router'
import { HousingService } from '../Services/housing.service';
import { HousingLocation } from '../housing-location';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { Subject } from 'rxjs';
import { SharedDataService } from '../Services/shared-data.service';

declare var intlTelInput: any;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, RouterModule],
  template: `
   <article class="article">
    <img class="listing-photo" [src]="housingLocation?.photo">
    <div class="housing-details">
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}
      </p>
    </section>
    <section class="listing-features">
      <h2 class="section-heading">About this housing location </h2>
      <table class="housing-info-table">
  <tr>
    <td>Units Available</td>
    <td>{{housingLocation?.availableUnits}}</td>
  </tr>
  <tr>
    <td>Wifi</td>
    <td><img class="icons" [src]="housingLocation?.wifi ? '/assets/available.png' : '/assets/notavailable.png'"></td>
  </tr>
  <tr>
    <td>Laundry</td>
    <td><img class="icons" [src]="housingLocation?.laundry ? '/assets/available.png' : '/assets/notavailable.png'"></td>
  </tr>
  </table>
    </section>
    <section class="listing-apply">
    <h2 class="section-heading">Apply now to live here</h2>
    <form class="form" [formGroup]="applyForm">
    <section class="user-credentials-1">
    <label for="first-name">First Name</label>
    <input id="firstName" type="text" autocomplete="off" maxlength="10" autocapitalize="on" formControlName="firstName">
    <div class="formValidation" *ngIf="applyForm.get('firstName')?.hasError('required') && applyForm.get('firstName')?.touched">
    Kindly enter your <span class="fieldValidation">First Name</span>
    </div>
    <label for="last-tname">Last Name</label>
    <input id="lastName"  type="text" autocomplete="off" maxlength="10" autocapitalize="on" formControlName="lastName">
    <div class="formValidation" *ngIf="applyForm.get('lastName')?.hasError('required') && applyForm.get('lastName')?.touched">
    Kindly enter your <span class="fieldValidation">Last Name</span>
    </div>
    <label for="email">Email</label>
    <input id="email"  type="text" autocomplete="off" maxlength="20" autocapitalize="on" formControlName="email">
    <div class="formValidation" *ngIf="applyForm.get('email')?.hasError('required') && applyForm.get('email')?.touched">
    Kindly enter your <span class="fieldValidation">Email</span>
    </div>
    </section>
    <section class="user-credentials-2">
    <label for="address">Address</label>
    <input id="address" type="tel" autocomplete="off"  formControlName="address">
    <div class="formValidation" *ngIf="applyForm.get('address')?.hasError('required') && applyForm.get('address')?.touched">
    Kindly enter your <span class="fieldValidation">Address</span>
    </div>
    <label for="phone-number">Phone Number</label>
    <input id="phoneNumber" type="text" intlTelInput autocomplete="off" pattern="^[0-9]+$" maxlength="10" formControlName="phoneNumber">
    <div class="formValidation" *ngIf="applyForm.get('phoneNumber')?.hasError('required') && applyForm.get('phoneNumber')?.touched">
    Kindly enter your <span class="fieldValidation">Phone Number</span>
    </div>
    <mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" placeholder="MM/DD/YYYY">
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
  </section>
  <button [routerLink]="['/purchase']" class="primary" type="submit" (submit)="submitForm()">Apply Now</button>
</form> 
  </section>
  </div>
   </article> 
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  ngOnInit(): void {
    const input = document.querySelector("#phoneNumber");
    const iti = intlTelInput(input, {
      initialCountry: 'LB',
      separateDialCode: true,
      formatOnDisplay: true
        });
  }

  formData = { firstName: '', lastName: '', email: '', address: '',phoneNumber: '' };
  private dataSubject = new Subject<{ [key: string]: string }>();
  data$ = this.dataSubject.asObservable();

  submitData() {
    this.dataSubject.next(this.formData);
  }

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required, Validators.minLength(10)]),
    phoneNumber: new FormControl('', Validators.required)
  })

    submitForm() {
    if (this.applyForm.valid) {
      this.SharedDataService.sendFormData(this.applyForm.value);
    }
  }

  constructor(private fb: FormBuilder, private SharedDataService: SharedDataService) {

    this.applyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }
}
