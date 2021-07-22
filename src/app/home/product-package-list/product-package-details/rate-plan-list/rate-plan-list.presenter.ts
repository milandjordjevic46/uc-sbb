import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export abstract class RatePlanListPresenter {
  abstract goToDetails(productPackageId: string, id: string): void;
}
@Injectable()
export class RatePlanListPresenterImpl implements RatePlanListPresenter {
  constructor(private router: Router) {}

  goToDetails(productPackageId: string, id: string): void {
    this.router.navigate(['home', productPackageId, 'rate_plan', id]);
  }
}
