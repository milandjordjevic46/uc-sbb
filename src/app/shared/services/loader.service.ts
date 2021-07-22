import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export abstract class LoaderService {
  abstract show(): void;
  abstract hide(): void;
  abstract isLoading(): Observable<boolean>;
}
@Injectable()
export class LoaderServiceImpl implements LoaderService {
  loading = new BehaviorSubject<boolean>(false);

  show(): void {
    this.loading.next(true);
  }

  hide(): void {
    this.loading.next(false);
  }

  isLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }
}
