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
import { ViewEvidenceComponent } from 'src/app/shared/components/view-evidence/view-evidence.component';
import {ConfirmationService} from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BillsComponent implements OnInit {
  transaction: Transaction[] = [];
  p: number = 1;
  transactionOriginalList: Transaction[] = [];
  from!: Date | null;
  to!: Date | null;
  constructor(public dialog: MatDialog,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(){
    this.transactionBaseService.getTransactionsByType(TransactionType.Bill).subscribe((res: ApiResponse<Transaction[]>) => {
      if(res.succeeded){
        this.transaction = res.data;
        this.transactionOriginalList = res.data;
      }else{
        this.toastr.error(res.message, '');
      }
    }, error => {
      this.toastr.error('Ha ocurrido un error al cargar los gastos');
    })
  }

  openModalAddBills(){
    this.dialog.open(AddTransactionComponent,{
      data: {
        transactionType: TransactionType.Bill,
        action: ActionForm.add,
        title: 'Agregar Gasto'
      },
     
    }).afterClosed().pipe(take(1)).subscribe(result => {
      if(result?.new){
        this.getBills();
      }
    });
  }

  getClassButtonEvidence(typeFile: string){
    return typeFile === 'application/pdf' ? 'pi-file-pdf' : 'pi-image';
  }

  openViewEvidenceComponent(bill: Transaction){
    this.dialog.open(ViewEvidenceComponent,{
      data: {
        typeFile: bill.typeFile,
        base64: bill.evidence
      },
      
    }).afterClosed().pipe(take(1)).subscribe(result => {
      if(result?.new){
        this.getBills();
      }
    });
  }

  remove(transaction: Transaction){
    this.confirmationService.confirm({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres realizar esta acción?',
      accept: () => {
          this.transactionBaseService.deleteTransactions(transaction.id).subscribe(res => {
            if(res.succeeded){
              this.toastr.success('Registro eliminado correctamente', '');
              this.getBills();
            }else{
              this.toastr.error(res.message, '');
            }
          }, error => {
            this.toastr.error('Ha ocurrido un error al eliminar el registro', '');
          })
      }
  });
  }

  
  edit(transaction: Transaction){
    this.dialog.open(AddTransactionComponent,{
      data: {
        transaction: transaction,
        transactionType: TransactionType.Bill,
        action: ActionForm.edit,
        title: 'Editar Ingreso'
      },
     
    }).afterClosed().pipe(take(1)).subscribe(result => {
      if(result?.new){
        this.getBills();
      }
    });
  }

  clearSearch(){
    this.from = null;
    this.to = null;
    this.transaction = [...this.transactionOriginalList];
  }

  filter(){
    if(!this.from || !this.to){
      this.transaction = [...this.transactionOriginalList];
      return;
    }
    if(this.getFormatDate(this.from) > this.getFormatDate(this.to) ){
      this.toastr.warning('La fecha inicio no debe ser mayor que la fecha final');
      return;
    }
    let transaction: any[] = this.getOriginalList.filter(item => {
      if (this.getFormatDate(item?.date) >= this.getFormatDate(this.from) && this.getFormatDate(item?.date) <= this.getFormatDate(this.to)) {
        return item;
      }
       return;
    });
    this.transaction = transaction;
  }

  getFormatDate(date: any){
    if(!date) return '';
    return formatDate(date, 'MM-yyyy-dd', 'en-US');
  }

  private get getOriginalList(){
    return [...this.transactionOriginalList.map(t => {
      return {...t}
    })];
  }

  get getTotalAmount(){
    return this.transaction.reduce((previous, currentValue) => currentValue.amount + previous, 0);
  }

}