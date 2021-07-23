import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MethodsService } from 'src/app/home/services/methods.service';
import { EditPresenter } from 'src/app/shared/classes/edit.component';
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
  abstract onEditBillingProduct(
    fields: string[],
    productPackageId: string,
    data: BillingProduct
  ): Observable<BillingProduct>;
  abstract onDeleteBillingProduct(
    productPackageId: string,
    data: BillingProduct
  ): Observable<BillingProduct>;
}

@Injectable()
export class BillingProductsListPresenterImpl
  extends EditPresenter
  implements BillingProductsListPresenter
{
  constructor(protected methodsService: MethodsService) {
    super(methodsService);
  }

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
    return this.methodsService.add<BillingProduct, EditedCreatedObject>(
      'Create Billing Product',
      fields,
      path
    );
  }

  onEditBillingProduct(
    fields: string[],
    productPackageId: string,
    data: BillingProduct
  ): Observable<BillingProduct> {
    return this.editBillingProduct(fields, productPackageId, data);
  }

  onDeleteBillingProduct(
    productPackageId: string,
    data: BillingProduct
  ): Observable<BillingProduct> {
    return this.deleteBillingProduct(productPackageId, data);
  }
}
