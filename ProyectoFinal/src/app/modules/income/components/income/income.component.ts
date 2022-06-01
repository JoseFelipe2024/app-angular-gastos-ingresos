import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { Income } from 'src/app/shared/models/income.model';
import { AddIncomeComponent } from '../add-income/add-income.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IncomeComponent implements OnInit {
  income: Income[] = [];

  constructor(public dialog: MatDialog, private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome(){
    this.transactionBaseService.getIncome().subscribe((income: Income[]) => {
      this.income = income;
    })
  }

  openModalAddIncome(){
    this.dialog.open(AddIncomeComponent,{
      width: '60%',
      height: '50%'
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}
