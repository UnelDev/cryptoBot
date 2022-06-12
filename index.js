const marketPresentation = require('./tools/marketPresentation.js');
async function main() {
	const marketPresentationResult = await marketPresentation();
	Promise.all(marketPresentationResult[1]).then((value) => {
		for (let i = 0; i < marketPresentationResult[0].length; i++) {
			console.log(marketPresentationResult[0][i] + ': ' + value[i].toFixed(2) + '€');
		}
	});
}

main();
