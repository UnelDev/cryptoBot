async function symbolToId(devise, client) {
	const market = await client.add(['fetchMarketChart', devise]);
	const name = [];
	const value = [];
	market.forEach(element => {
		element[0] = new Date(element[0]).getHours() + ':' + new Date(element[0]).getMinutes();
		name.push(element[0]);
		value.push(element[1]);
	});
	// chartjs is limited to 250 names and 250 values
	while (name.length > 250) {
		name.shift();
		// value.shift();
	}

	const fs = require('fs');
	const ChartJsImage = require('chartjs-to-image');
	const chart = new ChartJsImage();

	chart.setConfig({
		type: 'bar',
		data: {
			labels: name,
			datasets: [
				{
					label: devise,
					data: value
				}
			]
		},
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							callback: (val) => {
								return val + '$';
							}
						}
					}
				]
			}
		}
	});
	chart.setWidth(1161);
	chart.setHeight(500);
	if (value[value.length - 1] < value[value.length - 2]) {
		// chart.setBackgroundColor('#0febc2');
		chart.setBackgroundColor('#dfffeb');
	} else if (value[value.length - 1] > value[value.length - 2]) {
		chart.setBackgroundColor('#f8c9c3');
	}
	const buf = await chart.toBinary();
	fs.writeFileSync('chart.png', buf);
	return true;
}
module.exports = symbolToId;