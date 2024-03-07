import express from 'express';
import bodyParser from 'body-parser';
import { AccountController } from './controllers/accountController';

const app = express();
app.use(bodyParser.json());

const accountController = new AccountController();
app.post('/account', (req, res) => accountController.createAccount(req, res));
app.post('/deposit', (req, res) => accountController.deposit(req, res));
app.post('/withdraw', (req, res) => accountController.withdraw(req, res));
app.post('/transfer', (req, res) => accountController.transfer(req, res));
app.get('/account/:accountId', (req, res) => accountController.findAccountById(req, res));
app.get('/logs', (req, res) => accountController.getTransactionLogs(req, res));

export default app;