import { ChangeEvent, FC } from "react";
import { Form } from "react-bootstrap";
import { TransactionEditFormProps } from "../Utils/PropInterfaces.js";

const TransactionEditForm: FC<TransactionEditFormProps> = ({ transactionFormData, setTransactionFormData }): JSX.Element => {

  const handleNameChange = (e: ChangeEvent) => setTransactionFormData({ ...transactionFormData, name: (e.target as HTMLInputElement).value })
  const handleAmountChange = (e: ChangeEvent) => setTransactionFormData({ ...transactionFormData, amount: (e.target as HTMLInputElement).value })
  const handleDonationToggle = (e: ChangeEvent) => setTransactionFormData({ ...transactionFormData, donation: (e.target as HTMLInputElement).checked })

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={transactionFormData.name} onChange={handleNameChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" value={transactionFormData.amount.replace("$", "")} onChange={handleAmountChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Donation" checked={transactionFormData.donation} onChange={handleDonationToggle} />
      </Form.Group>
    </Form>
  )
}

export default TransactionEditForm;