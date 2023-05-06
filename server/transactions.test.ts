import transaction, { clearTransactions, createTransactions } from "./routes/transaction.js";
import request from "supertest";
import { describe, test, expect, it, beforeEach ,afterEach } from "@jest/globals";
import app from "./app.js";
import Chance from 'chance';

const random = new Chance();

beforeEach(() => createTransactions());
afterEach(() => { clearTransactions() })

describe("GET /transactions", () => {
  it("Returns an array of data.", async function() {
    let response = await request(app.use(transaction)).get("/");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
  })
});

describe("POST /transactions", () => {
  it("Returns a 200 response code.", async function() {
    let newTrans = {
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    }

    let response = await request(app.use(transaction)).post("/").send(newTrans);

    expect(response.statusCode).toBe(200);
  });

  it("Creates a new transaction record in the array.", async function() {
    let expected = {
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    }

    let response = await request(app.use(transaction)).post("/").send(expected);

    expect(response.statusCode).toBe(200);
    expect(response.body.transaction.name).toBe(expected.name);
    expect(response.body.transaction.donation).toBe(expected.donation);
    expect(response.body.transaction.amount).toBe(expected.amount);
  });

  test("Returning message verification.", async function() {
    let newTrans = {
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    }

    let response = await request(app.use(transaction)).post("/").send(newTrans);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Transaction added!");
  });

  it("Adds new transaction with today's date", async function() {
    let newTrans = {
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    }

    let todaysDate = new Date().getDate();
    let response = await request(app.use(transaction)).post("/").send(newTrans);

    let responseDate = new Date(response.body.transaction.date).getDate();
    expect(responseDate).toBe(todaysDate);
  })
});

describe("PUT /transactions/:id", () => {
  it("Response message verification", async function() {
    // Using the range for the sake of time because I already know what the array is. Usually,
    // this kind of test would have a place to add a record, get the key, and update that
    // record with that key.

    let newTrans = {
      id: random.integer({ min: 1, max: 50 }),
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    };

    let response = await request(app.use(transaction)).put(`/${newTrans.id}`).send(newTrans);

    expect(response.body.message).toBe("Transaction updated!");
  });

  it("Updates an existing transaction", async function() {
    // Using the range for the sake of time because I already know what the array is. Usually,
    // this kind of test would have a place to add a record, get the key, and update that
    // record with that key.

    let newTrans = {
      id: random.integer({ min: 1, max: 50 }),
      name: random.name(),
      donation: random.bool({ likelihood: 50 }),
      amount: `${random.integer({ min: 1 })}`
    };

    let response = await request(app.use(transaction)).put(`/${newTrans.id}`).send(newTrans);

    expect(response.body.transaction.name).toBe(newTrans.name);
    expect(response.body.transaction.donation).toBe(newTrans.donation);
    expect(response.body.transaction.amount).toBe(newTrans.amount);
  })
});

describe("DELETE /transactions/:id", () => {
  it("Returns a 200 response code.", async function() {
    let response = await request(app.use(transaction)).delete(`/1`);

    expect(response.statusCode).toBe(200);
  });

  it("Delete response message verify.", async function() {
    let response = await request(app.use(transaction)).delete(`/1`);

    expect(response.body.message).toBe("Transaction deleted!");
  });

  it("Removes a record from the transactions foo db.", async function() {
    let transactionId = random.integer({ min: 1, max: 50 });

    let response = await request(app.use(transaction)).delete(`/${transactionId}`);

    expect(Array.isArray(response.body.transactions)).toBeTruthy();
    expect(response.body.transactions.length).toBe(49);
  });
});