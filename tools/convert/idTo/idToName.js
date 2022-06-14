async function idToName(id, client) {
	const nameListe = [];
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.id === id) {
			nameListe.push(element.name);
		}
	});
	return nameListe;
}
module.exports = idToName;