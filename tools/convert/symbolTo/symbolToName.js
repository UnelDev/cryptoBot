async function symbolToName(symbol, client) {
	const nameListe = [];
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.symbol === symbol) {
			nameListe.push(element.name);
		}
	});
	return nameListe;
}
module.exports = symbolToName;