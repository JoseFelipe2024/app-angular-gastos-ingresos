import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', redirectTo: 'admin', pathMatch: 'full', 
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },
  /*{
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
  },*/
  {
    path: '**',
    redirectTo: 'admin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
