const marketPresentation = require('./tools/marketPresentation.js');
const symbolToName = require('./tools/convert/symbolTo/symbolToName.js');
const symbolToId = require('./tools/convert/symbolTo/symbolToId.js');
const idToName = require('./tools/convert/IdTo/idToName.js');
async function main() {
	const marketPresentationResult = await marketPresentation();
	Promise.all(marketPresentationResult[1]).then((value) => {
		for (let i = 0; i < marketPresentationResult[0].length; i++) {
			console.log(marketPresentationResult[0][i] + ': ' + value[i].toFixed(2) + '€');
		}
	});
	const symbolName = await symbolToName('bnb');
	const symbolId = await symbolToId('bnb');
	console.log('bnb is associated to : ');
	for (let i = 0; i < symbolName.length; i++) {
		console.log('	' + symbolName[i] + ' => ' + symbolId[i]);
	}
	const idName = await idToName('01coin');
	console.log('01coin is associated to : ');
	for (let i = 0; i < idName.length; i++) {
		console.log('	' + idName[i]);
	}

}

main();
