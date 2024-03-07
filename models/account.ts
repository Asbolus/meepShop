export class Account {
  public id: number;;
  public name: string;
  public balance: number;

  constructor(id: number, name: string, balance: number) {
    this.id = id;
    this.name = name;
    this.balance = balance;
  }
}