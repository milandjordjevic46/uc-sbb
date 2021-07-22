import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

export abstract class MethodsService {
  abstract dialogOpen<T, D>(compoenent: ComponentType<T>, data: D): void;
  abstract dialogClose(): void;
}

@Injectable()
export class MethodsServiceImpl implements MethodsService {
  constructor(private matDialog: MatDialog) {}

  dialogOpen<T, D>(component: ComponentType<T>, data: D): void {
    this.matDialog.open(component);
  }

  dialogClose(): void {}
}
