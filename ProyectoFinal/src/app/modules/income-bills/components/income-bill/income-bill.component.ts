import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { Transaction } from 'src/app/shared/models/transaction.mode';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';
import { formatDate } from '@angular/common';
import { ViewEvidenceComponent } from 'src/app/shared/components/view-evidence/view-evidence.component';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MenuItem } from 'primeng/api';
import { ExportService } from 'src/app/core/services/export.service';

@Component({
  selector: 'app-income-bill',
  templateUrl: './income-bill.component.html',
  styleUrls: ['./income-bill.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class IncomeBillComponent implements OnInit {
  menuExportItems: MenuItem[] = [];
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
  from!: Date | null;
  to!: Date | null;
  p: number = 1;

  constructor(public dialog: MatDialog, private exportService: ExportService, private toastr: ToastrService, private transactionBaseService: TransactionBaseService) { }

  ngOnInit(): void {
    this.getTransactions();
    this.menuExportItems = [{
      label: 'Exportar a Excel',
      icon: 'pi pi-file-excel',
      command: () => {
        this.exportToExcel();
      }
    }]
  }

  getTransactions() {
    this.transactionBaseService.getTransactions().subscribe((res: ApiResponse<Transaction[]>) => {
      this.transaction = res.data;
      this.transactionOriginalList = res.data;
    }, error => {
      this.toastr.error('Ha ocurrido un error al cargar los datos');
    });
  }

  getTypeTransation(type: TransactionType) {
    return type === TransactionType.Bill ? 'Gasto' : 'Ingreso';
  }

  getClassButtonEvidence(typeFile: string) {
    return typeFile === 'application/pdf' ? 'pi-file-pdf' : 'pi-image';
  }

  clearSearch() {
    this.from = null;
    this.to = null;
    this.selectedValue = null;
    this.transaction = [...this.transactionOriginalList];
  }

  filter() {
    if ((!this.from || !this.to) && !this.selectedValue) {
      this.transaction = [...this.transactionOriginalList];
      return;
    }
    if(this.from && this.to){
      if(this.getFormatDate(this.from) > this.getFormatDate(this.to) ){
        this.toastr.warning('La fecha inicio no debe ser mayor que la fecha final');
        return;
      }
    }
    let transaction: any[] = this.getOriginalList.filter(item => {
      if(this.selectedValue && (!this.from || !this.to)) {
        if (item.type === this.selectedValue) {
          return item;
        }
        return;
      }
      if(!this.selectedValue && (this.from || this.to)) {
        if (this.getFormatDate(item?.date) >= this.getFormatDate(this.from) && this.getFormatDate(item?.date) <= this.getFormatDate(this.to)) {
          return item;
        }
        return;
      }
      if ((this.getFormatDate(item?.date) >= this.getFormatDate(this.from) && this.getFormatDate(item?.date) <= this.getFormatDate(this.to)) && item.type === this.selectedValue) {
        return item;
      }
      return;
    });
    this.transaction = transaction
  }

  private get getOriginalList() {
    return [...this.transactionOriginalList.map(t => {
      return { ...t }
    })];
  }

  getFormatDate(date: any) {
    if (!date) return '';
    return formatDate(date, 'MM-yyyy-dd', 'en-US');
  }

  openViewEvidenceComponent(transaction: Transaction) {
    this.dialog.open(ViewEvidenceComponent, {
      data: {
        typeFile: transaction.typeFile,
        base64: transaction.evidence
      },

    });
  }

  private exportToExcel() {
    let excelHeaders: string[][] = [[
      "Id",
      "Monto",
      "Fecha",
      "Descripción",
      "Tipo",
      "Fecha Creada",
      "Fecha Actualizada",
      "UserId",
      "User",
    ],
    [
      "id",
      "amount",
      "date",
      "description",
      "type",
      "createDate",
      "updateDate",
      "userId",
      "user"
    ]];
    this.exportService.exportToExcelSpecificColumns(this.transaction, excelHeaders, 'Transaciones', true);
  }

  get getTotalAmount(){
    return this.transaction.reduce((previous, currentValue) => currentValue.amount + previous, 0);
  }

}
