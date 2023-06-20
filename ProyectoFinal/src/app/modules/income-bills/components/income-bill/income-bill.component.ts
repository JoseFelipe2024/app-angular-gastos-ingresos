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
import { getFormatDate } from 'src/app/shared/utils/utils';
import { FilterOption } from 'src/app/shared/models/filter-option.model';
import { FilterComponent } from 'src/app/shared/components/filter/filter.component';

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
  page: number = 1;

  filterOption!: FilterOption;

  constructor(public dialog: MatDialog,
     private exportService: ExportService, 
    private toastr: ToastrService, 
    private transactionBaseService: TransactionBaseService) { }

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
    this.filterOption = null!;
    this.transaction = [...this.transactionOriginalList];
  }

  filter() {
    this.transaction = this.getOriginalList?.filter(item => {
      if (((item?.date >= this.filterOption?.from 
      && item?.date <= this.filterOption?.to) 
      || (!this.filterOption?.from && !this.filterOption?.to))
      && (item?.description?.toLowerCase()?.includes((this.filterOption?.description || '')?.toLowerCase())
       || !this.filterOption?.description)
       && (item.type === this.filterOption?.transactionType || !this.filterOption?.transactionType)) {
        return item;
      }
       return;
    });
  }

  private get getOriginalList() {
    return [...this.transactionOriginalList.map(t => {
      return { ...t }
    })];
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

  openModalFilter(){
    this.dialog.open(FilterComponent,{
      data: {
        hideTypesTransaction: false,
        filterOption: this.filterOption
      }
    }).afterClosed().subscribe((result: {
      apply: boolean,
      data: FilterOption
    }) => {
      if(result?.apply){
        this.filterOption = result.data;
        this.filter();
      }
    });
  }

}