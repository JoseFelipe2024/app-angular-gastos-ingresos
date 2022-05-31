import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddBillsComponent } from "./components/add-bills/add-bills.component";
import { BillsComponent } from "./components/bills/bills.component";

const routes: Routes = [
    {
      path: '',
      component: BillsComponent,
    },
  ];
  


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BillsRoutingModule { }