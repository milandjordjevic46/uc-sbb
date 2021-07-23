import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MethodsService } from 'src/app/home/services/methods.service';
import {
  EditedCreatedObject,
  RatePlan,
} from 'src/app/shared/services/system-cloud.models';

export abstract class RatePlanListPresenter {
  abstract goToDetails(productPackageId: string, id: string): void;
  abstract addRatePlan(
    fields: string[],
    productPackageId: string
  ): Observable<RatePlan>;
}
@Injectable()
export class RatePlanListPresenterImpl implements RatePlanListPresenter {
  constructor(private router: Router, private methodsService: MethodsService) {}

  goToDetails(productPackageId: string, id: string): void {
    this.router.navigate(['home', productPackageId, 'rate_plan', id]);
  }

  addRatePlan(
    fields: string[],
    productPackageId: string
  ): Observable<RatePlan> {
    const path = 'product_package/' + productPackageId + '/rate_plan';
    return this.methodsService
      .add<RatePlan, EditedCreatedObject>(
        'Create Rate Plan',
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
