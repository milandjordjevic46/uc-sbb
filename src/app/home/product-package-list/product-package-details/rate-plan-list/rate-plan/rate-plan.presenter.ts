import { Injectable } from '@angular/core';

export abstract class RatePlanPresenter {}

@Injectable()
export class RatePlanPresenterImpl implements RatePlanPresenter {
  constructor() {}
}
