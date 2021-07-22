import { Injectable } from '@angular/core';

export abstract class HomePresenter {}

@Injectable()
export class HomePresenterImpl implements HomePresenter {
  constructor() {}
}
