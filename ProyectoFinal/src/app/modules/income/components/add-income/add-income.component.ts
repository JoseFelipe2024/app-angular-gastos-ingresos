import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { Income } from 'src/app/shared/models/income.model';


@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddIncomeComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,  private transactionBaseService: TransactionBaseService
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
    const income = this.form.value as Income;
    this.transactionBaseService.addIncome(income)
    this.dialogRef.close(income);
  }
}
