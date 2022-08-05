const { saveBank } = require('./saveBank');

class bank {
	constructor(money = 10000, startingCapital = 10000, taxes = 2) {
		this.cash = money;
		this.startingCapital = startingCapital;
		this.taxes = taxes;

	}
	add(number) {
		this.cash += Number(this.cash) + Number(number);
		saveBank(this);
	}
}
module.exports = bank;