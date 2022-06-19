const Discord = require('discord.js');
const path = require('path');
const draw = require('../tools/drawchart.js');
async function currencyPresentation(channel, money, client) {
	const img = draw(money.id, client);
	let price = client.add(['priceEur', money.id]);
	const embed = new Discord.MessageEmbed();
	embed.setTitle('information sur ' + money.name + ' à ' + new Date().getHours() + ':' + new Date().getMinutes());
	embed.setFooter({ text: 'ces donnée peuvent être incorrecte' });
	embed.addFields(
		{ name: 'nom', value: money.name },
		{ name: 'symbole', value: money.symbol },
		{ name: 'id', value: money.id }
	);
	if (money.market_cap_rank) {
		embed.addFields(
			{ name: 'marketcap', value: money.market_cap_rank.toString() }
		);
	}
	price = await price;
	embed.addField('prix', await price.toFixed(2));
	embed.setThumbnail(money.large);
	embed.setImage('attachment://image.png');
	channel.send({
		embeds: [embed],
		files: [{
			attachment: path.resolve(await img),
			name: 'image.png'
		}]
	});
}
module.exports = currencyPresentation;