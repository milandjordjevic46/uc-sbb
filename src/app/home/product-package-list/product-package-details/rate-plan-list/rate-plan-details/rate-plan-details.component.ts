import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
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
    private router: Router,
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

  onEditRatePlanClicked(ratePlan: RatePlan): void {
    this.ratePlanDetailsPresenter
      .onEditRatePlan(['name', 'code'], ratePlan)
      .subscribe((response) => {
        response.billing_products = this.data.billing_products;
        this.data = response;
      });
  }

  onDeleteRatePlanClicked(ratePlan: RatePlan): void {
    this.ratePlanDetailsPresenter
      .onDeleteRatePlan(ratePlan)
      .subscribe((response) => {
        this.router.navigate(['']);
      });
  }
}
