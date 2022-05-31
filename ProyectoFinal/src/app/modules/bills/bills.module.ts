import { NgModule } from '@angular/core';
import { BillsRoutingModule } from './bills-routing.module';
import { AddBillsComponent } from './components/add-bills/add-bills.component';
import { BillsComponent } from './components/bills/bills.component';
import {ButtonModule} from 'primeng/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BillsComponent, AddBillsComponent],
  imports: [BillsRoutingModule, ButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, 
    MatButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule, 
    SharedModule, CoreModule, CommonModule],
  providers: [],
  bootstrap: [BillsModule],
})
export class BillsModule {}
