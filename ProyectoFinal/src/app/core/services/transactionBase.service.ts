import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ApiResponse } from "src/app/shared/models/apiResponse.model";
import { Bill } from "src/app/shared/models/bill.model";
import { Income } from "src/app/shared/models/income.model";
import { TransactionType } from "src/app/shared/models/transaction-Type.model";
import { Transaction } from "src/app/shared/models/transaction.mode";
import { environment } from "src/environments/environment";

@Injectable()
export class TransactionBaseService{
    private readonly api_url = environment.API_URL;

    constructor(private http: HttpClient){

    }

    getTransactions(): Observable<ApiResponse<Transaction[]>> {
        return this.http.get<ApiResponse<Transaction[]>>(`${this.api_url}/Transaction`);
    }

    getTransactionsByType(type: TransactionType): Observable<ApiResponse<Transaction[]>> {
        return this.http.get<ApiResponse<Transaction[]>>(`${this.api_url}/Transaction/Type?type=${type}`);
    }

    addTransaction(transaction: Transaction):  Observable<ApiResponse<number>> {
        return this.http.post<ApiResponse<number>>(`${this.api_url}/Transaction`, transaction);
    }

    updateTransaction(transaction: Transaction):  Observable<ApiResponse<number>> {
        return this.http.put<ApiResponse<number>>(`${this.api_url}/Transaction`, transaction);
    }

    deleteTransactions(id: number): Observable<ApiResponse<number>> {
        return this.http.delete<ApiResponse<number>>(`${this.api_url}/Transaction/${id}`);
    }

}