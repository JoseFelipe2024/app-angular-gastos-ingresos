import { Component, OnInit } from '@angular/core';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { Transaction } from 'src/app/shared/models/transaction.mode';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';

@Component({
  selector: 'app-income-bill',
  templateUrl: './income-bill.component.html',
  styleUrls: ['./income-bill.component.css']
})
export class IncomeBillComponent implements OnInit {
  transaction: Transaction[] = [];

  constructor(private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.transactionBaseService.getTransactions().subscribe((res: ApiResponse<Transaction[]>) => {
      this.transaction = res.data;
    }, error => {
      console.log(error);
    });
  }

  getTypeTransation(type: TransactionType){
    return type === TransactionType.Bill ? 'Gasto' : 'Ingreso';
  }

}
