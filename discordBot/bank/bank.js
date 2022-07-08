class bank {
	constructor(money = 10000) {
		this.cash = money;
		this.startingCapital = money;

	}
	add(number) {
		this.cash += number;
	}
}
module.exports = bank;