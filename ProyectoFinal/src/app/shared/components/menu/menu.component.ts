import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Ingresos/Gastos',
        icon: 'pi pi-fw pi-clone',
        routerLink: 'income-bills'
      },
      {
        label: 'Ingresos',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: 'income'
      },
      {
        label: 'Gastos',
        icon: 'pi pi-minus',
        routerLink: 'bills'
      }
    ];
  }

}
