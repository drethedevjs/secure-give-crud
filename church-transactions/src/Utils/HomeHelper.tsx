import { enqueueSnackbar } from "notistack"
import { Transaction } from "../../../Shared/types/Transaction.js"

const HomeHelper = {
  formatCurrency: (t: Transaction) => {
    if (!t.amount.startsWith("$")) {
      t.amount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(t.amount));
    }
  },
  formatCurrencyAmount: (amount: string): string => {
    if (!amount.startsWith("$")) {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(amount));
    }

    return amount
  },
  toastMsg: (msg: string, type: "default" | "error" | "success" | "warning" | "info" | undefined) => enqueueSnackbar(msg, { autoHideDuration: 3000, variant: type}),
  calculateTotalAmount: (transactions: Array<Transaction>): string => {
    let total = 0;

    transactions.map(t => {
      let amt = t.amount.replace("$", "");
      total += Number(amt)
    });

    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total);
  }
}

export default HomeHelper;