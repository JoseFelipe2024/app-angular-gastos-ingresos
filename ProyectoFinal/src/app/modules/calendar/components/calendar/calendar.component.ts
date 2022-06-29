import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { Subject } from 'rxjs';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { Transaction } from 'src/app/shared/models/transaction.mode';
import { ApiResponse } from 'src/app/shared/models/apiResponse.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  typesTransaction: any[] = [
    {
      id: TransactionType.Income,
      name: 'Ingreso'
    },
    {
      id: TransactionType.Bill,
      name: 'Gasto'
    },
  ];

  events: CalendarEvent[] = [];

  transactionOriginalList: Transaction[] = [];
  transaction: Transaction[] = [];

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

  activeDayIsOpen: boolean = true;

  constructor(private transactionBaseService: TransactionBaseService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  
  getTransactions(){
    this.transactionBaseService.getTransactions().subscribe((res: ApiResponse<Transaction[]>) => {
      this.transaction = res.data;
      this.transactionOriginalList = res.data;

      this.events = this.transactionOriginalList.map(t => {
        return {
          start: t.date,
          end: t.date,
          title: t.description,
          color: this.colors.red,
          allDay: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }
      });
      console.log(this.events)
    }, error => {
      this.toastr.error('Ha ocurriodo un error al cargar los datos');
    });
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
