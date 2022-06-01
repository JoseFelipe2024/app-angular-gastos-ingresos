import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { AddTransactionComponent } from 'src/app/shared/components/add-transaction/add-transaction.component';
import { ActionForm } from 'src/app/shared/models/action-form.model';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { Income } from 'src/app/shared/models/income.model';
import { Transaction } from 'src/app/shared/models/transaction.mode';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IncomeComponent implements OnInit {
  transaction: Transaction[] = [];

  constructor(public dialog: MatDialog, private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome(){
    this.transactionBaseService.getTransactionsByType(TransactionType.Income).subscribe((res: ApiResponse<Transaction[]>) => {
      this.transaction = res.data;
    }, error => {
      console.log(error);
    })
  }

  openModalAddIncome(){
    this.dialog.open(AddTransactionComponent,{
      data: {
        transactionType: TransactionType.Income,
        action: ActionForm.add,
        title: 'Agregar Ingreso'
      },
      width: '60%',
      height: '63%'
    }).afterClosed().pipe(take(1)).subscribe(result => {
      if(result?.new){
        this.getIncome();
      }
    });
  }

  getClassButtonEvidence(typeFile: string){
    return typeFile === 'application/pdf' ? 'pi-file-pdf' : 'pi-image';
  }

}
