class bank {
	constructor(money = 10000) {
		this.cash = money;
		this.startingCapital = money;
		this.taxes = 2;

	}
	add(number) {
		this.cash += number;
	}
}
module.exports = bank;