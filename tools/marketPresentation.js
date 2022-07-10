async function marketPresentation(kingOfMarket = ['bitcoin', 'ethereum', 'binancecoin', 'ishares-msci-world-etf-tokenized-stock-defichain'], client) {
	const market = new Array();
	kingOfMarket.forEach(async element => {
		market.push(client.add(['priceUsd', element]));
	});
	return [kingOfMarket, market];

}
module.exports = marketPresentation;