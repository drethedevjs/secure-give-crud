import express from "express";
import transactionRouter from "./routes/transaction.js";
import cors from "cors";

const app = express();

const corsOptions = {
  "origin": "http://localhost:5173",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200,
  "credentials": true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/transactions", transactionRouter);

export default app;