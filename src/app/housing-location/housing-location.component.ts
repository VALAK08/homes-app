import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housing-location';
import { RouterModule } from '@angular/router';
import { LikedItemsService } from '../Services/liked-items.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <section class="housing-location-wrapper">
      <div class="img-hover-zoom">
        <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
      </div>
      <h2 class="listing-heading">{{ housingLocation.name}}</h2>
      <button class="btnFavorite" (click)="toggleFavorite(housingLocation)">
        {{ isFavorite(housingLocation) ? 'Remove from Favorites' : 'Add to Favorites' }}
        <mat-icon [color]="isFavorite(housingLocation) ? 'warn' : ''">favorite</mat-icon>
      </button>
      <p class="listing-location">{{  housingLocation.name}}, {{ housingLocation.state}}</p>
      <p class="listing-price">Price: {{  housingLocation.price}} USD</p>
      <a [routerLink]="['/details', housingLocation.id]" class="btn-learn">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css']
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;

  constructor(private likedItemsService: LikedItemsService) {}

  toggleFavorite(housingLocation: HousingLocation): void {
    if (this.isFavorite(housingLocation)) {
      this.likedItemsService.removeLikedItem(housingLocation);
    } else {
      this.likedItemsService.addLikedItem(housingLocation);
    }
  }

  isFavorite(housingLocation: HousingLocation): boolean {
    return this.likedItemsService.getLikedItems().includes(housingLocation);
  }
}

