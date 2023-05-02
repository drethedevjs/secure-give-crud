import { useEffect, useState } from "react";
import { Transaction } from "../../Shared/types/Transaction.js";
import { TransactionService } from "./TransactionService.js";

function Home() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (!transactions.length) {
      TransactionService.getTransactions().then((res: any) => {
        setTransactions(res.data);
      });
    }
  }, []);

  return (
    <ul>
      { transactions.map((t: Transaction) => {
        return(
          <li key={t.id}>{t.name}</li>
        )
      })}
    </ul>
  )

}

export default Home;