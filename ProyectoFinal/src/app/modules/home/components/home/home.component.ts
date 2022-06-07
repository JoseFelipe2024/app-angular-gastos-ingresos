import { Component, OnInit } from '@angular/core';
import { TransactionBaseService } from 'src/app/core/services/transactionBase.service';
import { TransactionType } from 'src/app/shared/models/transaction-Type.model';
import { Transaction } from 'src/app/shared/models/transaction.mode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  options: any;
  transactions: Transaction[] = [];

  optionMonthBills: any;
  optionMonthIncome: any;
  optionsType: any;

  months: string[] = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]

  constructor(private transactionBaseService: TransactionBaseService) {}

  ngOnInit(): void {
    this.transactionBaseService.getTransactions().subscribe((res) => {
      this.transactions = res.data;
      this.setData();
    });
  }

  private setData() {
    this.options = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      color: ['#5470c6', '#91cc75'],
      series: [
        {
          name: 'Montos Por Tipo de Transacción',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: this.getTotalAmountByType(TransactionType.Income),
              name: 'Ingresos',
            },
            {
              value: this.getTotalAmountByType(TransactionType.Bill),
              name: 'Gastos',
            },
          ],
        },
      ],
    };

    this.optionsType = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      color: ['#5470c6', '#91cc75'],
      series: [
        {
          name: 'Transacciones Por Tipo',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            {
              value: this.getTotalTransactionByType(TransactionType.Income),
              name: 'Ingresos',
            },
            {
              value: this.getTotalTransactionByType(TransactionType.Bill),
              name: 'Gastos',
            },
          ],
        },
      ],
    };

    this.optionMonthBills = {
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'category',
        data: this.months,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.getTotalAmountByMonth(TransactionType.Bill),
          type: 'bar',
        },
      ],
    };
    this.optionMonthIncome = {
      tooltip: {
        trigger: 'item',
      },
      xAxis: {
        type: 'category',
        data: this.months,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.getTotalAmountByMonth(TransactionType.Income),
          type: 'bar',
        },
      ],
    };
  }

  private getTotalAmountByType(type: TransactionType) {
    return this.transactions
      .filter((t) => t.type === type)
      .reduce((pre, curre) => pre + curre.amount, 0);
  }

  private getTotalTransactionByType(type: TransactionType) {
    return this.transactions
      .filter((t) => t.type === type)
      .length
  }

  private getTotalAmountByMonth(type: TransactionType) {
    let months: number[] = [];
    for (let index = 0; index <= 11; index++) {
      months.push(
        this.transactions
          .filter((t) => new Date(t.date)?.getMonth() === index && t.type === type)
          .reduce((pre, curre) => pre + curre.amount, 0)
      );
    }
    return months;
  }

  private getOptionMonth() {}
}
