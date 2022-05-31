import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIncomeComponent } from '../add-income/add-income.component';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
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
