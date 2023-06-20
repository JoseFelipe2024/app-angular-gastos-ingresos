import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { FilterOption } from '../../models/filter-option.model';
import { TransactionType } from '../../models/transaction-Type.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    transactionType: [null],
    description: [null],
    from: [null],
    to: [null]
  });

  typesTransaction: any[] = [
    {
      id: TransactionType.Income,
      name: 'Ingreso'
    },
    {
      id: TransactionType.Bill,
      name: 'Gasto'
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<FilterComponent>,
    private toastr: ToastrService, 
    @Inject(MAT_DIALOG_DATA) public data: {
      hideTypesTransaction: boolean,
      filterOption: FilterOption
    },
    private fb: FormBuilder
  ) {
    this.form.patchValue(this.data?.filterOption);
  }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close({
      apply: false
    });
  }

  apply(){
    if(this.form?.value?.from > this.form?.value?.to){
      this.toastr.warning('La fecha inicio no debe ser mayor que la fecha final');
      return;
    }
    this.dialogRef.close({
      apply: true,
      data: this.form?.value
    });
  }

}