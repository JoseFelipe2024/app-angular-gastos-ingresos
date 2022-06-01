import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { AddTransactionComponent } from 'src/app/shared/components/add-transaction/add-transaction.component';
import { ActionForm } from 'src/app/shared/models/action-form.model';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { Bill } from 'src/app/shared/models/bill.model';
import { Transaction } from 'src/app/shared/models/transaction.mode';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BillsComponent implements OnInit {
  transaction: Transaction[] = [];

  constructor(public dialog: MatDialog,
    private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(){
    this.transactionBaseService.getTransactionsByType(TransactionType.Bill).subscribe((res: ApiResponse<Transaction[]>) => {
      this.transaction = res.data;
    }, error => {
      console.log(error);
    })
  }

  openModalAddBills(){
    this.dialog.open(AddTransactionComponent,{
      data: {
        transactionType: TransactionType.Bill,
        action: ActionForm.add,
        title: 'Agregar Gasto'
      },
      width: '60%',
      height: '63%'
    }).afterClosed().pipe(take(1)).subscribe(result => {
      if(result?.new){
        this.getBills();
      }
    });
  }

  getClassButtonEvidence(typeFile: string){
    return typeFile === 'application/pdf' ? 'pi-file-pdf' : 'pi-image';
  }

}