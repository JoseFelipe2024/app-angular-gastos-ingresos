import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'bills',
        loadChildren: () =>
          import('../bills/bills.module').then((m) => m.BillsModule),
      },
      {
        path: 'income',
        loadChildren: () =>
          import('../income/income.module').then((m) => m.IncomeModule),
      },
      {
        path: 'income-bills',
        loadChildren: () =>
          import('../income-bills/income-bill.module').then(
            (m) => m.IncomeBillModule
          ),
      },
      /*{
        path: 'calendar',
        loadChildren: () =>
          import('../calendar/calendar.module').then((m) => m.CalendarModule),
      },*/
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
