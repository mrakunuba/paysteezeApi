const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Mock data for VTU operations
let airtimeTransactions = [];
let dataTransactions = [];

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to simulate airtime top-up
app.post('/api/airtime/topup', (req, res) => {
  const { phoneNumber, amount } = req.body;
  if (!phoneNumber || !amount) {
    return res.status(400).json({ error: 'Phone number and amount are required' });
  }
  const transaction = { phoneNumber, amount, timestamp: new Date(), id: Date.now() };
  airtimeTransactions.push(transaction);
  res.status(200).json({ message: 'Airtime top-up successful', transaction });
});

// Endpoint to simulate data top-up
app.post('/api/data/topup', (req, res) => {
  const { phoneNumber, dataPlan } = req.body;
  if (!phoneNumber || !dataPlan) {
    return res.status(400).json({ error: 'Phone number and data plan are required' });
  }
  const transaction = { phoneNumber, dataPlan, timestamp: new Date(), id: Date.now() };
  dataTransactions.push(transaction);
  res.status(200).json({ message: 'Data top-up successful', transaction });
});

// Endpoint to get all airtime transactions
app.get('/api/airtime/transactions', (req, res) => {
  res.status(200).json(airtimeTransactions);
});

// Endpoint to get all data transactions
app.get('/api/data/transactions', (req, res) => {
  res.status(200).json(dataTransactions);
});

// Endpoint to simulate electricity bill payment
app.post('/api/electricity/pay', (req, res) => {
  const { meterNumber, amount } = req.body;
  if (!meterNumber || !amount) {
    return res.status(400).json({ error: 'Meter number and amount are required' });
  }
  const transaction = { meterNumber, amount, timestamp: new Date(), id: Date.now() };
  res.status(200).json({ message: 'Electricity bill payment successful', transaction });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Mock API Server');
});

app.listen(port, () => {
  console.log(`Mock API Server listening at http://localhost:${port}`);
});
