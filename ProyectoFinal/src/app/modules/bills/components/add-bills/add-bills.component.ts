import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { Bill } from 'src/app/shared/models/bill.model';


@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.css'],
})
export class AddBillsComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBillsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder, private transactionBaseService: TransactionBaseService
  ) {
    this.dialogRef.disableClose = true;
    this.buildForm();
  }

  buildForm(){
    this.form = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      date: [null, [Validators.required]],
      description: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {}

  close(){
    this.dialogRef.close();
  }

  save(){
    if(this.form?.invalid){
      return;
    }
    const bill = this.form.value as Bill;
    this.transactionBaseService.addBill(bill);
    this.dialogRef.close(bill);
  }
}
