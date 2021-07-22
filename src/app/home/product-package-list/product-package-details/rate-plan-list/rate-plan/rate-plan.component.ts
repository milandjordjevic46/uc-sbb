import { Component, Input, OnInit } from '@angular/core';
import { RatePlan } from 'src/app/shared/services/system-cloud.models';
import {
  RatePlanPresenter,
  RatePlanPresenterImpl,
} from './rate-plan.presenter';

@Component({
  selector: 'app-rate-plan',
  templateUrl: './rate-plan.component.html',
  styleUrls: ['./rate-plan.component.scss'],
  providers: [{ provide: RatePlanPresenter, useClass: RatePlanPresenterImpl }],
})
export class RatePlanComponent implements OnInit {
  @Input() ratePlan: RatePlan;
  constructor() {}

  ngOnInit(): void {}
}
