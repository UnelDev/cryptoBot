const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const currencyPresentation = require('./currencyPresentation.js');
const search = require('../tools/search');
async function information(channel, find, client) {
	const result = await search(find, client);
	if (typeof result[0] != 'undefined' && result[0].name.toLowerCase() === find.toLowerCase()) {
		currencyPresentation(channel, result[0], client);
	} else {
		const row = new MessageActionRow();
		const row2 = new MessageActionRow();
		const Embed = new MessageEmbed()
			.setTitle('resultat de la recherche')
			.setFooter({ text: 'seulement 10 resultat on été aficher' });
		for (let i = 0; i < result.length; i++) {
			const Element = result[i];
			Embed.addField(Element.name, Element.symbol);
			if (i < 5) {
				row.addComponents(
					new MessageButton()
						.setCustomId('visualize_' + Element.name)
						.setLabel(Element.name)
						.setStyle('PRIMARY')
				);
			} else {
				row2.addComponents(
					new MessageButton()
						.setCustomId('visualize_' + Element.name)
						.setLabel(Element.name)
						.setStyle('PRIMARY')
				);
			}
		}
		if (result.length > 5) {
			channel.send({ embeds: [Embed], components: [row, row2] });
		} else {
			channel.send({ embeds: [Embed], components: [row] });
		}
	}

}
module.exports = information;