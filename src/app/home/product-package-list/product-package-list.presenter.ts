import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductPackage } from 'src/app/shared/services/system-cloud.models';
import { CreateComponent } from '../create/create.component';
import { CloudService } from '../services/cloud.service';
import { MethodsService } from '../services/methods.service';

export abstract class ProductPackageListPresenter {
  abstract getData(): Observable<ProductPackage[]>;
  abstract goToDetails(id: string): void;
  abstract addProduct(pp: ProductPackage): void;
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

  addProduct(pp: ProductPackage): void {
    this.methodsService.dialogOpen<CreateComponent, ProductPackage>(
      CreateComponent,
      pp
    );
  }
}
