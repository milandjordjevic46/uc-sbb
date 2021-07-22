import { Component, Input, OnInit } from '@angular/core';
import { BillingProduct } from 'src/app/shared/services/system-cloud.models';
import {
  BillingProductsListPresenter,
  BillingProductsListPresenterImpl,
} from './billing-products-list.presenter';

@Component({
  selector: 'app-billing-products-list',
  templateUrl: './billing-products-list.component.html',
  styleUrls: ['./billing-products-list.component.scss'],
  providers: [
    {
      provide: BillingProductsListPresenter,
      useClass: BillingProductsListPresenterImpl,
    },
  ],
})
export class BillingProductsListComponent implements OnInit {
  @Input() billingProducts: BillingProduct[];

  constructor() {}

  ngOnInit(): void {}
}
