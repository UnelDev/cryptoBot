const CoinGecko = require('coingecko-api');

class NcoingeckoApi {
	// classe permetant de faire un plusieur appel à l'API CoinGecko sans dépasser le nombre de requête autorisé par l'API (1 a la fois)
	constructor() {
		this.runer = [];
		this.cache = [];

	}
	async add(args) {
		if (args[0] === 'coinList') {
			// diferant to 10 minutes in milliseconds
			const key = 'coinList';
			if (typeof this.cache[key] != 'undefined' && this.cache[key]['date'] != 'undefined' && new Date().getTime() - this.cache[key]['date'].getTime() <= 60000) {
				return this.cache[key]['data'];
			} else {
				const CoinGeckoClient = new CoinGecko();
				const data = await CoinGeckoClient.coins.list();
				this.cache['coinList'] = [];
				this.cache['coinList']['date'] = new Date();
				this.cache['coinList']['data'] = data.data;
				return data.data;
			}
		} else if (args[0] === 'priceUsd') {
			this.runer.push(this.getPriceUsd(args[1], this.runer.length - 1));
			const test = await this.runer[this.runer.length - 1];
			return test;
		} else if (args[0] === 'fetchMarketChart') {
			this.runer.push(this.getMarketChart(args[1], this.runer.length - 1));
			const test = await this.runer[this.runer.length - 1];
			return test;
		} else if (args[0] === 'search') {
			this.runer.push(this.search(args[1], this.runer.length - 1));
			const test = await this.runer[this.runer.length - 1];
			return test;
		} else if (args[0] === 'info') {
			this.runer.push(this.info(args[1], this.runer.length - 1));
			const test = await this.runer[this.runer.length - 1];
			return test;
		} else if (args[0] === 'fetchMarketChartRange') {
			this.runer.push(this.fetchMarketChartRange(args[1], args[2], this.runer.length - 1));
			const test = await this.runer[this.runer.length - 1];
			return test;
		} else if (args[0] === 'ping') {
			this.runer.push(this.ping(this.runer.length - 1, new Date()));
			const test = await this.runer[this.runer.length - 1];
			return test;
		} else {
			return 'error in args[0]';
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
	async getMarketChart(devise, index) {
		// creation de la clef devise pour le cache temps d'expiration 4 heures
		const key = 'fetchMarketChart_' + devise;
		if (typeof this.cache[key] != 'undefined' && this.cache[key]['date'] != 'undefined' && new Date().getTime() - this.cache[key]['date'].getTime() <= 14400000) {
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
		// no cache because date change everytime
		await this.runer[index - 1];
		const client = new CoinGecko();
		const data = await client.coins.fetchMarketChartRange(devise, {
			from: range[0],
			to: range[1]
		});
		return data.data.prices;

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
			res = ['error ' + err];
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
			res = ['error ' + err];
		});
		return res;
	}

	async ping(index, date) {
		await this.runer[index - 1];
		const client = new CoinGecko();
		await client.ping();
		return (new Date() - date);
	}
}
module.exports = NcoingeckoApi;
/*
[coinList: [value: [], date: Date]]
const key = 'fetchMarketChart_' + devise;
		if (typeof this.cache[key] != 'undefined' && this.cache[key]['date'] != 'undefined' && new Date().getTime() - this.cache[key]['date'].getTime() <= 14400000) {
			return this.cache[key]['data'];
		} else {
			const axios = require('axios');

			axios
				.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1')
				.then(res => {
					console.log(`statusCode: ${res.status}`);
					console.log(res.data.prices);
				})
				.catch(error => {
					console.error(error);
				});
*/