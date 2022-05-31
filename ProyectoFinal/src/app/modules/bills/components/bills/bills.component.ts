import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { Bill } from 'src/app/shared/models/bill.model';
import { AddBillsComponent } from '../add-bills/add-bills.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills: Bill[] = [];

  constructor(public dialog: MatDialog,
    private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(){
    this.transactionBaseService.getBills().subscribe((bills: Bill[]) => {
      this.bills = bills;
    })
  }

  openModalAddBills(){
    this.dialog.open(AddBillsComponent,{
      width: '60%',
      height: '50%'
    }).afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}