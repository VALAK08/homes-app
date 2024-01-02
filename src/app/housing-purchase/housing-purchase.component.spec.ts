import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousingPurchaseComponent } from './housing-purchase.component';

describe('HousingPurchaseComponent', () => {
  let component: HousingPurchaseComponent;
  let fixture: ComponentFixture<HousingPurchaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HousingPurchaseComponent]
    });
    fixture = TestBed.createComponent(HousingPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
