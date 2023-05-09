import { FC, useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { Transaction } from "../../../Shared/types/Transaction.js";
import IncomeStats from "./IncomeStats.js";
import TransactionModal from "./TransactionModal.js";
import { TransactionService } from "../Utils/TransactionService.js";
import HomeHelper from "../Utils/HomeHelper.js";

const Home: FC = (): JSX.Element => {
  const [amount, setAmount] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<Array<Transaction>>([]);
  const [transaction, setTrans] = useState<Transaction>({
    id: 0,
    name: "",
    amount: "",
    donation: false,
    date: new Date()
  });

  const handleShowForm = (transactionId: number) => {
    if (transactionId) {
      let t = transactions.find(t => t.id === transactionId);
      if (t) {
        setTrans(t);
      }
    } else {
      setTrans({
        id: 0,
        name: "",
        amount: "",
        donation: false,
        date: new Date()
      })
    }

    setShowForm(true);
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    let res = await TransactionService.deleteTransaction(transactionId);
    HomeHelper.toastMsg(res.data.message, "success");
    let records = transactions.filter(t => t.id !== transactionId);
    setTransactions(records);
    setAmount(HomeHelper.calculateTotalAmount(records));
  };

  const handleSaveTransaction = async (t: Transaction) => {
    t.amount = HomeHelper.formatCurrencyAmount(t.amount);

    if (t.id) {
      let res = await TransactionService.updateTransaction(t);
      transactions[t.id - 1] = res.data.transaction;
      HomeHelper.toastMsg(res.data.message, "success");
    } else {
      let res = await TransactionService.addTransaction(t);
      HomeHelper.toastMsg(res.data.message, "success");
      transactions.push(res.data.transaction);
    };

    setAmount(HomeHelper.calculateTotalAmount(transactions));
    setShowForm(false);
  }

  useEffect(() => {
    if (!transactions.length) {
      TransactionService.getTransactions().then((res: any) => {
        setTransactions(res.data);
        setAmount(HomeHelper.calculateTotalAmount(res.data));
      });
    }
  }, []);

  return (
    <>
      <h1 className="mt-3 mb-5">First Baptist Generosity</h1>

      <TransactionModal show={showForm} record={transaction} handleCloseFunction={() => setShowForm(false)} handleSaveTransaction={handleSaveTransaction} />
      <IncomeStats noOfDonors={transactions.length} amount={amount} />

      <hr className="hr" />

      <Button variant="outline-success" onClick={() => handleShowForm(0)}>Add Transaction</Button>
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
                <td>
                  {new Intl.DateTimeFormat('en-US', {timeStyle: "short", dateStyle: "short"}).format(new Date(t.date))}
                </td>
                <td>{t.name}</td>
                <td>{t.amount}</td>
                <td><Badge bg="primary" pill hidden={!t.donation}>donation</Badge></td>
                <td>
                  <Button variant="outline-primary" onClick={() => handleShowForm(t.id)}>View</Button>{" "}
                  <Button variant="outline-danger" onClick={() => handleDeleteTransaction(t.id)}>Delete</Button>
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