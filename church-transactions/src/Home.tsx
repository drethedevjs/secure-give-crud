import { useEffect, useState } from "react";
import { Badge, ListGroup } from "react-bootstrap";
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
    <>
      <h1>First Baptist Generosity</h1>
      <ListGroup as="ul">
        { transactions.map((t: Transaction) => {
          return(
              <ListGroup.Item key={t.id} as="li">
                {t.name} {t.amount}
                <Badge bg="primary" pill hidden={!t.donation}>donation</Badge>
              </ListGroup.Item>
            )
          }
        )}
      </ListGroup>
    </>
  )
}

export default Home;