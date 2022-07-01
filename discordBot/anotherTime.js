const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');
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
	}

	const configuration = {
		type: 'bar',
		data: {
			labels: name,
			datasets: [{
				label: 'bitcoin',
				data: value,
				fill: false,
				backgroundColor: ['rgba(54, 162, 235, 0.2)'],
				borderColor: ['rgb(54, 162, 235, 1)'],
				borderWidth: 1,
				// define top or bottom axis ,modifies on scale
				xAxisID: 'xAxis1'
			}]

		},
		options: {
			scales: {
				y: {
					min: Math.floor(minDraw - (2 / 100 * minDraw))
				}
			}
		}
	};
	return configuration;
}
async function run(nBDay, coingecko, devise) {

	const width = 1161;
	const height = 500;
	const backgroundColour = 'white';
	const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });
	const dataUrl = await chartJSNodeCanvas.renderToDataURL(await create(nBDay, coingecko, devise));
	const base64Image = dataUrl;

	const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');


	fs.writeFile('./img/' + devise + '_' + nBDay + '.png', base64Data, 'base64', err => {
		if (err) {
			console.log(err);
		}
	});
	return ('./img/' + devise + '_' + nBDay + '.png');
}
module.exports = anotherTime;