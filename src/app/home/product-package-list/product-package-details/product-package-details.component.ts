import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { ProductPackage } from 'src/app/shared/services/system-cloud.models';
import {
  ProductPackageDetailsPresenter,
  ProductPackageDetailsPresenterImpl,
} from './product-package-details.presenter';

@Component({
  selector: 'app-product-package-details',
  templateUrl: './product-package-details.component.html',
  styleUrls: ['./product-package-details.component.scss'],
  providers: [
    {
      provide: ProductPackageDetailsPresenter,
      useClass: ProductPackageDetailsPresenterImpl,
    },
  ],
})
export class ProductPackageDetailsComponent implements OnInit {
  data: ProductPackage;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productPackageDetailsPresenter: ProductPackageDetailsPresenter
  ) {
    route.params
      .pipe(
        filter((item) => item.productPackageId),
        map((params) => params.productPackageId),
        switchMap((item: string) =>
          productPackageDetailsPresenter.getData(item)
        )
      )
      .subscribe((response) => {
        this.data = response;
      });
  }

  ngOnInit(): void {}

  onEditClicked(): void {
    this.productPackageDetailsPresenter
      .onEditProduct(['name', 'code', 'price'], this.data)
      .subscribe((response) => {
        this.data = response;
      });
  }

  onDeleteClicked(): void {
    this.productPackageDetailsPresenter
      .onDeleteProduct(this.data)
      .subscribe((response) => {
        this.router.navigate(['']);
      });
  }
}
