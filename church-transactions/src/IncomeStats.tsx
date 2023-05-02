import { FC } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IncomeStatsProps } from "./IncomeStatsProps.js";

const IncomeStats: FC<IncomeStatsProps> = (props): JSX.Element => {
  return (
    <Container>
      <Row>
        <Col>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className="text-muted">No. of Donors</Card.Title>
              <h1 className="display-1">{props.noOfDonors}</h1>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Card.Title className="text-muted">Total Amount</Card.Title>
              <h1 className="display-1">{props.amount}</h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default IncomeStats;