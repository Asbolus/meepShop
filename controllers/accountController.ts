import { Request, Response } from 'express';
import { BankingService } from '../services/bankingService';

export class AccountController {
  private bankingService = new BankingService();

  public createAccount(req: Request, res: Response): void {
    const { name, balance } = req.body;
    try {
      const account = this.bankingService.createAccount(name, balance);
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  public deposit(req: Request, res: Response): void {
    const { accountId, amount } = req.body;
    try {
      this.bankingService.deposit(accountId, amount);
      res.status(200).json({ message: 'Deposit successful' });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  public withdraw(req: Request, res: Response): void {
    const { accountId, amount } = req.body;
    try {
      this.bankingService.withdraw(accountId, amount);
      res.status(200).json({ message: 'Withdrawal successful' });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  public transfer(req: Request, res: Response): void {
    const { fromAccountId, toAccountId, amount } = req.body;
    try {
      this.bankingService.transfer(fromAccountId, toAccountId, amount);
      res.status(200).json({ message: 'Transfer successful' });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  public findAccountById(req: Request, res: Response): void {
    const accountId = parseInt(req.params.accountId);
    if (isNaN(accountId)) {
        res.status(400).json({ message: 'Invalid account ID' });
        return;
    }

    try {
      const account = this.bankingService.findAccountById(accountId);
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'Account not found' });
      }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
}
  public getTransactionLogs(req: Request, res: Response): void {
    try {
      const logs = this.bankingService.getTransactionLogs();
      res.status(200).json(logs);
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while fetching transaction logs.' });
    }
  }
}