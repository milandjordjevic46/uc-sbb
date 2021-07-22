import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CloudService } from 'src/app/home/services/cloud.service';
import { RatePlan } from 'src/app/shared/services/system-cloud.models';

export abstract class RatePlanDetailsPresenter {
  abstract getDetails(
    productPackageId: string,
    ratePlanId: string
  ): Observable<RatePlan>;
}
@Injectable()
export class RatePlanDetailsPresenterImpl implements RatePlanDetailsPresenter {
  constructor(private cloudService: CloudService) {}

  getDetails(
    productPackageId: string,
    ratePlanId: string
  ): Observable<RatePlan> {
    return this.cloudService
      .get<RatePlan>(
        'product_package/' + productPackageId + '/rate_plan/' + ratePlanId
      )
      .pipe(
        map((item) => {
          item.billing_products.map(
            (plan) => (plan.createdAt = plan.createdAt.split('T')[0])
          );
          item.createdAt = item.createdAt.split('T')[0];
          return item;
        })
      );
  }
}
