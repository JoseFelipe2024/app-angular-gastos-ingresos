import { NgModule } from '@angular/core';
import { AddIncomeComponent } from './components/add-income/add-income.component';
import { IncomeComponent } from './components/income/income.component';
import { IncomeRoutingModule } from './income-routing.module';
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
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [IncomeComponent, AddIncomeComponent],
  imports: [IncomeRoutingModule, ButtonModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, 
    MatButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule, SharedModule,
    CommonModule, CoreModule],
  providers: [],
  bootstrap: [IncomeModule],
})
export class IncomeModule {}
