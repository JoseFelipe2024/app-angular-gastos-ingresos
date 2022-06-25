import { NgModule } from "@angular/core";
import  { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SharedModule } from "primeng/api";
import { TransactionBaseService } from "./services/transactionBase.service";
import { LoandingServicesService } from "./services/loanding-services.service";
import { LoandingInterceptorInterceptor } from "./interceptors/loanding-interceptor.interceptor";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";
import { JwtModule } from "@auth0/angular-jwt";
import { UserAuth } from "../shared/models/userAuth.model";




@NgModule({
    declarations: [],
    imports: [ HttpClientModule, SharedModule ],
    providers: [
      TransactionBaseService, 
      {
        provide: HTTP_INTERCEPTORS, useClass: LoandingInterceptorInterceptor,
        multi: true
      },
      {
        provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
      },
      {
        provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
      }
    ],
    bootstrap: [CoreModule],
  })
  export class CoreModule {}
  