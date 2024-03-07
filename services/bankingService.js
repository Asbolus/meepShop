"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankingService = void 0;
const account_1 = require("../models/account");
class BankingService {
    constructor() {
        this.accounts = [];
        this.transactionLog = [];
    }
    createAccount(name, balance) {
        if (balance < 0) {
            throw new Error('Initial balance cannot be negative.');
        }
        const newAccount = new account_1.Account(BankingService.nextId++, name, balance);
        this.accounts.push(newAccount);
        return newAccount;
    }
    deposit(accountId, amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Invalid amount.');
        }
        if (amount <= 0) {
            throw new Error('Amount must be greater than zero.');
        }
        const account = this.findAccountById(accountId);
        if (!account) {
            throw new Error('Account not found.');
        }
        account.balance += amount;
    }
    withdraw(accountId, amount) {
        if (typeof amount !== 'number' || isNaN(amount)) {
            throw new Error('Invalid amount.');
        }
        const account = this.findAccountById(accountId);
        if (!account) {
            throw new Error('Account not found.');
        }
        if (account.balance < amount) {
            throw new Error('Insufficient funds.');
        }
        account.balance -= amount;
    }
    transfer(fromAccountId, toAccountId, amount) {
        const fromAccount = this.findAccountById(fromAccountId);
        const toAccount = this.findAccountById(toAccountId);
        if (!fromAccount || !toAccount) {
            throw new Error('One or both accounts not found.');
        }
        if (fromAccount.balance < amount) {
            throw new Error('Insufficient funds for transfer.');
        }
        const initialState = {
            fromBalance: fromAccount.balance,
            toBalance: toAccount.balance
        };
        try {
            fromAccount.balance -= amount;
            toAccount.balance += amount;
            this.transactionLog.push({ fromAccountId, toAccountId, amount, date: new Date() });
        }
        catch (error) {
            fromAccount.balance = initialState.fromBalance;
            toAccount.balance = initialState.toBalance;
            console.error(error);
        }
    }
    findAccountById(accountId) {
        return this.accounts.find(account => account.id === accountId);
    }
    getTransactionLogs() {
        return this.transactionLog;
    }
}
exports.BankingService = BankingService;
BankingService.nextId = 1;
