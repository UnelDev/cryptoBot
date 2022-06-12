const NcoingeckoApi = require('../../../nCoingeko-api/coingecko-api.js');
async function symbolToName(symbol) {
	const nameListe = [];
	const client = new NcoingeckoApi();
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.symbol === symbol) {
			nameListe.push(element.name);
		}
	});
	return nameListe;
}
module.exports = symbolToName;