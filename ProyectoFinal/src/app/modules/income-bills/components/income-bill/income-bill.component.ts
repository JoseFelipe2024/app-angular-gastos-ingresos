import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { Transaction } from 'src/app/shared/models/transaction.mode';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-income-bill',
  templateUrl: './income-bill.component.html',
  styleUrls: ['./income-bill.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IncomeBillComponent implements OnInit {
  transaction: Transaction[] = [];
  transactionOriginalList: Transaction[] = [];
  selectedValue: any;

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

  constructor(private transactionBaseService: TransactionBaseService) { }

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

  filter(){
    /*if(!this.date && this.amount === 0 && !this.selectedValue){
      this.transaction = [...this.transactionOriginalList];
      return;
    }*/
    console.log(this.selectedValue, this.amount, this.date)
    let transaction = this.transactionOriginalList.filter(t => t.type === this.selectedValue
      || this.getFormatDate(this.date) === this.getFormatDate(t.date) || this.amount === t.amount);
      console.log(transaction)
    this.transaction = transaction;
  }

  getFormatDate(date: any){
    if(!date) return;
    return formatDate(date, 'MM-yyyy-dd', 'en-US');
  }

}
