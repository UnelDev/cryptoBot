class bank {
	constructor(money = 10000) {
		this.cash = money;
	}
	add(number) {
		this.cash += number;
	}
}
module.exports = bank;