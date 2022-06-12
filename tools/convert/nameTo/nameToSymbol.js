const NcoingeckoApi = require('../../../nCoingeko-api/coingecko-api.js');
async function nameToSymbol(name) {
	const nameListe = [];
	const client = new NcoingeckoApi();
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.name === name) {
			nameListe.push(element.symbol);
		}
	});
	return nameListe;
}
module.exports = nameToSymbol;