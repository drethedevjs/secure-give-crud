import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import TransactionEditForm from "./TransactionEditForm.js";
import { TransactionModalProps } from "./PropInterfaces.js";
import { Transaction } from "../../Shared/types/Transaction.js";

const TransactionModal: FC<TransactionModalProps> = ({ record, show, handleCloseFunction, handleSaveTransaction}): JSX.Element => {
  const [transactionFormData, setTransactionFormData] = useState<Transaction>(record);

  useEffect(() => {
    setTransactionFormData(record);
  }, [record]);

  return (
    <div
      className="modal"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={handleCloseFunction}>
        <Modal.Header closeButton>
          <Modal.Title>{record?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <TransactionEditForm transactionFormData={transactionFormData} setTransactionFormData={setTransactionFormData} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={() => handleSaveTransaction(transactionFormData)}>Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TransactionModal;