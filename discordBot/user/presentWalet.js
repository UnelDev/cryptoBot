const fs = require('fs');
const ChartJsImage = require('chartjs-to-image');
const log = require('./tools/log.js');
async function presnentWalet(client) {
	const date = [];
	// const dataset = [["bitcoin",[1,2,3,1],["etherum",[1,2,3,1]];
	const dataset = [];
	const NameList = [];
	for (let i = client.history.length - 1; i >= 0; i--) {
		const construcName = [];
		for (let j = 0; j < client.history[i][1].length; j++) {
			if (NameList.indexOf(client.history[i][1][j][0]) == -1) {
				NameList.push(client.history[i][1][j][0]);
			}
			construcName.push(client.history[i][1][j][0]);
		}
		NameList.forEach(element => {
			if (construcName.indexOf(element) == -1) {
				client.history[i][1].push([element, 0]);
			}
		});

	}

	for (let i = 0; i < client.history.length; i++) {
		try {
			date.push(client.history[i][0].getHours() + ':' + client.history[i][0].getMinutes());
			for (let y = 0; y < client.history[i][1].length; y++) {
				const index = search(dataset, client.history[i][1][y][0]);
				if (index == -1) {
					// dataset = [["bitcoin", [10]];
					dataset.push([client.history[i][1][y][0], [client.history[i][1][y][1]]]);
				} else {
					dataset[index][1].push(client.history[i][1][y][1]);
				}
			}
		} catch (error) {
			log('error in present Walet i =' + i + 'client.history = ' + client.history);
		}

	}

	const chart = new ChartJsImage();
	chart.setConfig({
		type: 'bar',
		data: {
			labels: date,
			datasets: constructConfig(dataset)
		}
	});
	chart.setWidth(1161);
	chart.setHeight(500);
	const buf = await chart.toBinary();
	fs.writeFileSync('./img/' + client.tag + '.png', buf);
	return ('./img/' + client.tag + '.png');
}

function constructConfig(dataset) {
	const set = [];
	for (let i = 0; i < dataset.length; i++) {
		const data = {
			label: dataset[i][0],
			data: dataset[i][1]
		};
		set.push(data);

	}
	return set;
}

function search(array, comparing) {
	let result = -1;
	for (let i = 0, len = array.length; i < len; i++) {
		if (array[i][0] === comparing) {
			result = i;
			break;
		}
	}
	return result;
}
module.exports = presnentWalet;