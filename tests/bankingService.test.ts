import { BankingService } from "../services/bankingService";

describe('BankingService', () => {
    let service: BankingService;
  
    beforeEach(() => {
      service = new BankingService();
    });
  
    it('should create an account correctly', () => {
      const account = service.createAccount('John Doe', 1000);
      expect(account).toBeDefined();
      expect(account.name).toBe('John Doe');
      expect(account.balance).toBe(1000);
    });
  
    it('should deposit money into account correctly', () => {
      const account = service.createAccount('Jane Doe', 1000);
      service.deposit(account.id, 500);
      expect(account.balance).toBe(1500);
    });
  
    it('should withdraw money from account correctly', () => {
      const account = service.createAccount('Jane Doe', 1000);
      service.withdraw(account.id, 500);
      expect(account.balance).toBe(500);
    });
  
    it('should transfer money between accounts correctly', () => {
      const accountFrom = service.createAccount('John Doe', 1000);
      const accountTo = service.createAccount('Jane Doe', 1000);
      service.transfer(accountFrom.id, accountTo.id, 500);
      expect(accountFrom.balance).toBe(500);
      expect(accountTo.balance).toBe(1500);
    });

    it('should throw an error when trying to create an account with negative balance', () => {
        const createAccountWithNegativeBalance = () => {
          service.createAccount('John Doe', -100);
        };
        expect(createAccountWithNegativeBalance).toThrow('Initial balance cannot be negative.');
      });

      it('should not change account balances if transfer fails due to insufficient funds', () => {
        const accountFrom = service.createAccount('John Doe', 300);
        const accountTo = service.createAccount('Jane Doe', 500);
      
        const transferWithInsufficientFunds = () => {
          service.transfer(accountFrom.id, accountTo.id, 400);
        };
      
        expect(transferWithInsufficientFunds).toThrow(Error);
        expect(accountFrom.balance).toBe(300);
        expect(accountTo.balance).toBe(500);
      });
  });