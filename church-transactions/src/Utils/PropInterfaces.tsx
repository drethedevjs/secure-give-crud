import { Transaction } from "../../../Shared/types/Transaction.js";

export interface TransactionModalProps {
  show: boolean;
  record: Transaction;
  handleCloseFunction(): void;
  handleSaveTransaction(t: Transaction): void;
};

export interface TransactionEditFormProps {
  transactionFormData: Transaction;
  setTransactionFormData: React.Dispatch<React.SetStateAction<Transaction>>;
};

export interface IncomeStatsProps {
  noOfDonors: number,
  amount: string
};