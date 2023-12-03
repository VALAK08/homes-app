import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikedItemsService {
  private likedItems: Set<any> = new Set<any>();

  addLikedItem(item: any): void {
    this.likedItems.add(item);
  }

  removeLikedItem(item: any): void {
    this.likedItems.delete(item);
  }

  getLikedItems(): any[] {
    return Array.from(this.likedItems);
  }
}
