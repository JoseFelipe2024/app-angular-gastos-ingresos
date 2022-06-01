import { NgModule } from "@angular/core";
import  { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SharedModule } from "primeng/api";
import { TransactionBaseService } from "./services/transactionBase.service";
import { LoandingServicesService } from "./services/loanding-services.service";
import { LoandingInterceptorInterceptor } from "./interceptors/loanding-interceptor.interceptor";

@NgModule({
    declarations: [],
    imports: [ HttpClientModule, SharedModule ],
    providers: [
      TransactionBaseService, 
     
      {
        provide: HTTP_INTERCEPTORS, useClass: LoandingInterceptorInterceptor,
        multi: true
      }
    ],
    bootstrap: [CoreModule],
  })
  export class CoreModule {}
  