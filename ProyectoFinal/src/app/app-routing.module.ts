import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', redirectTo: 'home', pathMatch: 'full', 
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'bills',
    loadChildren: () => import('./modules/bills/bills.module').then((m) => m.BillsModule),
  },
  {
    path: 'income',
    loadChildren: () => import('./modules/income/income.module').then((m) => m.IncomeModule),
  },
  {
    path: 'income-bills',
    loadChildren: () => import('./modules/income-bills/income-bill.module').then((m) => m.IncomeBillModule),
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
