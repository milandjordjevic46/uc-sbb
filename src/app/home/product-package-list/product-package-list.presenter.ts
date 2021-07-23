import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EditPresenter } from 'src/app/shared/classes/edit.component';
import {
  EditedCreatedObject,
  ProductPackage,
} from 'src/app/shared/services/system-cloud.models';
import { CloudService } from '../services/cloud.service';
import { MethodsService } from '../services/methods.service';

export abstract class ProductPackageListPresenter {
  abstract getData(): Observable<ProductPackage[]>;
  abstract goToDetails(id: string): void;
  abstract addProduct(fields: string[]): Observable<ProductPackage>;
  abstract onEditProduct(
    fields: string[],
    data: ProductPackage
  ): Observable<ProductPackage>;
  abstract onDeleteProduct(data: ProductPackage): Observable<ProductPackage>;
}

@Injectable()
export class ProductPackageListPresenterImpl
  extends EditPresenter
  implements ProductPackageListPresenter
{
  constructor(
    private cloudService: CloudService,
    private router: Router,
    protected methodsService: MethodsService
  ) {
    super(methodsService);
  }

  getData(): Observable<ProductPackage[]> {
    return this.cloudService.get<ProductPackage[]>('product_package');
  }

  goToDetails(id: string) {
    this.router.navigate(['home', id]);
  }

  addProduct(fields: string[]): Observable<ProductPackage> {
    return this.methodsService
      .add<ProductPackage, EditedCreatedObject>(
        'Create Product Package',
        fields,
        'product_package'
      )
      .pipe(
        map((item) => {
          item.rate_plans = [];
          return item;
        })
      );
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
