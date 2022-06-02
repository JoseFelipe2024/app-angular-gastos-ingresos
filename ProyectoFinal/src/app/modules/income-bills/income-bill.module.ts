import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ButtonModule } from "primeng/button";
import { CoreModule } from "src/app/core/core.module";
import { IncomeBillComponent } from "./components/income-bill/income-bill.component";
import { IncomeBillRoutingModule } from "./income-bill-Routing.module";
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from "@angular/forms";
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
    declarations: [IncomeBillComponent],
    imports: [IncomeBillRoutingModule, FormsModule, 
      ButtonModule, DropdownModule, CalendarModule,
       MatTooltipModule, CommonModule, CoreModule, InputNumberModule],
    providers: [],
    bootstrap: [IncomeBillModule],
  })
  export class IncomeBillModule {}
  