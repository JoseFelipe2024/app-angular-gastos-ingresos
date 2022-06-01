import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IncomeBillComponent } from "./components/income-bill/income-bill.component";


const routes: Routes = [
    {
      path: '',
      component: IncomeBillComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class IncomeBillRoutingModule {}