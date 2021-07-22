import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export abstract class ErrorHandlingService {
  abstract displayError(message: string): void;
}

@Injectable()
export class ErrorHandlingServiceImpl implements ErrorHandlingService {
  constructor(private snackBar: MatSnackBar) {}

  displayError(message: string): void {
    this.snackBar.open(message, 'OK', { duration: 3000 });
  }
}
