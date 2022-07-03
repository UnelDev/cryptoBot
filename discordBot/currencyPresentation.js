const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const path = require('path');
const draw = require('../tools/drawChart.js');
const existsSync = require('node:fs').existsSync;
const fs = require('fs');
async function currencyPresentation(channel, money, client, isDev) {
	let msg = channel.send('generation en cours... https://tenor.com/view/mr-bean-waiting-still-waiting-gif-13052487');
	const img = draw(money.id, client);
	const info = await client.add(['info', money.id]);
	const embed = new MessageEmbed();
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
	constructDescrition(info, isDev);
	embed.setTimestamp();
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('buy_' + money.id)
			.setLabel('achter ' + money.name)
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('sell_' + money.id)
			.setLabel('vendre ' + money.name)
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('moreTime_' + money.id)
			.setLabel('graphique autre periode')
			.setStyle('PRIMARY')
	);
	msg = await msg;
	msg.edit({
		content: ' ',
		embeds: [embed],
		files: [{
			attachment: path.resolve(await img),
			name: 'image.png'
		}],
		components: [row]
	});
	client.add(['info', money.id]);
}

function constuctFields(info) {
	const fields = [];
	if (info.market_data.current_price.usd) {
		const sate = CalculpriceChange(info.market_data.price_change_percentage_24h);
		const signe = calculeStateChange(info.market_data.price_change_percentage_24h);
		fields.push({ name: 'prix', value: info.market_data.current_price.usd + '$ (' + signe + info.market_data.price_change_percentage_24h.toFixed(2) + '%)' + sate });
	}
	if (info.market_data.price_change_percentage_7d) {
		const sate = CalculpriceChange(info.market_data.price_change_percentage_7d);
		const signe = calculeStateChange(info.market_data.price_change_percentage_7d);
		fields.push({ name: 'evolution en 7 jours', value: signe + info.market_data.price_change_percentage_7d.toFixed(2) + '%' + sate });
	}
	if (info.market_data.price_change_percentage_14d) {
		const sate = CalculpriceChange(info.market_data.price_change_percentage_14d);
		const signe = calculeStateChange(info.market_data.price_change_percentage_14d);
		fields.push({ name: 'evolution en 14 jours', value: signe + info.market_data.price_change_percentage_14d.toFixed(2) + '%' + sate });
	}
	if (info.market_data.price_change_percentage_30d) {
		const sate = CalculpriceChange(info.market_data.price_change_percentage_30d);
		const signe = calculeStateChange(info.market_data.price_change_percentage_30d);
		fields.push({ name: 'evolution en 30 jours', value: signe + info.market_data.price_change_percentage_30d.toFixed(2) + '%' + sate });
	}
	if (info.market_data.price_change_percentage_60d) {
		const sate = CalculpriceChange(info.market_data.price_change_percentage_60d);
		const signe = calculeStateChange(info.market_data.price_change_percentage_60d);
		fields.push({ name: 'evolution en 60 jours', value: signe + info.market_data.price_change_percentage_60d.toFixed(2) + '%' + sate });
	}
	if (info.market_data.price_change_percentage_200d) {
		const sate = CalculpriceChange(info.market_data.price_change_percentage_200d);
		const signe = calculeStateChange(info.market_data.price_change_percentage_200d);
		fields.push({ name: 'evolution en 200 jours', value: signe + info.market_data.price_change_percentage_200d.toFixed(2) + '%' + sate });
	}
	if (info.market_data.price_change_percentage_1y) {
		const sate = CalculpriceChange(info.market_data.price_change_percentage_1y);
		const signe = calculeStateChange(info.market_data.price_change_percentage_1y);
		fields.push({ name: 'evolution en 1 an', value: signe + info.market_data.price_change_percentage_1y.toFixed(2) + '%' + sate });
	}
	let link = '';
	if (info.links.homepage[0] != '') {
		link += 'site web: ' + info.links.homepage[0] + '\n';
	}
	if (info.links.blockchain_site[0] != '') {
		link += 'blockchain : ' + info.links.blockchain_site[0] + '\n';
	}
	if (info.links.announcement_url[0] != '') {
		link += 'lien d\'annonce : ' + info.links.announcement_url[0];
	}
	if (link != '') {
		fields.push({ name: 'lien', value: link });
	}
	return fields;
}
function calculeStateChange(change) {
	if (change > 0) {
		return '+';
	} else {
		return '';
	}
}

function CalculpriceChange(PriceChange) {
	if (PriceChange > 0 && PriceChange < 30) {
		return ':arrow_up_small:';
	} if (PriceChange >= 30) {
		return ':arrow_double_up:';
	} else if (PriceChange < 0 && PriceChange > -30) {
		return ':arrow_down_small:';
	} else if (PriceChange <= 30) {
		return ':arrow_double_down:';
	} else {
		return ':radio_button:';
	}
}

function constructDescrition(info, isDev) {
	let pathOfFile;
	let pathOftemplate;
	if (isDev) {
		//						   pi home /
		pathOfFile = path.resolve('../../../var/www/html/presentationOfCrypto/' + info.name + '.html');
		pathOftemplate = path.resolve('../../../var/www/html/presentationOfCrypto/presentationOfCrypto.html');
	} else {
		pathOfFile = path.resolve('./site/' + info.name + '.html');
		pathOftemplate = path.resolve('./site/presentationOfCrypto.html');
	}

	if (existsSync(pathOfFile)) {
		return;
	}
	let text = '';
	let adversment = '';
	if (info.description.fr != '') {
		text = info.description.fr;
	} else if (info.description.en != '') {
		text = info.description.en;
		adversment = 'desolée mais ' + info.name + ' n\'a pas de description en francais !';
	}
	text.replace('\'\\r\\n\'', '<br>');
	text = text.split('+');
	for (let i = 0; i < text.length; i++) {
		if (text[i].startsWith('\'')) {
			text[i].shift();
		}
	}
	text = text.join('+');
	text.replace('\\r\\n\' + ', ' < br >');

	let file = fs.readFileSync(pathOftemplate,
		{ encoding: 'utf8', flag: 'r' });

	const name = info.name;
	file = file.replace('$name1$', name);
	file = file.replace('$name2$', name);
	file = file.replace('$name3$', name);
	file = file.replace('$descriptionOfCrypto$', text);
	file = file.replace('$avertment$', adversment);

	fs.writeFileSync(pathOfFile, file);

}
module.exports = currencyPresentation;