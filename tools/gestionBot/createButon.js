const { MessageActionRow, MessageButton } = require('discord.js');

function createButton(message, channel) {
	if (message.startsWith('create')) {
		const row = new MessageActionRow();
		row.addComponents(
			new MessageButton()
				.setCustomId('createAcount')
				.setLabel('crée un compte !')
				.setStyle('PRIMARY')
		);
		channel.send({
			content: 'crée un compte en cliquant ici',
			components: [row]
		});
		return;
	} else {
		message = message.split('_');
		const row = new MessageActionRow();
		row.addComponents(
			new MessageButton()
				.setCustomId(message[0])
				.setLabel('clique ici')
				.setStyle('PRIMARY')
		);
		channel.send({
			components: [row]
		});
	}
}

module.exports = createButton;