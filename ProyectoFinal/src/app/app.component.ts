import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoandingServicesService } from './core/services/loanding-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterContentChecked {
  isLoanding: boolean = false;

  constructor(private loandingServicesService: LoandingServicesService,
    private cdref: ChangeDetectorRef){
    this.getLoanding();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  getLoanding(){
    this.loandingServicesService.getLoanding().subscribe(l => {
      this.isLoanding = l;
    })
  }
  

}
