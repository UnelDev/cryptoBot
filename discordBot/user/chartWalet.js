const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const path = require('path');
const fs = require('fs');
const log = require('../../tools/log.js');
async function chartWalet(user, coingecko) {
	// create chart to last transaction
	const LastHistory = JSON.parse(JSON.stringify(user.history[user.history.length - 1]));
	// LastHistory = ["2022-07-05T13:53:33.113Z",[["monero",1.7],["tezos","104"]]],["2022-07-05T13:54:20.400Z",[["monero",1.8],["tezos","104.1"]]]]
	const timeStart = Date.parse(LastHistory.shift());
	// LastHistory = [["monero",1.7],["tezos","104"]]],["2022-07-05T13:54:20.400Z",[["monero",1.8],["tezos","104.1"]]]
	const devise = [];
	LastHistory[0].forEach(element => {
		devise.push(element[0]);
	});

	// devise  = [ 'monero', 'tezos' ]
	return (await run(timeStart, coingecko, LastHistory[0]));
}

async function create(timeStart, coingecko, devise) {
	// Date.now make data whith precis on ms but coingecko api is precis on seconde
	let firstTime = timeStart / 1000;
	firstTime = Math.floor(firstTime);
	let lastTime = (Date.now()) / 1000;
	lastTime = Math.floor(lastTime);

	const listOfMarket = [];
	let sleep = devise.map(async element => {
		const allPrices = await coingecko.add(['fetchMarketChartRange', element[0], [firstTime, lastTime]]);
		for (let i = 0; i < allPrices.length; i++) {
			allPrices[i][1] *= Number(element[1]);
		}
		listOfMarket.push(allPrices);
	});
	await Promise.all(sleep);
	// listOfMarket = [time,price],[ 1654513322653, 194.52588451732944 ]
	const listOfPrice = [];
	for (let i = 0; i < listOfMarket[0].length; i++) {
		listOfPrice[i] = [new Date(listOfMarket[0][i][0]), 0];
		sleep = listOfMarket.map(element => {
			if (typeof element[i] != 'undefined') {
				listOfPrice[i][1] += element[i][1];
			} else {
				listOfPrice.slice(i, 1);
			}
		});
		await Promise.all(sleep);
	}
	const date = [];
	const value = [];
	for (let i = 0; i < listOfPrice.length; i++) {
		date.push(listOfPrice[i][0].getDate() + ':' + (listOfPrice[i][0].getMonth() + 1));
		value.push(listOfPrice[i][1]);

	}

	let minDraw = Infinity;
	sleep = listOfPrice.map(element => {
		if (minDraw > element[1]) {
			minDraw = element[1];
		}
	});
	await Promise.all(sleep);

	const configuration = {
		type: 'bar',
		data: {
			labels: date,
			datasets: [{
				data: value,
				label: 'total',
				borderColor: 'rgb(60,186,159)',
				backgroundColor: 'rgb(60,186,159,0.1)',
				fill: false
			}]
		},
		options: {
			scales: {
				y: {
					min: Math.floor(minDraw - ((3 / 100) * minDraw))
				}
			}
		}
	};
	return configuration;
}
async function run(timeStart, coingecko, devise) {

	const width = 1161;
	const height = 500;
	const backgroundColour = 'white';
	const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour });
	const dataUrl = await chartJSNodeCanvas.renderToDataURL(await create(timeStart, coingecko, devise));
	const base64Image = dataUrl;

	const base64Data = base64Image.replace(/^data:image\/png;base64,/, '');

	const pathfile = path.resolve('./img/' + devise[0][0] + '_' + timeStart + '.png');
	fs.writeFile(pathfile, base64Data, 'base64', err => {
		if (err) {
			log(err);
		}
	});
	return (pathfile);
}
module.exports = chartWalet;