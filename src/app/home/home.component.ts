import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../Services/housing.service';
import { PriceSortPipe } from '../price-sort.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';

export type SORT_ORDER = 'asc' | 'desc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HousingLocationComponent,
    PriceSortPipe,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  template: `
  <div class="header-wrapper"> 
    <section>
      <form>
        <input type="text" autocomplete="off" placeholder="Filter by city" #filter />
        <button class="primary" type="button" (click)="filterResults(filter.value)">
          Search
        </button>
      </form>
    </section>
    <section>
      <mat-form-field>
        <mat-label for="sortOrder">Sort Price</mat-label>
        <mat-select id="sortOrder" matNativeControl [(ngModel)]="sortOrder">
          <mat-option value="asc">Ascending</mat-option>
          <mat-option value="desc">Descending</mat-option>
        </mat-select>
      </mat-form-field>
    </section>
    </div>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of visibleLocationList | priceSort:sortOrder"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
          <button class="show-more-btn" (click)="toggleShowMore()">
        {{ showMore ? 'Show More ⮟' : 'Show Less ⮝' }}
      </button>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  pageSize = 4;
  totalItems = 10;
  sortOrder: SORT_ORDER = 'asc';
  showMore = true; 

  constructor() {
    this.housingService
      .getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList.slice(0, this.pageSize);
      });
  }

  get visibleLocationList(): HousingLocation[] {
    return this.showMore
      ? this.filteredLocationList.slice(0, this.pageSize)
      : this.filteredLocationList;
  }

  // Search
  filterResults(text: string) {
    if (!text) this.filteredLocationList = this.housingLocationList;

    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  // Show More/Less Toggle
  toggleShowMore(): void {
    this.showMore = !this.showMore;
    this.filteredLocationList = this.showMore
      ? this.housingLocationList.slice(0, this.pageSize)
      : this.housingLocationList;
  }
}
