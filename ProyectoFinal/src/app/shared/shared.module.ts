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
import { ButtonCustomComponent } from "./components/button-custom/button-custom.component";
import { MenuComponent } from "./components/menu/menu.component";
import { TableCustomComponent } from "./components/table-custom/table-custom.component";


@NgModule({
    declarations: [ButtonCustomComponent, MenuComponent, TableCustomComponent],
    imports: [ButtonModule, MatDialogModule, MatFormFieldModule,
      MatInputModule, MatFormFieldModule, MatNativeDateModule, MatDatepickerModule, 
      MatButtonModule, FormsModule, ReactiveFormsModule, MatDividerModule,
      MenubarModule],
    providers: [],
    exports: [ButtonCustomComponent, MenuComponent, TableCustomComponent],
    bootstrap: [SharedModule],
  })
  export class SharedModule {}
  