const log = require('../../tools/log.js');
const { buyOnResponse } = require('./gestion/buy.js');
const { exchangeResponseMP } = require('./gestion/exchange.js');
const { sellOnResponse } = require('./gestion/sell.js');
const toPresent = require('./gestion/topresent.js');
const { saveUser } = require('./save.js');
class user {
	constructor(id = '', tag = '', cash = 1000, walet = [], history = [], watingMp = '', isRestore = false) {
		this.id = id;
		this.tag = tag;
		this.cash = cash;
		this.walet = walet;
		this.history = history;
		this.watingMp = watingMp;
		if (!isRestore) { saveUser(this); }
	}

	async toPresent(CoinGecko, channel, dateStart) {
		toPresent(CoinGecko, channel, this, dateStart);
	}

	async buy(CoinGecko, channel, name, quantity, price, taxe, bank) {
		if (quantity <= 0 || price <= 0) {
			channel.send('abuse ! je vais meme pas expliquer');
		}
		if (this.cash < quantity * price) {
			channel.send('vous n\'avez pas ' + quantity * price + '$');
			return false;
		} else {
			this.cash -= quantity * price - taxe;
			bank.add(taxe);

			const index = this.search(this.walet, name);
			if (index != -1) {
				this.walet[index][1] = Number(this.walet[index][1]) + Number(quantity);
			} else {
				this.walet.push([name, quantity]);
			}
			this.history.push([new Date(), JSON.parse(JSON.stringify(this)).walet]);
			this.toPresent(CoinGecko, channel, new Date());
			saveUser(this);
			return true;
		}
	}

	async sell(CoinGecko, channel, name, quantity) {
		const index = this.search(this.walet, name);
		const price = await CoinGecko.add(['priceUsd', name]);
		const total = quantity * price;
		if (Number(this.walet[index][1]) < quantity) {
			channel.send('vous n\'avez pas ' + quantity + ' ' + name);
			return false;
		} else {
			this.cash += total;

			if (index == -1) {
				log('error in remove money');
				return false;
			}
			this.walet[index][1] = Number(Number(this.walet[index][1])) - Number(quantity);
			this.history.push([new Date(), JSON.parse(JSON.stringify(this)).walet]);
			this.toPresent(CoinGecko, channel, new Date());
			saveUser(this);
			return true;

		}
	}
	async change(devise, target, number, rate, spread, channel, coingecko, bank) {
		number = Number(number);
		// rate = rate to change devise in target
		let index = this.search(this.walet, devise);
		if (this.walet[index][1] < number) {
			channel.send('vous n\'avez pas ' + number + ' ' + devise);
			return;
		}
		this.walet[index][1] = Number(this.walet[index][1]) - number;
		index = this.search(this.walet, target);
		const priceFinaly = (number * rate) - (spread * rate);
		if (index != -1) {
			this.walet[index][1] = Number(this.walet[index][1]) + priceFinaly;
		} else {
			this.walet.push([target, priceFinaly]);
		}
		bank.add(spread * number);
		saveUser(this);
		toPresent(coingecko, channel, this, new Date);
	}
	async responseMp(response, channel, coingecko, bank) {
		if (this.watingMp.startsWith('priceFor_')) {
			this.watingMp.replace('priceFor_', '');
			buyOnResponse(response, this.watingMp, channel, coingecko, bank.taxes);
			this.watingMp = '';
		} else if (this.watingMp.startsWith('sellNumber_')) {
			this.watingMp = this.watingMp.replace('sellNumber_', '');
			sellOnResponse(response, this.watingMp, channel, coingecko);
			this.watingMp = '';
		} else if (this.watingMp.startsWith('exchange_')) {
			const array = this.watingMp.split('_');
			exchangeResponseMP(array[1], array[2], array[3], channel, response, coingecko);
			this.watingMp = '';

		}
		saveUser(this);
	}
	search(array, comparing) {
		let result = -1;
		for (let i = 0, len = array.length; i < len; i++) {
			if (array[i][0] === comparing) {
				result = i;
				break;
			}
		}
		return result;
	}
}
module.exports = user;

/*
JSON.parse(JSON.stringify(this)).walet
permet de copier l'object this sinon il fait des pointeur */