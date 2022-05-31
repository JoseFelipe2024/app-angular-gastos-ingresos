import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { AddBillsComponent } from '../add-bills/add-bills.component';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
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