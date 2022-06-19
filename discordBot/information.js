const { MessageEmbed } = require('discord.js');
const currencyPresentation = require('./discordBot/currencyPresentation.js');
const search = require('../tools/search');
async function information(channel, find, client) {
	const result = await search(find, client);
	if (typeof result[0] != 'undefined' && result[0].name.toLowerCase() === find.toLowerCase()) {
		currencyPresentation(channel, result[0], client);
	} else {

		// inside a command, event listener, etc.
		const exampleEmbed = new MessageEmbed()
			.setTitle('resultat de la recherche');
		for (let i = 0; i < result.length; i++) {
			const Element = result[i];
			exampleEmbed.addField(Element.name, Element.symbol);
		}

		channel.send({ embeds: [exampleEmbed] });
	}

}
module.exports = information;