import { NgModule } from "@angular/core";
import { TransactionBaseService } from "./services/transactionBase.service";
import  { HttpClientModule } from '@angular/common/http'
import { SharedModule } from "primeng/api";

@NgModule({
    declarations: [],
    imports: [ HttpClientModule, SharedModule ],
    providers: [TransactionBaseService],
    bootstrap: [CoreModule],
  })
  export class CoreModule {}
  