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
  @Input() productPackageId: string;
  @Input() ratePlanId: string;

  constructor(
    private billingProductsListPresenter: BillingProductsListPresenter
  ) {}

  ngOnInit(): void {}

  onAddBillingProductClicked() {
    this.billingProductsListPresenter
      .addBillingProduct(
        ['name', 'code', 'price'],
        this.productPackageId,
        this.ratePlanId
      )
      .subscribe((response) => {
        this.billingProducts.push(response);
      });
  }

  onEditBillingProductClicked(billingProduct: BillingProduct): void {
    this.billingProductsListPresenter
      .onEditBillingProduct(
        ['name', 'code', 'price'],
        this.productPackageId,
        billingProduct
      )
      .subscribe((response) => {
        this.billingProducts = this.billingProducts.map((billingProduct) => {
          if (billingProduct.id === response.id) {
            return response;
          } else {
            return billingProduct;
          }
        });
      });
  }

  onDeleteBillingProductClicked(billingProduct: BillingProduct): void {
    this.billingProductsListPresenter
      .onDeleteBillingProduct(this.productPackageId, billingProduct)
      .subscribe((response) => {
        const foundIndex = this.billingProducts.findIndex(
          (item) => item.id == response.id
        );
        this.billingProducts.splice(foundIndex, 1);
      });
  }
}
