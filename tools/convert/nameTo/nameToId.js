const NcoingeckoApi = require('../../../nCoingeko-api/coingecko-api.js');
async function nameToId(name) {
	const nameListe = [];
	const client = new NcoingeckoApi();
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.name === name) {
			nameListe.push(element.id);
		}
	});
	return nameListe;
}
module.exports = nameToId;