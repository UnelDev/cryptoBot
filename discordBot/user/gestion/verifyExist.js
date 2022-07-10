function verifyExist(userliste, id) {
	let exist = false;
	userliste.forEach(element => {
		if (id == element.id) {
			exist = true;
		}
	});
	return exist;
}
module.exports = verifyExist;