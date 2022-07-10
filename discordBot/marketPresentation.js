const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const APIMarketPResentation = require('../tools/marketPresentation.js');
async function marketPresentation(message, client) {
	const marketPresentationResult = await APIMarketPResentation(['bitcoin', 'ethereum', 'binancecoin', 'ishares-msci-world-etf-tokenized-stock-defichain'], client);
	const listeOfPrice = [];
	const embed = new MessageEmbed();
	embed.setTitle('presentation du marché à ' + new Date().getHours() + ':' + new Date().getMinutes());
	embed.setFooter({ text: 'ces donnée peuvent être incorrecte' });
	const row = new MessageActionRow();
	Promise.all(marketPresentationResult[1]).then((value) => {
		for (let i = 0; i < marketPresentationResult[0].length; i++) {
			// convert all value to name
			listeOfPrice.push(marketPresentationResult[0][i] + ': ' + value[i] + '$');
			embed.addField(marketPresentationResult[0][i].slice(0, 18), value[i] + '$');
			row.addComponents(
				new MessageButton()
					.setCustomId('search_' + marketPresentationResult[0][i])
					.setLabel(marketPresentationResult[0][i].slice(0, 18))
					.setStyle('PRIMARY')
			);
		}
		message.channel.send({ embeds: [embed], components: [row] });
	});

}
module.exports = marketPresentation;