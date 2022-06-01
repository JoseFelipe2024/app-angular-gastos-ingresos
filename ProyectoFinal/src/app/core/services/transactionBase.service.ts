import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Bill } from "src/app/shared/models/bill.model";
import { Income } from "src/app/shared/models/income.model";

export class TransactionBaseService{
    private bills: Bill[] = [];
    private bill$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>(this.bills);
    
    private income: Bill[] = [];
    private income$: BehaviorSubject<Income[]> = new BehaviorSubject<Income[]>(this.income);

    constructor(){

    }

    getBills(): Observable<Bill[]>{
        return this.bill$.asObservable();
    }

    addBill(bill: Bill){
        bill.id = this.bills.length + 1;
        this.bills = [...this.bills, bill];
        this.bill$.next(this.bills)
    }

    getIncome(): Observable<Income[]>{
        return this.income$.asObservable();
    }

    addIncome(income: Income){
        income.id = this.income.length + 1;
        this.income = [...this.income, income];
        this.income$.next(this.income)
    }

}