import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MethodsService } from 'src/app/home/services/methods.service';
import { EditPresenter } from 'src/app/shared/classes/edit.component';
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
  abstract onEditRatePlan(
    fields: string[],
    data: RatePlan
  ): Observable<RatePlan>;
  abstract onDeleteRatePlan(data: RatePlan): Observable<RatePlan>;
}
@Injectable()
export class RatePlanListPresenterImpl
  extends EditPresenter
  implements RatePlanListPresenter
{
  constructor(
    private router: Router,
    protected methodsService: MethodsService
  ) {
    super(methodsService);
  }

  goToDetails(productPackageId: string, id: string): void {
    this.router.navigate(['home', productPackageId, 'rate_plan', id]);
  }

  addRatePlan(
    fields: string[],
    productPackageId: string
  ): Observable<RatePlan> {
    const path = 'product_package/' + productPackageId + '/rate_plan';
    return this.methodsService.add<RatePlan, EditedCreatedObject>(
      'Create Rate Plan',
      fields,
      path
    );
  }

  onEditRatePlan(fields: string[], data: RatePlan): Observable<RatePlan> {
    return this.editRatePlan(fields, data);
  }

  onDeleteRatePlan(data: RatePlan): Observable<RatePlan> {
    return this.deleteRatePlan(data);
  }
}
