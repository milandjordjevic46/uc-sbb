import { Injectable } from '@angular/core';
export abstract class BillingProductPresenter {}
@Injectable()
export class BillingProductPresenterImpl implements BillingProductPresenter {
  constructor() {}
}
