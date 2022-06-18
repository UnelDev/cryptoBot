const marketPresentation = require('./tools/marketPresentation.js');
const symbolToName = require('./tools/convert/symbolTo/symbolToName.js');
const symbolToId = require('./tools/convert/symbolTo/symbolToId.js');
const idToName = require('./tools/convert/IdTo/idToName.js');
const idToSymbol = require('./tools/convert/IdTo/idToSymbol.js');
const nameToId = require('./tools/convert/nameTo/nameToId.js');
const nameToSymbol = require('./tools/convert/nameTo/nameToSymbol.js');
const NcoingeckoApi = require('./nCoingeko-api/coingecko-api.js');
const draw = require('./tools/drawChart');
const search = require('./tools/search');

const CoinGecko = require('coingecko-api');
const client = new NcoingeckoApi();
async function main() {
	// {
	// 	const marketPresentationResult = await marketPresentation();
	// 	Promise.all(marketPresentationResult[1]).then((value) => {
	// 		for (let i = 0; i < marketPresentationResult[0].length; i++) {
	// 			console.log(marketPresentationResult[0][i] + ': ' + value[i].toFixed(2) + '€');
	// 		}
	// 	});
	// }

	// const symbolName = await symbolToName('bnb', client);
	// const symbolId = await symbolToId('bnb', client);
	// console.log('bnb is associated to : ');
	// for (let i = 0; i < symbolName.length; i++) {
	// 	console.log('	name ' + symbolName[i] + ' => with id ' + symbolId[i]);
	// }

	// const idName = await idToName('01coin', client);
	// const idSymbol = await idToSymbol('01coin', client);
	// console.log('01coin is associated to : ');
	// for (let i = 0; i < idName.length; i++) {
	// 	console.log('	name ' + idName[i] + ' => with symbol ' + idSymbol[i]);
	// }

	// const nameId = await nameToId('0.5X Long Dogecoin', client);
	// const nameSymbol = await nameToSymbol('0.5X Long Dogecoin', client);
	// console.log('0.5X Long Dogecoin is associated to : ');
	// for (let i = 0; i < nameId.length; i++, client) {
	// 	console.log('	id ' + nameId[i] + ' => with symbol ' + nameSymbol[i]);
	// }

	// await draw('ethereum', client);

	const result = await search('bi', client);
	for (let i = 0; i < result.length; i++) {
		const Element = result[i];
		console.log('the ' + i + ' result is : ' + Element.name);
	}
}

main();
