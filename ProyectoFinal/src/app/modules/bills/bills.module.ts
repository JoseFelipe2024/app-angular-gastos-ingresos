import { NgModule } from '@angular/core';
import { BillsRoutingModule } from './bills-routing.module';
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
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [BillsComponent],
  imports: [BillsRoutingModule, ConfirmDialogModule, ToastrModule.forRoot(),ButtonModule, MatDialogModule,  NgxPaginationModule, MatFormFieldModule,
    MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, 
    MatButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule, 
    SharedModule, CoreModule, MatIconModule , CommonModule, MatTooltipModule],
  providers: [ConfirmationService, ToastrService],
  bootstrap: [BillsModule],
})
export class BillsModule {}
