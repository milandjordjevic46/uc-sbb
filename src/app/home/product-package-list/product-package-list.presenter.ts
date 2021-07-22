import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductPackage } from 'src/app/shared/services/system-cloud.models';
import { CloudService } from '../services/cloud.service';

export abstract class ProductPackageListPresenter {
  abstract getData(): Observable<ProductPackage[]>;
  abstract goToDetails(id: string): void;
}

@Injectable()
export class ProductPackageListPresenterImpl
  implements ProductPackageListPresenter
{
  constructor(private cloudService: CloudService, private router: Router) {}

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
}