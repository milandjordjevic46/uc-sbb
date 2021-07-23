import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CreateEditDialogComponent } from '../create-edit-dialog/create-edit-dialog.component';
import { CloudService } from './cloud.service';

export abstract class MethodsService {
  abstract dialogOpen<T, D>(
    compoenent: ComponentType<T>,
    title: string,
    mode: 'edit' | 'create' | 'delete',
    fields: string[],
    data?: D
  ): Observable<any>;
  abstract add<ReturnedObject, SentObject>(
    title: string,
    fields: string[],
    requestPath: string
  ): Observable<ReturnedObject>;

  abstract edit<ReturnedObject, SentObject>(
    title: string,
    fields: string[],
    requestPath: string,
    data: ReturnedObject
  ): Observable<ReturnedObject>;

  abstract delete<T, D>(title: string, path: string, data: D): Observable<T>;
}

@Injectable()
export class MethodsServiceImpl implements MethodsService {
  constructor(
    private matDialog: MatDialog,
    private cloudService: CloudService
  ) {}

  dialogOpen<ReturnedObject, SentObject>(
    component: ComponentType<ReturnedObject>,
    title: string,
    mode: 'edit' | 'create' | 'delete',
    fields: string[],
    data?: SentObject
  ): Observable<any> {
    return this.matDialog
      .open(component, {
        data: {
          title: title,
          mode: mode,
          fields: fields,
          data: data,
        },
        disableClose: true,
      })
      .afterClosed();
  }

  add<ReturnedObject, SentObject>(
    title: string,
    fields: string[],
    requestPath: string
  ): Observable<ReturnedObject> {
    return this.dialogOpen<CreateEditDialogComponent, ReturnedObject>(
      CreateEditDialogComponent,
      title,
      'create',
      fields
    ).pipe(
      filter((item) => item !== undefined),
      switchMap((item) => {
        return this.cloudService.create<ReturnedObject, SentObject>(
          requestPath,
          item
        );
      })
    );
  }

  edit<ReturnedObject, SentObject>(
    title: string,
    fields: string[],
    requestPath: string,
    data: ReturnedObject
  ): Observable<ReturnedObject> {
    return this.dialogOpen<CreateEditDialogComponent, ReturnedObject>(
      CreateEditDialogComponent,
      title,
      'edit',
      fields,
      data
    ).pipe(
      filter((item) => item !== undefined),
      switchMap((item) => {
        return this.cloudService.update<ReturnedObject, SentObject>(
          requestPath,
          item
        );
      })
    );
  }

  delete<T, D>(title: string, path: string, data: D): Observable<T> {
    return this.dialogOpen<ConfirmationDialogComponent, D>(
      ConfirmationDialogComponent,
      title,
      'delete',
      [],
      data
    ).pipe(
      filter((item) => item != undefined),
      switchMap((item) => {
        return this.cloudService.delete<T>(path);
      })
    );
  }
}
