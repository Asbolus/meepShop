"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountController = void 0;
const bankingService_1 = require("../services/bankingService");
class AccountController {
    constructor() {
        this.bankingService = new bankingService_1.BankingService();
    }
    createAccount(req, res) {
        const { name, balance } = req.body;
        try {
            const account = this.bankingService.createAccount(name, balance);
            res.status(201).json(account);
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    deposit(req, res) {
        const { accountId, amount } = req.body;
        try {
            this.bankingService.deposit(accountId, amount);
            res.status(200).json({ message: 'Deposit successful' });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    withdraw(req, res) {
        const { accountId, amount } = req.body;
        try {
            this.bankingService.withdraw(accountId, amount);
            res.status(200).json({ message: 'Withdrawal successful' });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    transfer(req, res) {
        const { fromAccountId, toAccountId, amount } = req.body;
        try {
            this.bankingService.transfer(fromAccountId, toAccountId, amount);
            res.status(200).json({ message: 'Transfer successful' });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    findAccountById(req, res) {
        const accountId = parseInt(req.params.accountId);
        if (isNaN(accountId)) {
            res.status(400).json({ message: 'Invalid account ID' });
            return;
        }
        try {
            const account = this.bankingService.findAccountById(accountId);
            if (account) {
                res.status(200).json(account);
            }
            else {
                res.status(404).json({ message: 'Account not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
    getTransactionLogs(req, res) {
        try {
            const logs = this.bankingService.getTransactionLogs();
            res.status(200).json(logs);
        }
        catch (error) {
            res.status(500).json({ message: 'An error occurred while fetching transaction logs.' });
        }
    }
}
exports.AccountController = AccountController;
