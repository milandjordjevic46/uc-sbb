import { Component, Input, OnInit } from '@angular/core';
import { ProductPackage } from 'src/app/shared/services/system-cloud.models';
import {
  ProductPackagePresenter,
  ProductPackagePresenterImpl,
} from './product-package.presenter';

@Component({
  selector: 'app-product-package',
  templateUrl: './product-package.component.html',
  styleUrls: ['./product-package.component.scss'],
  providers: [
    { provide: ProductPackagePresenter, useClass: ProductPackagePresenterImpl },
  ],
})
export class ProductPackageComponent implements OnInit {
  @Input() productPackage: ProductPackage;
  constructor() {}

  ngOnInit(): void {}
}
