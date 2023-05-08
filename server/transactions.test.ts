import request from "supertest";
import { describe, test, expect, it, beforeEach ,afterEach } from "@jest/globals";
import Chance from 'chance';
import transaction, { clearTransactions, createTransactions } from "./routes/transaction.js";
import app from "./app.js";

const random = new Chance();

const newTrans = {
  name: random.name(),
  donation: random.bool({ likelihood: 50 }),
  amount: `${random.integer({ min: 1 })}`
};

beforeEach(() => createTransactions());
afterEach(() => clearTransactions());

describe("GET /transactions", () => {
  it("Returns a 200 response code.", async () => {
    // Act
    let response = await request(app.use(transaction)).get("/");

    // Assert
    expect(response.statusCode).toBe(200);
  });

  it("Returns an array of data.", async () => {
    // Act
    let response = await request(app.use(transaction)).get("/");

    // Assert
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("POST /transactions", () => {
  it("Returns a 200 response code.", async () => {
    // Act
    let response = await request(app.use(transaction)).post("/").send(newTrans);

    // Assert
    expect(response.statusCode).toBe(200);
  });

  it("Creates a new transaction record in the array.", async () => {
    // Arrange
    let expected = {
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    };

    // Act
    let response = await request(app.use(transaction)).post("/").send(expected);

    // Assert
    expect(response.body.transaction.name).toBe(expected.name);
    expect(response.body.transaction.donation).toBe(expected.donation);
    expect(response.body.transaction.amount).toBe(expected.amount);
  });

  test("Returning message verification.", async () => {
    // Act
    let response = await request(app.use(transaction)).post("/").send(newTrans);

    // Asset
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Transaction added!");
  });

  it("Adds new transaction with today's date", async () => {
    // Arrange
    let todaysDate = new Date().getDate();

    // Act
    let response = await request(app.use(transaction)).post("/").send(newTrans);

    // Asset
    let responseDate = new Date(response.body.transaction.date).getDate();
    expect(responseDate).toBe(todaysDate);
  })
});

describe("PUT /transactions/:id", () => {
  it("Response message verification", async () => {
    // Using the id range for the sake of time because I already know what the array is. Usually,
    // this kind of test would have a place to add a record, get the key, and update that
    // record with that key.

    // Arrange
    let trans = {
      id: random.integer({ min: 1, max: 50 }),
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    };

    // Act
    let response = await request(app.use(transaction)).put(`/${trans.id}`).send(trans);

    // Asset
    expect(response.body.message).toBe("Transaction updated!");
  });

  it("Updates an existing transaction", async () => {
    // Using the id range for the sake of time because I already know what the array is. Usually,
    // this kind of test would have a place to add a record, get the key, and update that
    // record with that key.

    // Arrange
    let trans = {
      id: random.integer({ min: 1, max: 50 }),
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    };

    // Act
    let response = await request(app.use(transaction)).put(`/${trans.id}`).send(trans);

    // Asset
    expect(response.body.transaction.name).toBe(trans.name);
    expect(response.body.transaction.donation).toBe(trans.donation);
    expect(response.body.transaction.amount).toBe(trans.amount);
  })
});

describe("DELETE /transactions/:id", () => {
  it("Returns a 200 response code.", async () => {
    // Act
    let response = await request(app.use(transaction)).delete(`/1`);

    // Asset
    expect(response.statusCode).toBe(200);
  });

  it("Delete response message verify.", async () => {
    // Act
    let response = await request(app.use(transaction)).delete(`/1`);

    // Asset
    expect(response.body.message).toBe("Transaction deleted!");
  });

  it("Removes a record from the transactions foo db.", async () => {
    // Arrange
    let transactionId = random.integer({ min: 1, max: 50 });

    // Act
    let response = await request(app.use(transaction)).delete(`/${transactionId}`);

    // Assert
    expect(Array.isArray(response.body.transactions)).toBeTruthy();
    expect(response.body.transactions.length).toBe(49);
  });
});