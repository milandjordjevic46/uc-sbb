import { Component, OnInit } from '@angular/core';
import { ProductPackage } from '../shared/services/system-cloud.models';
import { HomePresenter, HomePresenterImpl } from './home.preseter';
import { filter } from 'rxjs/operators';
import { ErrorHandlingService } from '../shared/services/error-handling.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{ provide: HomePresenter, useClass: HomePresenterImpl }],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
