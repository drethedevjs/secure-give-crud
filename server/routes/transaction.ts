import express from 'express';
import Chance from 'chance';
import { Transaction } from '../types/Transaction.js';

const router = express.Router();
const random = new Chance();
let transactions: Transaction[] = [];

router.get("/", (req, res) => {
  if (!transactions.length) {
    transactions = createTransactions();
  }

  res.json(transactions);
});

router.post("/", (req, res) => {
  let transaction: Transaction = {
    id: transactions.length + 1, // Does not mimic db identity column because you can delete say id 5 but the next created one should be 6.
    name: req.body.name,
    amount: req.body.amount,
    date: new Date(),
    donation: req.body.donation
  };

  transactions.push(transaction)
  res.send("Transaction added.");
});

router.put("/", (req, res) => {
  res.send("Transaction updated.");
});

router.delete("/", (req, res) => {
  res.send("Transaction deleted.");
});

function createTransactions(): Transaction[] {
  let transactions: Transaction[] = [];
  for (let i = 1; i <= 50; i++) {
    transactions.push({
      id: i,
      name: random.name({ nationality: 'en' }),
      date: random.date(),
      amount: random.dollar({ max: 10000 }),
      donation: random.bool({ likelihood: 70 })
    });
  };

  return transactions;
}

// module.exports = router;
export default router;