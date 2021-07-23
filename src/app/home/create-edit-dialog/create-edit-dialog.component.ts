import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogCustomConfig } from 'src/app/shared/services/system-cloud.models';

@Component({
  selector: 'app-create-edit-dialog',
  templateUrl: './create-edit-dialog.component.html',
  styleUrls: ['./create-edit-dialog.component.scss'],
})
export class CreateEditDialogComponent implements OnInit {
  createForm: FormGroup;
  data: MatDialogCustomConfig;
  constructor(
    @Inject(MAT_DIALOG_DATA) private matData: MatDialogCustomConfig,
    private fb: FormBuilder,
    private matDialog: MatDialogRef<CreateEditDialogComponent>
  ) {
    this.data = matData;
    this.createForm = this.fb.group({});

    this.data.fields.forEach((element) => {
      this.createForm.addControl(
        element,
        new FormControl(
          this.data.mode === 'edit' ? this.data.data[element] : '',
          Validators.required
        )
      );
    });
  }

  ngOnInit(): void {}

  onCancelClicked(): void {
    this.matDialog.close();
  }

  onApplyClicked(): void {
    this.matDialog.close(this.createForm.value);
  }
}
