const { MessageEmbed } = require('discord.js');
const APIMarketPResentation = require('../tools/marketPresentation.js');
async function marketPresentation(message, Prefix, client) {
	const marketPresentationResult = await APIMarketPResentation(['bitcoin', 'ethereum', 'binancecoin', 'ishares-msci-world-etf-tokenized-stock-defichain'], client);
	const listeOfPrice = [];
	const embed = new MessageEmbed();
	embed.setTitle('presentation du marché à ' + new Date().getHours() + ':' + new Date().getMinutes());
	Promise.all(marketPresentationResult[1]).then((value) => {
		for (let i = 0; i < marketPresentationResult[0].length; i++) {
			listeOfPrice.push(marketPresentationResult[0][i] + ': ' + value[i].toFixed(2) + '€');
			embed.addField(marketPresentationResult[0][i].slice(0, 18), value[i].toFixed(2) + '€');
		}
		message.channel.send({ embeds: [embed] });
	});

}
module.exports = marketPresentation;