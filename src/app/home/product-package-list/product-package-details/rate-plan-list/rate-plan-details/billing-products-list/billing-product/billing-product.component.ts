import { Component, Input, OnInit } from '@angular/core';
import { BillingProduct } from 'src/app/shared/services/system-cloud.models';
import {
  BillingProductPresenter,
  BillingProductPresenterImpl,
} from './billing-product.presenter';

@Component({
  selector: 'app-billing-product',
  templateUrl: './billing-product.component.html',
  styleUrls: ['./billing-product.component.scss'],
  providers: [
    { provide: BillingProductPresenter, useClass: BillingProductPresenterImpl },
  ],
})
export class BillingProductComponent implements OnInit {
  @Input() billingProduct: BillingProduct;
  constructor() {}

  ngOnInit(): void {}
}
