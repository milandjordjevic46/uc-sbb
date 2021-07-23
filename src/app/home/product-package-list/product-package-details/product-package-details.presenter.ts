import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditPresenter } from 'src/app/shared/classes/edit.component';
import { ProductPackage } from 'src/app/shared/services/system-cloud.models';
import { CloudService } from '../../services/cloud.service';
import { MethodsService } from '../../services/methods.service';

export abstract class ProductPackageDetailsPresenter {
  abstract getData(id: string): Observable<ProductPackage>;
  abstract onEditProduct(
    fields: string[],
    data: ProductPackage
  ): Observable<ProductPackage>;
  abstract onDeleteProduct(data: ProductPackage): Observable<ProductPackage>;
}

@Injectable()
export class ProductPackageDetailsPresenterImpl
  extends EditPresenter
  implements ProductPackageDetailsPresenter
{
  constructor(
    private cloudService: CloudService,
    protected methodsService: MethodsService
  ) {
    super(methodsService);
  }

  getData(id: string): Observable<ProductPackage> {
    return this.cloudService.get<ProductPackage>('product_package/' + id);
  }

  onEditProduct(
    fields: string[],
    data: ProductPackage
  ): Observable<ProductPackage> {
    return this.editProduct(fields, data);
  }

  onDeleteProduct(data: ProductPackage): Observable<ProductPackage> {
    return this.deleteProduct(data);
  }
}
