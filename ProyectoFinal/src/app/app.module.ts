import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MenubarModule} from 'primeng/menubar';
import { MenuComponent } from './shared/components/menu/menu.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ButtonCustomComponent } from './shared/components/button-custom/button-custom.component';
import { TableCustomComponent } from './shared/components/table-custom/table-custom.component';
import {ButtonModule} from 'primeng/button';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ButtonModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
