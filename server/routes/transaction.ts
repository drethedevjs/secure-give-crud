import express from 'express';
import Chance from 'chance';
import { Transaction } from '../../Shared/types/Transaction.js';

const router = express.Router();
const random = new Chance();
let transactions: Transaction[] = [];

router.get("/", async (req, res) => {
  if (!transactions.length) {
    createTransactions();
  }

  res.json(transactions);
});

router.post("/", (req, res) => {
  let t: Transaction = {
    id: transactions[transactions.length - 1].id + 1, // Does not mimic db identity column because you can delete say id 5 but the next created one should be 6.
    name: req.body.name,
    amount: req.body.amount,
    date: new Date(),
    donation: req.body.donation
  };

  transactions.push(t);
  res.json({ message: "Transaction added!", transaction: t });
});

router.put("/:id", (req, res) => {
  let idx = req.body.id - 1;
  transactions[idx] = req.body;

  res.json({ message: "Transaction updated!", transaction: transactions[idx] });
});

router.delete("/:id", (req, res) => {
  transactions = transactions.filter(t => t.id !== Number(req.params.id))

  // Not a good idea to return the remaining transactions in the response. Doing so
  // for the sake of having a meaningful test for this endpoint.
  res.json({ message: "Transaction deleted!", transactions: transactions });
});

export function createTransactions(): void {
  // let transactions: Transaction[] = [];
  for (let i = 1; i <= 50; i++) {
    transactions.push({
      id: i,
      name: random.name({ nationality: 'en' }),
      date: random.date({ year: 2023 }),
      amount: random.dollar({ max: 500 }),
      donation: random.bool({ likelihood: 70 })
    });
  };
}

export const clearTransactions = (): void => { transactions = [] };

export default router;