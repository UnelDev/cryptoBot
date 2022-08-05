async function nameToId(name, client) {
	const nameListe = [];
	const coinList = await client.add(['coinList']);
	coinList.forEach(element => {
		if (element.name === name) {
			nameListe.push(element.id);
		}
	});
	return nameListe;
}
module.exports = nameToId;