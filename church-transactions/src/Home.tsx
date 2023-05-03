import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Transaction } from "../../Shared/types/Transaction.js";
import IncomeStats from "./IncomeStats.js";
import TransactionModal from "./TransactionModal.js";
import { TransactionService } from "./TransactionService.js";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
      <TransactionModal show={show} handleCloseFunction={handleClose} />
      <IncomeStats noOfDonors={transactions.length} amount={amount} />
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>Amount</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { transactions.map((t: Transaction) => (
            <tr>
              <td>{dateFormat(t.date, "m/d/yyyy, h:MM TT")}</td>
              <td>{t.name}</td>
              <td>{t.amount}</td>
              <td><Badge bg="primary" pill hidden={!t.donation}>donation</Badge></td>
              <td>
                <Button variant="outline-primary" onClick={handleShow}>View</Button>{' '}
                <Button variant="outline-danger">Delete</Button>{' '}
              </td>
            </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  )
}

export default Home;