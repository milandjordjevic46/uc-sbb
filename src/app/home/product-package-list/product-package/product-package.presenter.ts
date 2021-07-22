import { Injectable } from '@angular/core';

export abstract class ProductPackagePresenter {}
@Injectable()
export class ProductPackagePresenterImpl implements ProductPackagePresenter {
  constructor() {}
}
