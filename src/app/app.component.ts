import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule} from '@angular/router'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@Component({
  standalone: true,
  selector: 'app-root',
  template: `
  <main>
  <header class="brand-name">
  <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
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
  </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [HomeComponent, RouterModule, MatPaginatorModule, MatTableModule, MatMenuModule, MatButtonModule]
})
export class AppComponent {
  title = 'homes';
}
