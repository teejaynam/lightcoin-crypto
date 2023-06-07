class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;

    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
    //keep date of transaction
      this.time = new Date();
      //add transaction to account
      this.account.addTransaction(this);
      return true;
    } else {
      console.log("Not enough balance");
      return false;
    }
  }

}

class Withdrawal extends Transaction {

  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }

  get value() {
    return -this.amount;
  }

}

class Deposit extends Transaction {

  isAllowed() {
    return true;
  }

  get value() {
    return this.amount;
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("snow-patrol");

console.log("Starting balance", myAccount.balance);

console.log("Can't withdraw 50 from 0")
t1 = new Withdrawal(50, myAccount);
console.log("Commit result: ", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Deposit should succeed!")
t3 = new Deposit(260.00, myAccount);
console.log("Commit result: ", t3.commit());
console.log("Account Balance: ", myAccount.balance);


console.log('Ending balance', myAccount.balance);
console.log("Transaction history", myAccount.transactions);


