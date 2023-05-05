import axios from "../node_modules/axios/index.js";
import { TransactionServiceModel } from "../../Shared/types/TransactionServiceModel.js";
import { Transaction } from "../../Shared/types/Transaction.js";

const BASE_URL = "http://localhost:2222/transactions";

export const TransactionService: TransactionServiceModel = {
  getTransactions: () => axios.get(`${BASE_URL}/`),
  addTransaction: (transaction: Transaction) => axios.post(`${BASE_URL}`, transaction),
  updateTransaction: (transaction: Transaction) => axios.put(`${BASE_URL}/${transaction.id}`, transaction),
  deleteTransaction: (transactionId: number) => axios.delete(`${BASE_URL}/${transactionId}`)
};