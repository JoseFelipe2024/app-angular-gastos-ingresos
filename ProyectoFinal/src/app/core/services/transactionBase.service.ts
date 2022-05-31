import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Bill } from "src/app/shared/models/bill.model";

export class TransactionBaseService{
    private bills: Bill[] = [];
    private bill$: BehaviorSubject<Bill[]> = new BehaviorSubject<Bill[]>(this.bills);

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

}