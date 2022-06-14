async function symbolToId(symbol, client) {
	const nameListe = [];
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.symbol === symbol) {
			nameListe.push(element.id);
		}
	});
	return nameListe;
}
module.exports = symbolToId;