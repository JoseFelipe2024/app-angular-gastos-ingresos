import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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

const colors: any = {
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

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  selectedValue: any = null;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  transaction: Transaction[] = [];
  transactionOriginalList: Transaction[] = [];

  typesTransaction: {id: number, name: string}[] = [
    {
      id: 0,
      name: 'Todas'
    },
    {
      id: TransactionType.Income,
      name: 'Ingreso'
    },
    {
      id: TransactionType.Bill,
      name: 'Gasto'
    },
  ];

  constructor( private toastr: ToastrService, private transactionBaseService: TransactionBaseService) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions(){
    this.transactionBaseService.getTransactions().subscribe((res: ApiResponse<Transaction[]>) => {
      this.transaction = res.data;
      this.transactionOriginalList = res.data;
      this.setEvents([...this.transactionOriginalList])
    }, error => {
      this.toastr.error('Ha ocurriodo un error al cargar los datos');
    });
  }

  private setEvents(transactions: Transaction[]){
    transactions.forEach(t => {
      this.events.push({
        start: subDays(startOfDay(new Date(t.date)),0),
        end: addDays(new Date(t.date), 0),
        title: `${t.description} - $${t.amount} Pesos`,
        color: t.type === TransactionType.Income ? colors.blue : colors.red,
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        draggable: false,
      });
    });
    this.refresh.next();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  onChange(event: number){
    this.events = [];
    const filter = this.transactionOriginalList?.filter(t => t?.type === event);
    this.setEvents(filter?.length > 0 ? [...filter] : [...this.transactionOriginalList]);
  }

}