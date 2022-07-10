const fs = require('fs');
const path = require('path');
const log = require('../../tools/log');
async function saveUser(SaveUser) {
	let str;
	try {
		str = JSON.stringify(SaveUser);
	} catch (error) {
		log('save user ' + SaveUser.tag + 'is imposible because ' + error);
	}


	const filePath = path.resolve('./discordBot/user/save/' + SaveUser.id + '.json');
	if (typeof filePath == 'undefined') {
		log('saveUser -> name is undefine');
		return;
	}
	fs.writeFile(filePath, str, err => {
		if (err) {
			if (err.code == 'EPERM') {
				log('saveUser -> Unsufficient permissions');
			} else {
				log('saveUser -> Impossible to create this file ' + err);
			}
			return;
		}
	});
	const listUser = listId();
	if (listUser.indexOf(SaveUser.id) === -1) {
		const logger = fs.createWriteStream('./discordBot/user/save/index.json', {
			flags: 'a'
		});
		logger.write(SaveUser.id + '-_-');
	}
}

function listId() {
	let index = fs.readFileSync('./discordBot/user/save/index.json',
		{ encoding: 'utf8', flag: 'r' });
	index = index.split('-_-');
	index.pop();
	return index;
}

function restore() {
	const user = require('./user');
	const lisId = listId();
	const userListe = [];
	lisId.forEach(element => {
		const data = fs.readFileSync('./discordBot/user/save/' + element + '.json',
			{ encoding: 'utf8', flag: 'r' });
		const tempUser = JSON.parse(data);
		const Nuser = new user(tempUser.id, tempUser.tag, tempUser.cash, tempUser.walet, tempUser.history, tempUser.watinMp, true);
		userListe.push(Nuser);
	});
	return userListe;

}
module.exports = { saveUser, restore };