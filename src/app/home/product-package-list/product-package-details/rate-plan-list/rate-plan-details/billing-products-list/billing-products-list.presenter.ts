import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MethodsService } from 'src/app/home/services/methods.service';
import {
  BillingProduct,
  EditedCreatedObject,
} from 'src/app/shared/services/system-cloud.models';

export abstract class BillingProductsListPresenter {
  abstract addBillingProduct(
    fields: string[],
    productPackageId: string,
    ratePlanId: string
  ): Observable<BillingProduct>;
}

@Injectable()
export class BillingProductsListPresenterImpl
  implements BillingProductsListPresenter
{
  constructor(private methodsService: MethodsService) {}

  addBillingProduct(
    fields: string[],
    productPackageId: string,
    ratePlanId: string
  ): Observable<BillingProduct> {
    const path =
      'product_package/' +
      productPackageId +
      '/rate_plan/' +
      ratePlanId +
      '/billing_product';
    return this.methodsService
      .add<BillingProduct, EditedCreatedObject>(
        'Create Billing Product',
        'create',
        fields,
        path
      )
      .pipe(
        map((item) => {
          item.createdAt = item.createdAt.split('T')[0];
          return item;
        })
      );
  }
}
