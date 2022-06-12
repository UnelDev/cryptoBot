const NcoingeckoApi = require('../nCoingeko-api/coingecko-api.js');
async function marketPresentation(kingOfMarket = ['bitcoin', 'ethereum', 'tether', 'cardano']) {
	const client = new NcoingeckoApi();
	const market = new Array();
	kingOfMarket.forEach(async element => {
		market.push(client.add(['priceEur', element]));
	});
	return market;
}
module.exports = marketPresentation;