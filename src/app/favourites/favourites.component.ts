// favourites.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedItemsService } from '../Services/liked-items.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule],
  template: `
 <div>
      <h2>Favorites</h2>
      <table class="favorites-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Units Available</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of likedItems">
            <td><img [src]="item.photo" alt="{{ item.name }}" class="table-photo"></td>
            <td>{{ item.name }}</td>
            <td>{{ item.availableUnits }}</td>
            <td>{{ item.price }} USD</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  likedItems: any[] = []; 

  constructor(private likedItemsService: LikedItemsService) {}

  ngOnInit(): void {
    this.likedItems = this.likedItemsService.getLikedItems();
  }
}
