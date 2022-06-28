const fs = require('fs');
const path = require('path');
async function saveUser(SaveUser) {
	let str;
	try {
		str = JSON.stringify(SaveUser);
	} catch (error) {
		console.log('save user ' + SaveUser.tag + 'is imposible because ' + error);
	}


	const filePath = path.resolve('./discordBot/user/save/' + SaveUser.id + '.json');
	if (typeof filePath == 'undefined') {
		console.log('saveUser -> name is undefine');
		return;
	}
	fs.access(filePath, err => {
		if (!err) {
			('This file already exists');
			return;
		}
		fs.writeFile(filePath, str, err => {
			if (err) {
				if (err.code == 'EPERM') {
					console.log('saveUser -> Unsufficient permissions');
				} else {
					console.log('saveUser -> Impossible to create this file ' + err);
				}
				return;
			}
		});
	});
	const logger = fs.createWriteStream('./discordBot/user/save/index.json', {
		flags: 'a'
	});

	logger.write(SaveUser.id + '-_-');
}

function restore() {
	const user = require('./user');
	let index = fs.readFileSync('./discordBot/user/save/index.json',
		{ encoding: 'utf8', flag: 'r' });
	index = index.split('-_-');
	index.pop();
	const lisId = index;
	console.log(lisId);
	const userListe = [];
	lisId.forEach(element => {
		const data = fs.readFileSync('./discordBot/user/save/' + element + '.json',
			{ encoding: 'utf8', flag: 'r' });
		const tempUser = JSON.parse(data);
		const Nuser = new user(tempUser.id, tempUser.tag, tempUser.cash, tempUser.walet, tempUser.history, tempUser.watinMp, true);
		userListe.push(Nuser);
	});
	console.log(userListe);

}
module.exports = saveUser;