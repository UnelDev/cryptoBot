const fs = require('fs');
const path = require('path');

function prefix(message, oldPrefix) {

	// Checking if the message author is a server admin
	if (!message.member.permissions.has('ADMINISTRATOR')) {
		message.channel.send('Je suis désolé, mais seul un administrateur peut changer mon préfix.');
		return;
	}

	let newPrefix = message.content.replace(oldPrefix, '').toLowerCase();
	newPrefix = newPrefix.replace('prefix', '');
	while (newPrefix.includes(' ')) {
		newPrefix = newPrefix.replace(' ', '');
	}

	// If the new prefix is empty, we send an error message
	if (newPrefix == '') {
		message.channel.send('La syntaxe est {ancien préfix}prefix {nouveau préfix}');
		return;
	}

	// If the new prefix is the same as the old one, we send an error message
	if (oldPrefix == newPrefix) {
		message.channel.send('Euh, vous êtes sûr ? D\'accord, je redéfini mon préfix à lui-même...');
		return;
	}

	// All is good, we can change the prefix
	// We save it by writing it in a new json config file named guildID.json in the prefix folder
	fs.writeFileSync(path.resolve('./discordBot/prefix/' + message.guildId + '.json'), JSON.stringify({ prefix: newPrefix }));
	message.channel.send('Mon préfix a bien été changé en \'' + newPrefix + '\'');
}

module.exports = { prefix };