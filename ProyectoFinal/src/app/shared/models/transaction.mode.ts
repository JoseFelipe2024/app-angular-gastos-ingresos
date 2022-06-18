export interface Transaction {
    id: number;
    amount: number;
    date: Date;
    description: string;
    type: number;
    evidence: string;
    typeFile: string;
    createDate: Date;
    updateDate: Date;
    userId: number;
}