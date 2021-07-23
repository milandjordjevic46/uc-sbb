import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CloudService } from 'src/app/home/services/cloud.service';
import { MethodsService } from 'src/app/home/services/methods.service';
import { EditPresenter } from 'src/app/shared/classes/edit.component';
import { RatePlan } from 'src/app/shared/services/system-cloud.models';

export abstract class RatePlanDetailsPresenter {
  abstract getDetails(
    productPackageId: string,
    ratePlanId: string
  ): Observable<RatePlan>;
  abstract onEditRatePlan(
    fields: string[],
    data: RatePlan
  ): Observable<RatePlan>;
  abstract onDeleteRatePlan(data: RatePlan): Observable<RatePlan>;
}
@Injectable()
export class RatePlanDetailsPresenterImpl
  extends EditPresenter
  implements RatePlanDetailsPresenter
{
  constructor(
    private cloudService: CloudService,
    protected methodsService: MethodsService
  ) {
    super(methodsService);
  }

  getDetails(
    productPackageId: string,
    ratePlanId: string
  ): Observable<RatePlan> {
    return this.cloudService.get<RatePlan>(
      'product_package/' + productPackageId + '/rate_plan/' + ratePlanId
    );
  }

  onEditRatePlan(fields: string[], data: RatePlan): Observable<RatePlan> {
    return this.editRatePlan(fields, data);
  }

  onDeleteRatePlan(data: RatePlan): Observable<RatePlan> {
    return this.deleteRatePlan(data);
  }
}
