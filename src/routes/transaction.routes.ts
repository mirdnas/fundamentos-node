import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const gettransactions = transactionsRepository.all();
    const getbalance = transactionsRepository.getBalance();
    const transactions = {
      transactions: gettransactions,
      balance: getbalance,
    };
    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;
    const newTransaction = new CreateTransactionService(transactionsRepository);
    const transaction = newTransaction.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
