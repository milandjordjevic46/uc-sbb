import { Injectable } from '@angular/core';

export abstract class LoaderPresenter {}

@Injectable()
export class LoaderPresenterImpl implements LoaderPresenter {
  constructor() {}
}
