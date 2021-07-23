import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  constructor(private matDialog: MatDialogRef<ConfirmationDialogComponent>) {}

  ngOnInit(): void {}

  onCancelCliked(): void {
    this.matDialog.close();
  }

  onYesClicked(): void {
    this.matDialog.close(true);
  }
}
