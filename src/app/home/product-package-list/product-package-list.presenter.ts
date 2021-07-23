import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import {
  EditedCreatedObject,
  ProductPackage,
} from 'src/app/shared/services/system-cloud.models';
import { CreateEditDialogComponent } from '../create-edit-dialog/create-edit-dialog.component';
import { CloudService } from '../services/cloud.service';
import { MethodsService } from '../services/methods.service';

export abstract class ProductPackageListPresenter {
  abstract getData(): Observable<ProductPackage[]>;
  abstract goToDetails(id: string): void;
  abstract addProduct(fields: string[]): Observable<ProductPackage>;
}

@Injectable()
export class ProductPackageListPresenterImpl
  implements ProductPackageListPresenter
{
  constructor(
    private cloudService: CloudService,
    private router: Router,
    private methodsService: MethodsService
  ) {}

  getData(): Observable<ProductPackage[]> {
    return this.cloudService.get<ProductPackage[]>('product_package').pipe(
      map((items: ProductPackage[]) => {
        items.map((item) => (item.createdAt = item.createdAt.split('T')[0]));
        return items;
      })
    );
  }

  goToDetails(id: string) {
    this.router.navigate(['home', id]);
  }

  addProduct(fields: string[]): Observable<ProductPackage> {
    return this.methodsService
      .add<ProductPackage, EditedCreatedObject>(
        'Create Product Package',
        'create',
        fields,
        'product_package'
      )
      .pipe(
        map((item) => {
          item.createdAt = item.createdAt.split('T')[0];
          item.rate_plans = [];
          return item;
        })
      );
  }
}
