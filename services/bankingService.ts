import { Account } from '../models/account';

export class BankingService {
  private accounts: Account[] = [];
  private transactionLog: any[] = [];
  private static nextId: number = 1;

  public createAccount(name: string, balance: number): Account {
    if (balance < 0) {
      throw new Error('Initial balance cannot be negative.');
    }
    const newAccount = new Account(BankingService.nextId++, name, balance);
    this.accounts.push(newAccount);
    return newAccount;
  }

  public deposit(accountId: number, amount: number): void {
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

  public withdraw(accountId: number, amount: number): void {
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

  public transfer(fromAccountId: number, toAccountId: number, amount: number): void {
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
    } catch (error) {
        fromAccount.balance = initialState.fromBalance;
        toAccount.balance = initialState.toBalance;

        console.error(error);
    }
    
  }

  public findAccountById(accountId: number): Account | undefined {
    return this.accounts.find(account => account.id === accountId);
  }
}