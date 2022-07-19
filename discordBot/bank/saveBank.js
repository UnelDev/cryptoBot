const fs = require('fs');
const path = require('path');
const log = require('../../tools/log');
async function saveBank(SaveBank) {
	let str;
	try {
		str = JSON.stringify(SaveBank);
	} catch (error) {
		log('save user ' + SaveBank.tag + 'is imposible because ' + error);
	}


	const filePath = path.resolve('./discordBot/user/save/bank.json');
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
}

function restoreBank() {
	const bank = require('./bank.js');
	const data = fs.readFileSync('./discordBot/user/save/bank.json',
		{ encoding: 'utf8', flag: 'r' });
	const tempBank = JSON.parse(data);
	const Nbank = new bank(tempBank.cash, tempBank.startingCapital, tempBank.taxes);
	return Nbank;

}
module.exports = { saveBank, restoreBank };