import axios from "../node_modules/axios/index";
import { TransactionServiceModel } from "../../Shared/types/TransactionServiceModel";
import { Transaction } from "../../Shared/types/Transaction";

const BASE_URL = "http://localhost:2222/transactions";

export const TransactionService: TransactionServiceModel = {
  getTransactions: () => axios.get(`${BASE_URL}/`),
  addTransaction: (transaction: Transaction) => axios.post(`${BASE_URL}`, transaction),
  updateTransaction: (transactionId: number) => axios.put(`${BASE_URL}/${transactionId}`),
  deleteTransaction: (transactionId: number) => axios.delete(`${BASE_URL}/${transactionId}`)
};