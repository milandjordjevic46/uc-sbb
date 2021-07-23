import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MethodsService } from 'src/app/home/services/methods.service';
import {
  BillingProduct,
  EditedCreatedObject,
  ProductPackage,
  RatePlan,
} from '../services/system-cloud.models';

export class EditPresenter {
  constructor(protected methodsService: MethodsService) {}

  editProduct(
    fields: string[],
    data: ProductPackage
  ): Observable<ProductPackage> {
    return this.methodsService
      .edit<ProductPackage, EditedCreatedObject>(
        'Edit Product Package',
        fields,
        'product_package/' + data.id,
        data
      )
      .pipe(
        map((item) => {
          item.rate_plans = data.rate_plans;
          return item;
        })
      );
  }

  editRatePlan(fields: string[], data: RatePlan): Observable<RatePlan> {
    const path =
      '/product_package/' + data.product_packageId + '/rate_plan/' + data.id;
    return this.methodsService.edit<RatePlan, EditedCreatedObject>(
      'Edit Rate Plan',
      fields,
      path,
      data
    );
  }

  editBillingProduct(
    fields: string[],
    productPackageId: string,
    data: BillingProduct
  ): Observable<BillingProduct> {
    const path =
      '/product_package/' +
      productPackageId +
      '/rate_plan/' +
      data.rate_planId +
      '/billing_product/' +
      data.id;
    return this.methodsService.edit<BillingProduct, EditedCreatedObject>(
      'Edit Billing Product',
      fields,
      path,
      data
    );
  }

  deleteProduct(data: ProductPackage): Observable<ProductPackage> {
    return this.methodsService.delete<ProductPackage, ProductPackage>(
      'Delete Product Package',
      '/product_package/' + data.id,
      data
    );
  }

  deleteRatePlan(data: RatePlan): Observable<RatePlan> {
    return this.methodsService.delete<RatePlan, RatePlan>(
      'Delete Rate Plan',
      '/product_package/' + data.product_packageId + '/rate_plan/' + data.id,
      data
    );
  }

  deleteBillingProduct(
    productPackageId: string,
    data: BillingProduct
  ): Observable<BillingProduct> {
    return this.methodsService.delete<BillingProduct, BillingProduct>(
      'Delete Billing Product',
      '/product_package/' +
        productPackageId +
        '/rate_plan/' +
        data.rate_planId +
        '/billing_product/' +
        data.id,
      data
    );
  }
}
