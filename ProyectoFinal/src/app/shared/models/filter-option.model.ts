import { TransactionType } from "./transaction-Type.model";

export interface FilterOption {
    transactionType?: TransactionType;
    description: string;
    from: Date;
    to: Date;
}