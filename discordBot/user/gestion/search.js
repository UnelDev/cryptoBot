function serach(userliste, id) {
	let exist = -1;
	for (let i = 0; i < userliste.length; i++) {
		if (userliste[i].id == id) {
			exist = userliste[i];
		}
	}
	return exist;
}
module.exports = serach;