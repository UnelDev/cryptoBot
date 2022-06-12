const marketPresentation = require('./tools/marketPresentation.js');
async function main() {
	Promise.all(await marketPresentation()).then((value) => {
		console.log(value);
	});
}

main();
