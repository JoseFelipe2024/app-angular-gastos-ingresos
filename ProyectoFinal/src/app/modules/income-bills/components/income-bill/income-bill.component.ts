import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { Transaction } from 'src/app/shared/models/transaction.mode';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';
import { formatDate } from '@angular/common';
import { ViewEvidenceComponent } from 'src/app/shared/components/view-evidence/view-evidence.component';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-income-bill',
  templateUrl: './income-bill.component.html',
  styleUrls: ['./income-bill.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IncomeBillComponent implements OnInit {
  transaction: Transaction[] = [];
  transactionOriginalList: Transaction[] = [];
  selectedValue: any = null;

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
  amount: number = 0;
  date!: Date;

  p: number = 1;

  constructor(public dialog: MatDialog,private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.transactionBaseService.getTransactions().subscribe((res: ApiResponse<Transaction[]>) => {
      this.transaction = res.data;
      this.transactionOriginalList = res.data;
    }, error => {
      console.log(error);
    });
  }

  getTypeTransation(type: TransactionType){
    return type === TransactionType.Bill ? 'Gasto' : 'Ingreso';
  }

  getClassButtonEvidence(typeFile: string){
    return typeFile === 'application/pdf' ? 'pi-file-pdf' : 'pi-image';
  }

  clearSearch(){
    this.amount = 0;
    this.date = null!;
    this.selectedValue = null;
    this.transaction = [...this.transactionOriginalList];
  }

  filter(){
    if(!this.date && this.amount <= 0 && !this.selectedValue){
      this.transaction = [...this.transactionOriginalList];
      return;
    }

    let transaction: any[] = this.getOriginalList.filter(item => {
       if(item.type === this.selectedValue){
        return item;
       }
       if(this.getFormatDate(this.date) === this.getFormatDate(item.date)){
         return item;
       }
       if(item.amount == this.amount){
          return item;
       }
       return;
    });
    this.transaction = transaction
  }

  private get getOriginalList(){
    return [...this.transactionOriginalList.map(t => {
      return {...t}
    })];
  }

  getFormatDate(date: any){
    if(!date) return;
    return formatDate(date, 'MM-yyyy-dd', 'en-US');
  }

  openViewEvidenceComponent(transaction: Transaction){
    this.dialog.open(ViewEvidenceComponent,{
      data: {
        typeFile: transaction.typeFile,
        base64: transaction.evidence
      },
     
    });
  }

}
