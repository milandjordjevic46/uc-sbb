import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  data;
  constructor(
    @Inject(MAT_DIALOG_DATA) private matData: any,
    private fb: FormBuilder
  ) {
    this.data = matData;
    this.createForm = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      // price: [null, [Validators.required]],
    });
    this.createForm.addControl(
      'price',
      new FormControl('', Validators.required)
    );
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
