import { Component, Input, OnInit } from '@angular/core';
import { RatePlan } from 'src/app/shared/services/system-cloud.models';
import {
  RatePlanListPresenter,
  RatePlanListPresenterImpl,
} from './rate-plan-list.presenter';

@Component({
  selector: 'app-rate-plan-list',
  templateUrl: './rate-plan-list.component.html',
  styleUrls: ['./rate-plan-list.component.scss'],
  providers: [
    { provide: RatePlanListPresenter, useClass: RatePlanListPresenterImpl },
  ],
})
export class RatePlanListComponent implements OnInit {
  @Input() ratePlans: RatePlan[];
  @Input() productPackageId: string;
  constructor(private ratePlanListPresenter: RatePlanListPresenter) {}

  ngOnInit(): void {}

  onRateDetailsClicked(id: string): void {
    this.ratePlanListPresenter.goToDetails(this.productPackageId, id);
  }

  onAddRatePlanClicked() {
    this.ratePlanListPresenter
      .addRatePlan(['name', 'code'], this.productPackageId)
      .subscribe((response) => {
        this.ratePlans.push(response);
      });
  }

  onEditRatePlanClicked(ratePlan: RatePlan): void {
    this.ratePlanListPresenter
      .onEditRatePlan(['name', 'code'], ratePlan)
      .subscribe((response) => {
        this.ratePlans = this.ratePlans.map((ratePlan) => {
          if (ratePlan.id == response.id) {
            return response;
          } else {
            return ratePlan;
          }
        });
      });
  }

  onDeleteRatePlanClicked(ratePlan: RatePlan): void {
    this.ratePlanListPresenter
      .onDeleteRatePlan(ratePlan)
      .subscribe((response) => {
        const foundIndex = this.ratePlans.findIndex(
          (item) => item.id == response.id
        );
        this.ratePlans.splice(foundIndex, 1);
      });
  }
}
