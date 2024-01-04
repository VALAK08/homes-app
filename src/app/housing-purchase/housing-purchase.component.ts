import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../Services/shared-data.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../Services/housing.service';
import { HousingLocation } from '../housing-location';

@Component({
selector: 'app-housing-purchase',
standalone: true,
imports: [CommonModule],
template: `
<section class="section">
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="main-timeline">
          <div class="timeline">
            <a href="#" class="timeline-content">
              <div class="timeline-icon"><i class="fa fa-user"></i></div>
              <h3 class="title">Client Information</h3>
              <div class="purchased-Item">
                <table>
                  <tr>
                    <td>First Name</td>
                    <td>{{ receivedData?.firstName }}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{{ receivedData?.lastName }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{ receivedData?.email }}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{{ receivedData?.address }}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{{ receivedData?.phoneNumber }}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{{ receivedData?.date }}</td>
                  </tr>
                </table>
              </div>
            </a>
          </div>
          <div class="timeline">
            <a href="#" class="timeline-content">
              <div class="timeline-icon"><i class="fa fa-home"></i></div>
              <h3 class="title">House Information</h3>
              <table class="favorites-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <td>
                      <img class="listing-photo" [src]="housingLocation?.photo">
                    </td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{{ housingLocation?.name }}</td>
                  </tr>
                  <tr>
                    <th>Location</th>
                    <td>{{ housingLocation?.city }}</td>
                  </tr>
                  <tr>
                    <th>Units Available</th>
                    <td>{{ housingLocation?.availableUnits }}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td><img class="currency" src="/assets/usd.png"> {{ housingLocation?.price}}</td>
                  </tr>
                  <tr>
                    <th>Wifi</th>
                    <td>
                      <img class="icons"
                        [src]="housingLocation?.wifi ? '/assets/available.png' : '/assets/notavailable.png'">
                    </td>
                  </tr>
                  <tr>
                    <th>Laundry</th>
                    <td>
                      <img class="icons"
                        [src]="housingLocation?.laundry ? '/assets/available.png' : '/assets/notavailable.png'">
                    </td>
                  </tr>
                </thead>
              </table>
            </a>
          </div>
          <div class="timeline">
            <a href="#" class="timeline-content">
              <div class="timeline-icon"><i class="fa fa-credit-card"></i></div>
              <h3 class="title">Payment Information</h3>
              <div class="container">
                <form>
                  <div class="row">
                    <div class="col-50">
                      <h3>Billing Address</h3>
                      <label for="fname"><i class="fa fa-user"></i> Full Name</label>
                      <input type="text" id="fname" name="firstname"
                        value="{{ receivedData?.firstName + ' ' + receivedData?.lastName }}">
                      <label for="email"><i class="fa fa-envelope"></i> Email</label>
                      <input type="text" id="email" name="email" value="{{ receivedData?.email }}">
                      <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
                      <input type="text" id="adr" name="address" value="{{ receivedData?.address }}">
                      <label for="city"><i class="fa fa-institution"></i> City</label>
                      <input type="text" id="city" name="city" placeholder="New York">

                      <div class="row">
                        <div class="col-50">
                          <label for="state">State</label>
                          <input type="text" id="state" name="state" placeholder="NY">
                        </div>
                        <div class="col-50">
                          <label for="zip">Zip</label>
                          <input type="text" id="zip" name="zip" placeholder="10001">
                        </div>
                      </div>
                    </div>

                    <div class="col-50">
                      <h3>Payment</h3>
                      <label for="fname">Accepted Cards</label>
                      <div class="icon-container">
                        <i class="fa fa-cc-visa" style="color:navy;"></i>
                        <i class="fa fa-cc-amex" style="color:blue;"></i>
                        <i class="fa fa-cc-mastercard" style="color:red;"></i>
                        <i class="fa fa-cc-discover" style="color:orange;"></i>
                      </div>
                      <label for="cname">Name on Card</label>
                      <input type="text" id="cname" name="cardname"
                        value="{{ receivedData?.firstName + ' ' + receivedData?.lastName  }}">
                      <label for="ccnum">Credit card number</label>
                      <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444">
                      <label for="expmonth">Exp Month</label>
                      <input type="text" id="expmonth" name="expmonth" placeholder="September">
                      <div class="row">
                        <div class="col-50">
                          <label for="expyear">Exp Year</label>
                          <input type="text" id="expyear" name="expyear" placeholder="2018">
                        </div>
                        <div class="col-50">
                          <label for="cvv">CVV</label>
                          <input type="text" id="cvv" name="cvv" placeholder="352">
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </a>
          </div>
          <div class="timeline">
            <a href="#" class="timeline-content">
              <div class="timeline-icon"><i class="fa fa-briefcase"></i></div>
              <h3 class="title">PROPERTY PURCHASE AGREEMENT</h3>
              <section>
                <h2>1. Purchase Price:</h2>
                <p>The agreed-upon purchase price for the property located at <strong>{{ housingLocation?.city
                    }}</strong> is <strong>{{'$'+ housingLocation?.price}}</strong>.</p>
              </section>

              <section>
                <h2>2. Deposit:</h2>
                <p>The buyer agrees to submit a deposit of <strong>{{'$'+ housingLocation?.price}}</strong> within 5
                  business days of the acceptance of this agreement. The deposit will be held in escrow until closing.
                </p>
              </section>

              <section>
                <h2>3. Inspection:</h2>
                <p>The buyer has the right to inspect the property within 10 days after the acceptance of this
                  agreement. Any issues discovered during the inspection may be negotiated for repair or credit.</p>
              </section>

              <section>
                <h2>4. Financing:</h2>
                <p>This purchase is contingent upon the buyer securing a mortgage within 30 days. If financing is not
                  obtained within the specified period, either party may terminate the agreement.</p>
              </section>

              <section>
                <h2>5. Closing:</h2>
                <p>The closing date shall be on or before <strong>June 28 2024</strong>, or as mutually agreed upon. At
                  closing, the seller will provide a clear and marketable title to the property.</p>
              </section>

              <section>
                <h2>6. Contingencies:</h2>
                <p>This agreement is contingent upon the successful resolution of inspection results, financing
                  approval, and any necessary repairs.</p>
              </section>
              <section>
                <h2>7. Property Condition:</h2>
                <p>The property is sold in its current condition. The seller is not obligated to make any repairs unless
                  agreed upon in writing.</p>
              </section>

              <section>
                <h2>8. Miscellaneous:</h2>
                <p>Any modifications to this agreement must be in writing and signed by both parties. This agreement
                  represents the entire understanding between the buyer and seller.</p>
              </section>
            </a>
          </div>
        </div>
      </div>
    </div>
    <input type="submit" value="Finalize Your Property Purchase" class="btn">
  </div>
</section>
`,
styleUrls: ['./housing-purchase.component.css']
})
export class HousingPurchaseComponent {
receivedData: any;
subscription: Subscription;
route: ActivatedRoute = inject(ActivatedRoute);
housingService = inject(HousingService);
housingLocation: HousingLocation | undefined;

constructor(private SharedDataService: SharedDataService) {
this.subscription = this.SharedDataService.data$.subscribe((data) => {
this.receivedData = data;
});

const housingLocationId = Number(this.route.snapshot.params['id']);
this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
this.housingLocation = housingLocation;
})
}
}