const fs = require('fs');
const path = require('path');
function saveChanel(message) {
	// Checking if the message author is a server admin
	if (!message.member.permissions.has('ADMINISTRATOR')) {
		message.channel.send('Je suis désolé, mais seul un administrateur peut definir un sallon comme d\'anonce.');
		return;
	}

	// recovery the array of alertChanel
	fs.access(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'), fs.constants.F_OK, (err) => {
		if (err) {
			fs.appendFile(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'), JSON.stringify([]), err => {
				if (err) throw err;
			});
		}
	});
	const file = fs.readFileSync(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'));
	const anoncmentChanel = JSON.parse(file);
	if (anoncmentChanel.indexOf(message.channel.id) != -1) {
		message.channel.send('ce channel est deja enregistrer');
		return;
	}
	anoncmentChanel.push(message.channel.id);
	fs.writeFileSync(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'), JSON.stringify(anoncmentChanel));
	message.channel.send('ce salon a bien été ajouter au sallon d\'anonce.');
}

function stopSaveChanel(message) {
	// Checking if the message author is a server admin
	if (!message.member.permissions.has('ADMINISTRATOR')) {
		message.channel.send('Je suis désolé, mais seul un administrateur peut definir un sallon comme d\'anonce.');
		return;
	}

	// recovery the array of alertChanel
	fs.access(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'), fs.constants.F_OK, (err) => {
		if (err) {
			fs.appendFile(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'), JSON.stringify([]), err => {
				if (err) throw err;
			});
			message.channel.send('ce salon n\'etait pas un sallon d\'anonce.');
		}
	});
	const file = fs.readFileSync(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'));
	const anoncmentChanel = JSON.parse(file);
	if (anoncmentChanel.indexOf(message.channel.id) == -1) {
		message.channel.send('ce channel n\'est pas enregistrer');
		return;
	}
	anoncmentChanel.splice(anoncmentChanel.indexOf(message.channel.id), 1)
	fs.writeFileSync(path.resolve('./tools/gestionBot/save/AlertChanel/AlertChanel.json'), JSON.stringify(anoncmentChanel));
	message.channel.send('ce salon a bien été suprimée des sallon d\'anonce.');
}
module.exports = { saveChanel, stopSaveChanel };