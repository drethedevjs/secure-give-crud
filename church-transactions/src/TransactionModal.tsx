import { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { TransactionModalProps } from "./TransactionModalProps.js";

const TransactionModal: FC<TransactionModalProps> = (props): JSX.Element => {
  return (
    <div
      className="modal"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={props.show} onHide={props.handleCloseFunction}>
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TransactionModal;