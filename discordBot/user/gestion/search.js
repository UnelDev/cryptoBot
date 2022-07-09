function serachid(userListe, id) {
	let exist = -1;
	for (let i = 0; i < userListe.length; i++) {
		if (userListe[i].id == id) {
			exist = userListe[i];
		}
	}
	return exist;
}
function searchIndexToId(userListe, id) {
	let exist = -1;
	for (let i = 0; i < userListe.length; i++) {
		if (userListe[i].id == id) {
			exist = i;
		}
	}
	return exist;
}
function serachTag(userListe, tag) {
	let exist = -1;
	for (let i = 0; i < userListe.length; i++) {
		if (userListe[i].tag == tag) {
			exist = i;
		}
	}
	return exist;
}
module.exports = { serachid, serachTag, searchIndexToId };