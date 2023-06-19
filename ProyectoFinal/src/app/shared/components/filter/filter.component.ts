import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    description: [null],
    from: [null],
    to: [null]
  });

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {
      description: string,
      from: Date,
      to: Date
    },
    private toastr: ToastrService, private auth: AuthService,
    private fb: FormBuilder, private transactionBaseService: TransactionBaseService
  ) {
    this.form.patchValue(this.data);
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close({
      apply: false
    });
  }

  apply(){
    this.dialogRef.close({
      apply: true,
      data: this.form?.value
    });
  }

}