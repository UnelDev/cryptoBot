const NcoingeckoApi = require('../nCoingeko-api/coingecko-api.js');
async function marketPresentation(kingOfMarket = ['bitcoin', 'ethereum', 'binancecoin', 'ishares-msci-world-etf-tokenized-stock-defichain']) {
	const client = new NcoingeckoApi();
	const market = new Array();
	kingOfMarket.forEach(async element => {
		market.push(client.add(['priceEur', element]));
	});
	return [kingOfMarket, market];
}
module.exports = marketPresentation;