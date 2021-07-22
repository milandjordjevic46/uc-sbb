import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductPackage } from 'src/app/shared/services/system-cloud.models';
import { CloudService } from '../../services/cloud.service';

export abstract class ProductPackageDetailsPresenter {
  abstract getData(id: string): Observable<ProductPackage>;
}

@Injectable()
export class ProductPackageDetailsPresenterImpl
  implements ProductPackageDetailsPresenter
{
  constructor(private cloudService: CloudService) {}

  getData(id: string): Observable<ProductPackage> {
    return this.cloudService.get<ProductPackage>('product_package/' + id).pipe(
      map((item) => {
        item.rate_plans.map(
          (plan) => (plan.createdAt = plan.createdAt.split('T')[0])
        );
        item.createdAt = item.createdAt.split('T')[0];
        return item;
      })
    );
  }
}
