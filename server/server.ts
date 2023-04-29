import express from 'express';
import transactionRouter from './routes/transaction.js';

const app = express();

app.use(express.json());
app.use("/transactions", transactionRouter);

app.listen(2222, () => {
  console.log("Church Transactions server is running on port 2222");
});