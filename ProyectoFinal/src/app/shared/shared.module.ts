import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ButtonModule } from "primeng/button";
import { MenubarModule } from "primeng/menubar";
import { MenuComponent } from "./components/menu/menu.component";
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { CoreModule } from "../core/core.module";
import { ViewEvidenceComponent } from './components/view-evidence/view-evidence.component';
import { CommonModule } from "@angular/common";
import { ToastrModule, ToastrService } from "ngx-toastr";
import { MatIconModule } from "@angular/material/icon";
import {AvatarModule} from 'primeng/avatar';
import {MenuModule} from 'primeng/menu';

@NgModule({
    declarations: [MenuComponent,  AddTransactionComponent, ViewEvidenceComponent],
    imports: [ButtonModule, MatDialogModule, ToastrModule.forRoot(), MatFormFieldModule,
      MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, 
      MatButtonModule, FormsModule,CommonModule, ReactiveFormsModule, MatDividerModule,
      MatIconModule, AvatarModule, MenuModule,
      MenubarModule, CoreModule],
    providers: [ToastrService],
    exports: [MenuComponent, AddTransactionComponent, ViewEvidenceComponent],
    bootstrap: [SharedModule],
  })
  export class SharedModule {}
  