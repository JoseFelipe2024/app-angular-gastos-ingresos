import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserAuth } from '../../models/userAuth.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  user!: UserAuth;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label: 'Ingresos',
        icon: 'pi pi-fw pi-plus-circle',
        routerLink: '/income'
      },
      {
        label: 'Gastos',
        icon: 'pi pi-minus',
        routerLink: '/bills'
      },
      {
        label: 'Ingresos/Gastos',
        icon: 'pi pi-fw pi-clone',
        routerLink: '/income-bills'
      },
    ];
    this.getUserAuth();
  }

  private getUserAuth(){
    this.auth.getUserAuth().subscribe(user => {
      this.user = user;
    });
  }

  logout(){
    this.auth.logout();
  }

  get getInitialName(){
    return `${this.user?.firstName?.charAt(0)}`
  }

}