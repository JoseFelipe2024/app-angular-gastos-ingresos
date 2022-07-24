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
import { ViewEvidenceComponent } from 'src/app/shared/components/view-evidence/view-evidence.component';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IncomeComponent implements OnInit {
  transaction: Transaction[] = [];
  transactionOriginalList: Transaction[] = [];
  p: number = 1;
  amount: number = 0;
  date!: Date;

  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private confirmationService: ConfirmationService,
    private transactionBaseService: TransactionBaseService
  ) {}

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome() {
    this.transactionBaseService
      .getTransactionsByType(TransactionType.Income)
      .subscribe(
        (res: ApiResponse<Transaction[]>) => {
          if (res.succeeded) {
            this.transaction = res.data;
            this.transactionOriginalList = res.data;
          } else {
            this.toastr.error(res.message, '');
          }
        },
        (error) => {
          this.toastr.error('Ha ocurrido un error al cargar los ingresos');
        }
      );
  }

  openModalAddIncome() {
    this.dialog
      .open(AddTransactionComponent, {
        data: {
          transactionType: TransactionType.Income,
          action: ActionForm.add,
          title: 'Agregar Ingreso',
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result?.new) {
          this.getIncome();
        }
      });
  }

  getClassButtonEvidence(typeFile: string) {
    return typeFile === 'application/pdf' ? 'pi-file-pdf' : 'pi-image';
  }

  openViewEvidenceComponent(income: Transaction) {
    this.dialog.open(ViewEvidenceComponent, {
      data: {
        typeFile: income.typeFile,
        base64: income.evidence,
      },
    });
  }

  edit(transaction: Transaction) {
    this.dialog
      .open(AddTransactionComponent, {
        data: {
          transaction: transaction,
          transactionType: TransactionType.Income,
          action: ActionForm.edit,
          title: 'Editar Ingreso',
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result?.new) {
          this.getIncome();
        }
      });
  }

  remove(transaction: Transaction) {
    this.confirmationService.confirm({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres realizar esta acción?',
      accept: () => {
        this.transactionBaseService
          .deleteTransactions(transaction.id)
          .subscribe(
            (res) => {
              if (res.succeeded) {
                this.toastr.success('Registro eliminado correctamente', '');
                this.getIncome();
              } else {
                this.toastr.error(res.message, '');
              }
            },
            (error) => {
              this.toastr.error(
                'Ha ocurrido un error al eliminar el registro',
                ''
              );
            }
          );
      },
    });
  }

  clearSearch(){
    this.amount = 0;
    this.date = null!;
    this.transaction = [...this.transactionOriginalList];
  }

  filter(){
    if(!this.date && this.amount <= 0){
      this.transaction = [...this.transactionOriginalList];
      return;
    }
    let transaction: any[] = this.getOriginalList.filter(item => {
       if(this.getFormatDate(this.date) === this.getFormatDate(item.date)){
         return item;
       }
       if(item.amount == this.amount){
          return item;
       }
       return;
    });
    this.transaction = transaction;
  }

  getFormatDate(date: any){
    if(!date) return;
    return formatDate(date, 'MM-yyyy-dd', 'en-US');
  }

  private get getOriginalList(){
    return [...this.transactionOriginalList.map(t => {
      return {...t}
    })];
  }

}
