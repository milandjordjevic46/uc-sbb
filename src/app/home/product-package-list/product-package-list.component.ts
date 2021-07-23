import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductPackage } from 'src/app/shared/services/system-cloud.models';
import {
  ProductPackageListPresenter,
  ProductPackageListPresenterImpl,
} from './product-package-list.presenter';

@Component({
  selector: 'app-product-package-list',
  templateUrl: './product-package-list.component.html',
  styleUrls: ['./product-package-list.component.scss'],
  providers: [
    {
      provide: ProductPackageListPresenter,
      useClass: ProductPackageListPresenterImpl,
    },
  ],
})
export class ProductPackageListComponent implements OnInit {
  data: ProductPackage[];
  constructor(
    private productPackageListPresenter: ProductPackageListPresenter
  ) {
    this.productPackageListPresenter
      .getData()
      .pipe(filter((item) => item !== undefined))
      .subscribe((response) => {
        this.data = response;
      });
  }

  ngOnInit(): void {}

  onDetailsClicked(id: string): void {
    this.productPackageListPresenter.goToDetails(id);
  }

  onAddClicked(): void {
    this.productPackageListPresenter
      .addProduct(['name', 'code', 'price'])
      .subscribe((response) => {
        this.data.push(response);
      });
  }

  onEditClicked(productPackage: ProductPackage): void {
    this.productPackageListPresenter
      .onEditProduct(['name', 'code', 'price'], productPackage)
      .subscribe((response) => {
        this.data = this.data.map((pp) => {
          if (pp.id == response.id) {
            return response;
          } else {
            return pp;
          }
        });
      });
  }

  onDeleteClicked(productPackage: ProductPackage): void {
    this.productPackageListPresenter
      .onDeleteProduct(productPackage)
      .subscribe((response) => {
        const foundIndex = this.data.findIndex(
          (item) => item.id == response.id
        );
        this.data.splice(foundIndex, 1);
      });
  }
}
