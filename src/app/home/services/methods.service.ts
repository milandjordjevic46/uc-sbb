import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CreateEditDialogComponent } from '../create-edit-dialog/create-edit-dialog.component';
import { CloudService } from './cloud.service';

export abstract class MethodsService {
  abstract dialogOpen<T, D>(
    compoenent: ComponentType<T>,
    title: string,
    mode: 'edit' | 'create',
    fields: string[],
    data?: D
  ): Observable<any>;
  abstract dialogClose(): void;
  abstract add<ReturnedObject, SentObject>(
    title: string,
    mode: 'edit' | 'create',
    fields: string[],
    requestPath: string
  ): Observable<ReturnedObject>;
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
    mode: 'edit' | 'create',
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
    mode: 'edit' | 'create',
    fields: string[],
    requestPath: string
  ): Observable<ReturnedObject> {
    return this.dialogOpen<CreateEditDialogComponent, ReturnedObject>(
      CreateEditDialogComponent,
      title,
      mode,
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
  edit() {}

  dialogClose(): void {}
}
