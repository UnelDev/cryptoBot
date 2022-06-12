const NcoingeckoApi = require('../../../nCoingeko-api/coingecko-api.js');
async function idToSymbol(id) {
	const nameListe = [];
	const client = new NcoingeckoApi();
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.id === id) {
			nameListe.push(element.symbol);
		}
	});
	return nameListe;
}
module.exports = idToSymbol;