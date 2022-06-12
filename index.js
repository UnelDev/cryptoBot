const NcoingeckoApi = require('./coingecko-api.js');
async function main() {
	const client = new NcoingeckoApi([]);
	console.log('Bitcon to eur : ' + await client.add(['priceEur', 'bitcoin']));
	console.log('Ethereum to eur : ' + await client.add(['priceEur', 'ethereum']));
}

main();
