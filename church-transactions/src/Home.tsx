import { useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import { Transaction } from "../../Shared/types/Transaction.js";
import IncomeStats from "./IncomeStats.js";
import { TransactionService } from "./TransactionService.js";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");

  const calculateTotalAmount = (transactions: Array<Transaction>): string => {
    let total = 0;
    transactions.map(t => {
      let amt = t.amount.replace("$", "");
      total += Number(amt)
    });

    return `$${total.toFixed(2)}`;
  };

  useEffect(() => {
    if (!transactions.length) {
      TransactionService.getTransactions().then((res: any) => {
        setTransactions(res.data);
        setAmount(calculateTotalAmount(res.data));
      });
    }
  }, []);

  return (
    <>
      <h1>First Baptist Generosity</h1>
      <IncomeStats noOfDonors={transactions.length} amount={amount} />
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
            { transactions.map((t: Transaction) => {
              return(
                <tr>
                  <td>{t.date.toString()}</td>
                  <td>{t.name} <Badge bg="primary" pill hidden={!t.donation}>donation</Badge></td>
                  <td>{t.amount}</td>
                </tr>
                )
              }
            )}
        </tbody>
      </Table>
    </>
  )
}

export default Home;