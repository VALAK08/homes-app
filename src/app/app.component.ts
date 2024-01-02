import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule} from '@angular/router'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { HousingPurchaseComponent } from './housing-purchase/housing-purchase.component';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
  <main>
  <header class="brand-name">
  <img [routerLink]="['/']" class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
  <button class="menu" mat-button [matMenuTriggerFor]="menu">Homes Menu</button>
  <mat-menu #menu="matMenu">
  <button [routerLink]="['/favourites']" mat-menu-item>My Favourites</button>
</mat-menu>
<h1 data-text="back in black">Unlock Your Dream
<img class="home-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true"> 
   with Us!</h1>
  </header>
  <section class="content">
  <router-outlet></router-outlet>
  </section>
  <!-- <footer class="footer-section">
        <div class="container">
            <div class="footer-cta pt-5 pb-5">
                <div class="row">
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="fas fa-map-marker-alt"></i>
                            <div class="cta-text">
                                <h4>Find us</h4>
                                <span>Hazmieh, S&S Bldg, 5th Floor</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="fas fa-phone"></i>
                            <div class="cta-text">
                                <h4>Call us</h4>
                                <span>+0961 78 964 421</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-md-4 mb-30">
                        <div class="single-cta">
                            <i class="far fa-envelope-open"></i>
                            <div class="cta-text">
                                <h4>Mail us</h4>
                                <span>ali.a.mk@hotmail.com</span>
                            </div>
                        </div>
                    </div>
                      <div class="copyrights">
                        Copyright © 2023, All Right Reserved 
                        <img class="logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
                      </div>
                </div>
            </div>
        </div>
    </footer> -->
  </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatButtonModule, HousingPurchaseComponent]
})
export class AppComponent {
  title = 'homes';
}
