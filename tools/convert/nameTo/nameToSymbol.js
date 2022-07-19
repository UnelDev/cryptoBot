async function nameToSymbol(name, client) {
	const nameListe = [];
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.name === name) {
			nameListe.push(element.symbol);
		}
	});
	return nameListe;
}
module.exports = nameToSymbol;