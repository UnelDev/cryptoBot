async function idToSymbol(id, client) {
	const nameListe = [];
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.id === id) {
			nameListe.push(element.symbol);
		}
	});
	return nameListe;
}
module.exports = idToSymbol;