const CoinGecko = require('coingecko-api');

class NcoingeckoApi {
	// classe permetant de faire un plusieur appel à l'API CoinGecko sans dépasser le nombre de requête autorisé par l'API (1 a la fois)
	constructor() {
		this.runer = [];
		this.coinListcach = [[], new Date('1970-01-01')];
	}
	async add(args) {
		if (args[0] === 'coinList') {
			// diferant to 10 minutes in milliseconds
			if (typeof this.coinListcach[1] != 'undefined' && new Date().getTime() - this.coinListcach[1].getTime() <= 600000) {
				return this.coinListcach[0];
			} else {
				const CoinGeckoClient = new CoinGecko();
				const data = await CoinGeckoClient.coins.list();
				this.coinListcach = [data.data, new Date()];
				return data.data;
			}
		} else if (args[0] === 'priceEur') {
			this.runer.push(this.getPriceEur(args[1], this.runer.length - 1));
			const test = await this.runer[this.runer.length - 1];
			return test;
		} else {
			return 'error in args[0]';
		}
	}

	async getPriceEur(devise, index) {
		// fonction asycrone pour récupérer le prix de la devise en euro
		// devise = devise.toLowerCase();
		await this.runer[index - 1];
		const client = new CoinGecko();
		const price = await client.simple.price({
			ids: [devise],
			vs_currencies: ['eur']
		});
		return price.data[devise].eur;

	}
}
module.exports = NcoingeckoApi;
/*
[
['price,[arg1,arg2,arg3],promise response]
['price,[arg1,arg2,arg3],promise response]
]
*/