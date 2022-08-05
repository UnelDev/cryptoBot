/*
hi i am getting the same error!
did you find a solution?
here is my error:
undefined:1
error code: 1015
^

SyntaxError: Unexpected token e in JSON at position 0

for the moment the blocking requests is: fetchMarketChartRange
but  client.simple.price is functional

*/
const CoinGecko = require('coingecko-api');
const logs = require('../tools/log.js');

class NcoingeckoApi {
	// classe permetant de faire un plusieur appel à l'API CoinGecko sans dépasser le nombre de requête autorisé par l'API (1 a la fois)
	//  /!\ coingecko api is limit to 50 query per seconde
	constructor() {
		this.runer = [];
		this.cache = [];

	}
	async add(args) {
		logs('coinggecko request: ' + args, 'coinGeckoLog');
		try {
			if (args[0] === 'coinList') {
				let test;
				try {
					this.runer.push(this.coinList(this.runer.length - 1));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}

				return test;
			} else if (args[0] === 'priceUsd') {
				let test;
				try {
					this.runer.push(this.getPriceUsd(args[1], this.runer.length - 1));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				return test;
			} else if ((args[0] === 'priceUsd -f')) {
				let test;
				try {
					this.runer.push(this.getPriceUsdForce(args[1], this.runer.length - 1));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				return test;
			} else if (args[0] === 'fetchMarketChart') {
				let test;
				try {
					this.runer.push(this.getMarketChart(args[1], this.runer.length - 1));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				return test;
			} else if (args[0] === 'search') {
				let test;
				try {
					this.runer.push(this.search(args[1], this.runer.length - 1));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				return test;
			} else if (args[0] === 'info') {
				let test;
				try {
					this.runer.push(this.info(args[1], this.runer.length - 1));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				return test;
			} else if (args[0] === 'fetchMarketChartRange') {
				let test;
				try {
					this.runer.push(this.fetchMarketChartRange(args[1], args[2], this.runer.length - 1));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(3000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				if (test[0] == 'error in coin coingecko:fetchMarketChartRangeAxiosError: Request failed with status code 429') {
					await delay(3000).then(async () => test = await this.add(args));
				}
				return test;
			} else if (args[0] === 'ping') {
				let test;
				try {
					this.runer.push(this.ping(this.runer.length - 1, new Date()));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				return test;
			} else if (args[0] === 'exchangesTickers') {
				let test;
				try {
					this.runer.push(this.exchangesTickers(this.runer.length, args[1], args[2]));
					test = await this.runer[this.runer.length - 1];
				} catch (error) {
					if (error.code == 1015 || error.code == 429) {
						// tow many request we send a new request a few moment later
						await delay(1000).then(async () => test = await this.add(args));
						// to do: send message for client
					} else {
						logs('ERROR In CoinGecko-api :' + error + ' the arg: ' + args);
					}
				}
				return test;
			} else {
				return 'error in args[0]';
			}
		} catch (error) {
			if (error.code == 1015 || error.code == 429) {
				// tow many request we send a new request a few moment later
				await delay(1000).then(() => this.add(args));
			} else {
				// if all try catch is unfunctional
				logs('ERROR In CoinGecko-api (error ???) :' + error + ' the arg: ' + args);
			}
		}
	}
	async coinList(index) {
		const key = 'coinList';
		if (typeof this.cache[key] != 'undefined' && this.cache[key]['date'] != 'undefined' && new Date().getTime() - this.cache[key]['date'].getTime() <= 60000) {
			return this.cache[key]['data'];
		} else {
			try {
				await this.runer[index - 1];
				const CoinGeckoClient = new CoinGecko();
				const data = await CoinGeckoClient.coins.list();
				this.cache[key] = [];
				this.cache[key]['date'] = new Date();
				this.cache[key]['data'] = data.data;
				return data.data;
			} catch (error) {
				logs(error);
				throw error;
			}
		}
	}
	async getPriceUsd(devise, index) {
		// creation de la clef devise pour le cache temps d'expiration 1 minute
		const key = 'priceEur_' + devise;
		if (typeof this.cache[key] != 'undefined' && this.cache[key]['date'] != 'undefined' && new Date().getTime() - this.cache[key]['date'].getTime() <= 60000) {
			return this.cache[key]['data'];
		} else {
			await this.runer[index - 1];
			const client = new CoinGecko();
			const price = await client.simple.price({
				ids: [devise],
				vs_currencies: ['usd']
			});
			this.cache[key] = [];
			this.cache[key]['date'] = new Date();
			this.cache[key]['data'] = price.data[devise].usd;
			return price.data[devise].usd;
		}
	}
	async getPriceUsdForce(devise, index) {
		// creation de la clef devise pour le cache temps d'expiration 1 seconde
		const key = 'priceEur_' + devise;
		if (typeof this.cache[key] != 'undefined' && this.cache[key]['date'] != 'undefined' && new Date().getTime() - this.cache[key]['date'].getTime() <= 500) {
			return this.cache[key]['data'];
		} else {
			await this.runer[index - 1];
			const client = new CoinGecko();
			const price = await client.simple.price({
				ids: [devise],
				vs_currencies: ['usd']
			});
			this.cache[key] = [];
			this.cache[key]['date'] = new Date();
			this.cache[key]['data'] = price.data[devise].usd;
			return price.data[devise].usd;
		}
	}
	async getMarketChart(devise, index) {
		// creation de la clef devise pour le cache temps d'expiration 4 heures
		const key = 'fetchMarketChart_' + devise;
		if (typeof this.cache[key] != 'undefined' && this.cache[key]['date'] != 'undefined' && new Date().getTime() - this.cache[key]['date'].getTime() <= 60000) {
			return this.cache[key]['data'];
		} else {
			await this.runer[index - 1];
			const client = new CoinGecko();
			const data = await client.coins.fetchMarketChart(devise);
			this.cache[key] = [];
			this.cache[key]['date'] = new Date();
			this.cache[key]['data'] = data.data.prices;
			return data.data.prices;
		}
	}
	async fetchMarketChartRange(devise, range, index) {
		// this comment isn't functional for ??? https://github.com/miscavage/CoinGecko-API/issues/38
		// no cache because date change everytime
		// await this.runer[index - 1];
		// const client = new CoinGecko();
		// const data = await client.coins.fetchMarketChartRange(devise, {
		// 	from: range[0],
		// 	to: range[1]
		// });

		await this.runer[index - 1];
		const axios = require('axios');
		let res = [];
		await axios.get('https://api.coingecko.com/api/v3/coins/' + devise + '/market_chart/range?vs_currency=usd&from=' + range[0] + '&to=' + range[1], {
			headers: {
				Accept: 'accept',
				Authorization: 'authorize'
			}
		}).then(response => {
			res = response.data.prices;
		}).catch(err => {
			logs('error in coin coingecko:fetchMarketChartRange' + err);
			res = ['error in coin coingecko:fetchMarketChartRange' + err];
		});
		return res;

	}
	async search(find, index) {
		await this.runer[index - 1];
		const axios = require('axios');
		let res = [];
		await axios.get('https://api.coingecko.com/api/v3/search?query=' + find, {
			headers: {
				Accept: 'accept',
				Authorization: 'authorize'
			}
		}).then(response => {
			res = response.data.coins;
		}).catch(err => {
			logs('error in coin coingecko:search' + err);
			res = ['error in coin coingecko:search' + err];
		});
		return res;
	}

	async info(devise, index) {
		await this.runer[index - 1];
		const axios = require('axios');
		let res = [];
		await axios.get('https://api.coingecko.com/api/v3/coins/' + devise, {
			headers: {
				Accept: 'accept',
				Authorization: 'authorize'
			}
		}).then(response => {
			res = response.data;
		}).catch(err => {
			logs('error in coin coingecko:info' + err);
			res = ['error in coin coingecko:info ' + err];
		});
		return res;
	}

	async ping(index, date) {
		await this.runer[index - 1];
		const client = new CoinGecko();
		await client.ping();
		return (new Date() - date);
	}

	async exchangesTickers(index, coinId, echangeId) {
		await this.runer[index - 1];
		const axios = require('axios');
		let res = [];
		await axios.get('https://api.coingecko.com/api/v3/exchanges/' + echangeId + '/tickers?coin_ids=' + coinId, {
			headers: {
				Accept: 'accept',
				Authorization: 'authorize'
			}
		}).then(response => {
			res = response.data;
		}).catch(err => {
			logs('error in coin coingecko:exchangesTickers' + err);
			res = ['error ' + err];
		});
		return res;
	}
}

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}
module.exports = NcoingeckoApi;