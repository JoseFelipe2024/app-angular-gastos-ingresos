import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ButtonModule } from "primeng/button";
import { CoreModule } from "src/app/core/core.module";
import { IncomeBillComponent } from "./components/income-bill/income-bill.component";
import { IncomeBillRoutingModule } from "./income-bill-Routing.module";

@NgModule({
    declarations: [IncomeBillComponent],
    imports: [IncomeBillRoutingModule, ButtonModule, MatTooltipModule, CommonModule, CoreModule],
    providers: [],
    bootstrap: [IncomeBillModule],
  })
  export class IncomeBillModule {}
  