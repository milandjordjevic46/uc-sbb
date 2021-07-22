import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { LoaderPresenter, LoaderPresenterImpl } from './loader.presenter';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  providers: [{ provide: LoaderPresenter, useClass: LoaderPresenterImpl }],
})
export class LoaderComponent implements OnInit {
  isLoading: boolean;
  constructor(
    private loaderPresenter: LoaderPresenter,
    private loaderService: LoaderService
  ) {
    loaderService
      .isLoading()
      .pipe(filter((load) => load !== undefined))
      .subscribe((response) => {
        this.isLoading = response;
      });
  }

  ngOnInit(): void {}
}
