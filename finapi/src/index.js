const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists)
    return res.status(405).json({
      status: 405,
      message: "Customer already exists!",
      error: "Method Not Allowed",
    });

  customers.push({
    cpf,
    name,
    id: uuid(),
    statement: [],
  });

  return res.status(201).send(customers);
});

// middleware
function verifyIfCustomerExists(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return res.status(400).json({
      status: 400,
      message: "Customer not found!",
      error: "Bad request",
    });
  }

  req.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((balance, operation) => {
    return operation.type === "credit"
      ? balance + operation.amount
      : balance - operation.amount;
  }, 0);

  return balance;
}

app.post("/deposit", verifyIfCustomerExists, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: "credit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send(customer.statement);
});

app.post("/withdraw", verifyIfCustomerExists, (req, res) => {
  const { amount } = req.body;

  const { customer } = req;

  const balance = getBalance(customer.statement);

  if (balance < amount)
    return res.status(405).json({
      status: 405,
      message: "Insufficient balance!",
      error: "Method not allowed!",
    });

  const statementOperation = {
    amount,
    createdAt: new Date(),
    type: "debit",
  };

  customer.statement.push(statementOperation);

  return res.status(201).send(customer.statement);
});

// app.use(verifyIfCustomerExists);

app.get("/statement", verifyIfCustomerExists, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.get("/statement/date", verifyIfCustomerExists, (req, res) => {
  const { customer } = req;

  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter(
    (statement) =>
      statement.createdAt.toDateString() === new Date(dateFormat).toDateString()
  );

  return res.json(statement);
});

app.get("/account", verifyIfCustomerExists, (req, res) => {
  const { customer } = req;

  return res.json(customer);
});

app.get("/balance", verifyIfCustomerExists, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.json({ balance });
});

app.put("/account", verifyIfCustomerExists, (req, res) => {
  const { name } = req.body;

  const { customer } = req;

  customer.name = name;

  return res.status(201).send(customer);
});

app.delete("/account", verifyIfCustomerExists, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(200).json(customers);
});

app.listen(3333);
