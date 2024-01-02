import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../details/details.component';
import { SharedDataService } from '../Services/shared-data.service';

@Component({
  selector: 'app-housing-purchase',
  standalone: true,
  imports: [CommonModule],
  template: `
        <p>Received Data: {{ receivedData | json }}</p>
  `,
  styleUrls: ['./housing-purchase.component.css']
})
export class HousingPurchaseComponent {
  receivedData: any;

  ngOnInit() {
    this.SharedDataService.getFormData().subscribe((data) => {
      this.receivedData = data;
    });
  }

  constructor(private SharedDataService: SharedDataService) {}
}
