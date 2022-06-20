const Discord = require('discord.js');
const path = require('path');
const draw = require('../tools/drawchart.js');
async function currencyPresentation(channel, money, client) {
	const img = draw(money.id, client);
	const info = await client.add(['info', money.id]);
	const embed = new Discord.MessageEmbed();
	embed.setTitle('information sur ' + money.name + ' à ' + new Date().getHours() + ':' + new Date().getMinutes());
	embed.setFooter({ text: 'ces donnée peuvent être incorrecte' });
	embed.addFields(
		{ name: 'nom', value: money.name },
		{ name: 'symbole', value: money.symbol },
		{ name: 'id', value: money.id }
	);
	embed.setThumbnail(money.large);
	embed.setImage('attachment://image.png');
	embed.addFields(constuctFields(info));
	channel.send({
		embeds: [embed],
		files: [{
			attachment: path.resolve(await img),
			name: 'image.png'
		}]
	});
	client.add(['info', money.id]);
}

function constuctFields(info) {
	const fields = [];
	let sate;
	let signe;
	if (info.market_data.price_change_percentage_24h >= 20) {
		signe = '+';
		sate = ':arrow_double_up:';
	} else if (info.market_data.price_change_percentage_24h > 0) {
		signe = '+';
		sate = ':arrow_up:';
	} else if (info.market_data.price_change_percentage_24h < 20) {
		signe = '-';
		sate = ':arrow_double_down:';
	} else if (info.market_data.price_change_percentage_24h < 0) {
		signe = '-';
		sate = ':arrow_down:';
	} else {
		signe = '';
		sate = ':radio_button:';
	}
	if (info.market_data.current_price.eur) {
		fields.push({ name: 'prix', value: info.market_data.current_price.eur + '€ (' + signe + info.market_data.price_change_percentage_24h.toFixed(2) + '%)' + sate });
	}
	if (info.links.homepage[0] != '') {
		fields.push({ name: 'site web', value: info.links.homepage[0] });
	}
	return fields;
}


module.exports = currencyPresentation;