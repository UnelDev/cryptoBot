const logs = require('../../tools/log.js');
const { onResponsePriceStopSell, onResponsePriceLimitSell } = require('../bank/limitSell.js');
const { buyOnResponse } = require('./gestion/buy.js');
const { exchangeResponseMP } = require('./gestion/exchange.js');
const { sellOnResponse } = require('./gestion/sell.js');
const toPresent = require('./gestion/topresent.js');
const { saveUser } = require('./save.js');
class user {
	constructor(id = '', tag = '', cash = 1000, walet = [], history = [], watingMp = '', sellStop = [], limitSell = [], isRestore = false) {
		this.id = id;
		this.tag = tag;
		this.cash = cash;
		this.walet = walet;
		this.history = history;
		this.watingMp = watingMp;
		this.sellStop = sellStop;
		this.limitSell = limitSell;
		if (!isRestore) { saveUser(this); }
	}

	toPresent(CoinGecko, channel, dateStart) {
		toPresent(CoinGecko, channel, this, dateStart);
	}

	async buy(CoinGecko, channel, name, quantity, price, taxe, bank) {
		if (this.cash < price * quantity) {
			channel.send('vous n\'avez pas ' + price + '$');
			return false;
		} else {
			this.cash -= price * quantity;
			bank.add(taxe);

			const index = this.search(this.walet, name);
			if (index != -1) {
				this.walet[index][1] = Number(this.walet[index][1]) + Number(Math.round(quantity * 1000) / 1000);
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
				logs('error in remove money');
				return false;
			}
			this.walet[index][1] = Number(Number(this.walet[index][1])) - Number(Math.round(quantity * 1000) / 1000);
			this.history.push([new Date(), JSON.parse(JSON.stringify(this)).walet]);
			this.toPresent(CoinGecko, channel, new Date());
			saveUser(this);
			return true;

		}
	}

	async sellAll(name, CoinGecko, clientDiscord) {
		const index = this.search(this.walet, name);
		if (index == -1) {
			this.sendMP('vous avez configurer un limitSell sur le ' + name + ' il s\'est activier mais vous n\'avis actuellement pas de ' + name, clientDiscord);
			return;
		}
		const price = await CoinGecko.add(['priceUsd', name]);
		const total = this.walet[index][1] * price;
		this.cash += total;
		this.walet[index][1] = 0;
		this.history.push([new Date(), JSON.parse(JSON.stringify(this)).walet]);
		this.sendMP('un limitSell s\'est activée: ' + name + ' tout vos ' + name + ' on donc été vendu', clientDiscord);
		try {
			await toPresent(CoinGecko, clientDiscord.users.cache.get(this.id), this, new Date);
			logs('sending toPresent to ' + user.tag);
		} catch (error) {
			logs('faling (cache error) sending toPresent to ' + user.tag);
		}
		const forDelet = this.search(this.limitSell, name);
		if (forDelet == -1) {
			this.sendMP('error in deletion in sellAll');
		}
		const test = this.limitSell.slice(forDelet, 1);
		this.limitSell = this.limitSell.filter(value => {
			if (value != test[0]) {
				return value;
			}
		});
		await saveUser(this);
	}

	async sendMP(message, clientDiscord) {
		try {
			clientDiscord.users.cache.get(this.id).send(message);
			logs('sending mP to ' + user.tag + ' ' + message);
		} catch (error) {
			logs('faling (cache error) sending mP to ' + user.tag + ' ' + message);
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

	async responseMp(response, channel, coingecko) {
		if (this.watingMp.startsWith('priceFor_')) {
			this.watingMp.replace('priceFor_', '');
			buyOnResponse(response, this.watingMp, channel, coingecko);
			this.watingMp = '';
		} else if (this.watingMp.startsWith('sellNumber_')) {
			this.watingMp = this.watingMp.replace('sellNumber_', '');
			sellOnResponse(response, this.watingMp, channel, coingecko);
			this.watingMp = '';
		} else if (this.watingMp.startsWith('exchange_')) {
			const array = this.watingMp.split('_');
			exchangeResponseMP(array[1], array[2], array[3], channel, response, coingecko);
			this.watingMp = '';
		} else if (this.watingMp.startsWith('stopSell_')) {
			this.watingMp = this.watingMp.replace('stopSell_', '');
			onResponsePriceStopSell(this.watingMp, response, this, channel);
		} else if (this.watingMp.startsWith('limitSell_')) {
			this.watingMp = this.watingMp.replace('limitSell_', '');
			onResponsePriceLimitSell(this.watingMp, response, this, channel);
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