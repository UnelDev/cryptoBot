const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');
const path = require('path');
const log = require('../tools/log.js');
function anotherTime(devise, nBDay, coingecko) {
	// the function for generate chart for many timelaps
	return run(nBDay, coingecko, devise);

}
async function create(nBDay, coingecko, devise) {
	// Date.now make data whith precis on ms but coingecko api is precis on seconde
	let firstTime = (Date.now() / 1000) - (nBDay * 86400);
	firstTime = Math.floor(firstTime);
	let lastTime = (Date.now()) / 1000;
	lastTime = Math.floor(lastTime);

	const market = await coingecko.add(['fetchMarketChartRange', devise, [firstTime, lastTime]]);
	const name = [];
	const value = [];
	let minDraw = Infinity;
	let ath = -Infinity;
	let atl = Infinity;
	for (let i = 0; i < market.length; i++) {
		if (nBDay <= 1) {
			const hours = new Date(market[i][0]).getHours();
			const seconde = new Date(market[i][0]).getSeconds();
			name.push(hours + ':' + seconde);
		} else {
			const month = new Date(market[i][0]).getMonth();
			const date = new Date(market[i][0]).getDate();
			name.push(date + ':' + month);
		}
		value.push(market[i][1]);
		if (minDraw > market[i][1]) {
			minDraw = market[i][1];
		}
		if (market[i][1] > ath) {
			ath = market[i][1];
		}
	}
	atl = minDraw;
	const configuration = {
		type: 'bar',
		data: {
			labels: name,
			datasets: [{
				label: devise,
				data: value,
				fill: false,
				backgroundColor: ['rgba(54, 162, 235, 0.2)'],
				borderColor: ['rgb(54, 162, 235, 1)'],
				borderWidth: 5,
				// define top or bottom axis ,modifies on scale
				xAxisID: 'xAxis1'
			}]

		},
		options: {
			scales: {
				y: {
					min: Math.floor(minDraw - (1 / 100 * minDraw))
				}
			}
		}
	};
	return [ath, atl, configuration];
}
async function run(nBDay, coingecko, devise) {

	const width = 1161;
	const height = 500;
	const backgroundColour = 'white';
	const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });
	const img = await create(nBDay, coingecko, devise);
	const dataUrl = await chartJSNodeCanvas.renderToDataURL(img[2]);
	const base64Image = dataUrl;

	const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');

	const pathfile = path.resolve('./img/' + devise + '_' + nBDay + '.png');
	fs.writeFile(pathfile, base64Data, 'base64', err => {
		if (err) {
			log(err);
		}
	});
	return ([img[0], img[1], pathfile]);
}
module.exports = anotherTime;