import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Transaction } from "../../Shared/types/Transaction.js";
import IncomeStats from "./IncomeStats.js";
import TransactionModal from "./TransactionModal.js";
import { TransactionService } from "./TransactionService.js";

function Home() {
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [transaction, setTrans] = useState<Transaction>({
    id: 0,
    name: "",
    amount: "",
    donation: false,
    date: new Date()
  });

  const [amount, setAmount] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const clearModal = () => setTrans({
    id: 0,
    name: "",
    amount: "",
    donation: false,
    date: new Date()
  })

  const handleShow = (transactionId: number | undefined) => {
    if (transactionId) {
      let t = transactions.find(t => t.id === transactionId);

      if (t) {
        setTrans(t);
      };
    } else {
      clearModal();
    }

    setShow(true);
  };

  const addCurrencySymbol = (t: Transaction) => t.amount = "$".concat(t.amount);

  const handleSaveTransaction = async (t: Transaction) => {
    if (t.id) {
      await TransactionService.updateTransaction(t);
      transactions[t.id - 1] = t;
    } else {
      let res = await TransactionService.addTransaction(t);
      addCurrencySymbol(res.data.transaction);
      transactions.push(res.data.transaction);
      setAmount(calculateTotalAmount(transactions));
    };

    setShow(false);
  }

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
      <TransactionModal show={show} record={transaction} handleCloseFunction={handleClose} handleSaveTransaction={handleSaveTransaction} />
      <IncomeStats noOfDonors={transactions.length} amount={amount} />

      <Button variant="outline-success" onClick={() => handleShow(undefined)}>Add Transaction</Button>{' '}
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
          { transactions.length ?
            transactions.map((t: Transaction) => (
              <tr key={t.id}>
                <td>{dateFormat(t.date, "m/d/yyyy, h:MM TT")}</td>
                <td>{t.name}</td>
                <td>{t.amount}</td>
                <td><Badge bg="primary" pill hidden={!t.donation}>donation</Badge></td>
                <td>
                  <Button variant="outline-primary" onClick={() => handleShow(t.id)}>View</Button>{' '}
                  <Button variant="outline-danger">Delete</Button>
                </td>
              </tr>
            ))
            :
            "You have no transactions recorded."
          }
        </tbody>
      </Table>
    </>
  )
}

export default Home;