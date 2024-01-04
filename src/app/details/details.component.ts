import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'
import { RouterModule} from '@angular/router'
import { HousingService } from '../Services/housing.service';
import { HousingLocation } from '../housing-location';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from '../Services/shared-data.service';
import { Router } from '@angular/router';

declare var intlTelInput: any;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatInputModule, MatNativeDateModule, RouterModule,FormsModule],
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
    <section>
    <h2 class="section-heading">Apply now to live here</h2>
    <form class="form" (submit)="submitForm()">
    <div class="submitFormWrapper">
    <section class="user-credentials-1">

    <label for="firstName">First Name</label>
    <input id="firstName" type="text" autocomplete="off" maxlength="10" [(ngModel)]="formData.firstName" #firstNameInput="ngModel" name="firstName" required>
    <div class="formValidation" *ngIf="isFieldInvalid(firstNameInput)">Please enter your <span class="fieldValidation">First Name</span></div>

    <label for="lastName">Last Name</label>
    <input id="lastName"  type="text" autocomplete="off" maxlength="10" autocapitalize="on" [(ngModel)]="formData.lastName" #lastNameInput="ngModel" name="lastName" required>
    <div class="formValidation" *ngIf="isFieldInvalid(lastNameInput)">Please enter your<span class="fieldValidation">Last Name</span></div>

    <label for="email">Email</label>
    <input id="email"  type="text" autocomplete="off" placeholder="example@hotmail.com" maxlength="20" [(ngModel)]="formData.email" #emailInput="ngModel" name="email" required>
    <div class="formValidation" *ngIf="isFieldInvalid(emailInput)">Please enter your<span class="fieldValidation">Email</span></div>
  </section>
    <section class="user-credentials-2">

    <label for="address">Address</label>
    <input id="address" type="tel" autocomplete="off" [(ngModel)]="formData.address" #addressInput="ngModel" name="address" required>
    <div class="formValidation" *ngIf="isFieldInvalid(addressInput)">Please enter your<span class="fieldValidation">Address</span></div>

    <label for="phoneNumber">Phone Number</label>
    <input id="phoneNumber" type="text" intlTelInput autocomplete="off" maxlength="10" [(ngModel)]="formData.phoneNumber" #phoneNumberInput="ngModel" name="phoneNumber" required> 
    <div class="formValidation" *ngIf="isFieldInvalid(phoneNumberInput)">Please enter your<span class="fieldValidation">Phone Number</span></div>
    <mat-form-field>
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" autocomplete="off" placeholder="MM/DD/YYYY" [(ngModel)]="formData.date" #dateInput="ngModel" name="date" required>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
<div class="formValidation" *ngIf="isFieldInvalid(dateInput)">Please enter your<span class="fieldValidation">Date Of Birth</span></div>
  </section>
</div>
<button class="primary" type="submit" [disabled]="isFormInvalid()">Apply Now</button>

<div *ngIf="isFormInvalid()">
  <p style="color: red;">{{ invalidMessage }}</p>
</div>
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
  @Input() housingLocation: HousingLocation | undefined;
  invalidMessage: string = '';
  formData = { firstName: '', lastName: '', email: '', address: '', phoneNumber: '', date: '' };

  ngOnInit(): void {
    const input = document.querySelector("#phoneNumber");
    const iti = intlTelInput(input, {
      initialCountry: 'LB',
      separateDialCode: true,
      formatOnDisplay: true
        });
  }

  submitForm() {
    this.SharedDataService.sendFormData(this.formData);
    this.router.navigate(['/purchase', this.housingLocation?.id]);
  }

  isFieldInvalid(field: any): boolean {
    return field.touched && field.invalid;
  }

  isFormInvalid(): boolean {
    return !!(this.isFieldInvalid({ touched: true, invalid: !this.formData.firstName  }) ||
             this.isFieldInvalid({ touched: true, invalid: !this.formData.lastName }) ||
             this.isFieldInvalid({ touched: true, invalid: !this.formData.email }) ||
             this.isFieldInvalid({ touched: true, invalid: !this.formData.address }) ||
             this.isFieldInvalid({ touched: true, invalid: !this.formData.phoneNumber }) ||
             this.isFieldInvalid({ touched: true, invalid: !this.formData.date }));
  }

  constructor(private SharedDataService: SharedDataService, private router: Router) {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }
}
