async function limitSell(coingecko, userListe, clientDiscord) {
	const listDeviseWatch = [];
	const listDevisePrice = new Map();
	let sleep = userListe.map(user => {
		if (user.limitSell != []) {
			user.limitSell.forEach(element => {
				listDeviseWatch.push(element[0]);
			});
		}
	});
	await Promise.all(sleep);
	sleep = listDeviseWatch.map(async Element => {
		listDevisePrice.set(Element, await coingecko.add(['priceUsd -f', Element]));
	});
	await Promise.all(sleep);
	console.log(listDeviseWatch);
	console.log(listDevisePrice);
	sleep = userListe.map(user => {
		if (user.limitSell != []) {
			user.limitSell.forEach(element => {
				if (listDevisePrice.get(element[0]) <= element[1]) {
					sell(element[0], user, coingecko, clientDiscord);
				}
			});
		}
	});
}

function sell(name, user, coingecko, clientDiscord) {
	user.sellAll(name, coingecko, clientDiscord);
}

module.exports = limitSell;