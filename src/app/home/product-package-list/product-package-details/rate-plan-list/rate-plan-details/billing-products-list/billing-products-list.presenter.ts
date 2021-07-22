import { Injectable } from '@angular/core';

export abstract class BillingProductsListPresenter {}

@Injectable()
export class BillingProductsListPresenterImpl
  implements BillingProductsListPresenter
{
  constructor() {}
}
