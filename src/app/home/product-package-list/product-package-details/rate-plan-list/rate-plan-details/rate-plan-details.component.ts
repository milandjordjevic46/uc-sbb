import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { RatePlan } from 'src/app/shared/services/system-cloud.models';
import {
  RatePlanDetailsPresenter,
  RatePlanDetailsPresenterImpl,
} from './rate-plan-details.presenter';

@Component({
  selector: 'app-rate-plan-details',
  templateUrl: './rate-plan-details.component.html',
  styleUrls: ['./rate-plan-details.component.scss'],
  providers: [
    {
      provide: RatePlanDetailsPresenter,
      useClass: RatePlanDetailsPresenterImpl,
    },
  ],
})
export class RatePlanDetailsComponent implements OnInit {
  data: RatePlan;
  productPackageId: string;
  constructor(
    private route: ActivatedRoute,
    private ratePlanDetailsPresenter: RatePlanDetailsPresenter
  ) {
    route.params
      .pipe(
        filter((item) => item.productPackageId),
        switchMap((items: Params) => {
          this.productPackageId = items.productPackageId;
          return ratePlanDetailsPresenter.getDetails(
            items.productPackageId,
            items.ratePlanId
          );
        })
      )
      .subscribe((response) => {
        this.data = response;
      });
  }
  ngOnInit(): void {}
}
