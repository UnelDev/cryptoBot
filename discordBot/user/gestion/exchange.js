const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { serachid } = require('./search');
async function exchange(devise, coingecko, channel, dateStart) {
	const embed = new MessageEmbed();
	embed.setTimestamp();
	embed.setTitle('vous voulez echanger du ' + devise);
	const targetList = [];
	const tickersList = await coingecko.add(['exchangesTickers', devise, 'binance']);
	if (tickersList.tickers.length <= 0) {
		noResult(embed, devise, channel);
		return;
	}
	const sleep = tickersList.tickers.map(async element => {
		if (typeof element.target_coin_id != 'undefined') {
			targetList.push([element.target_coin_id, element.bid_ask_spread_percentage]);
		}
	});
	await Promise.all(sleep);
	if (targetList.length <= 0) {
		noResult(embed, devise, channel);
		return;
	}
	embed.setDescription('il n\'est pas possible d\'echanger du ' + devise + ' contre nimporte quelle autre devise\nvoici la liste des ' + targetList.length + ' crypto contre lesquelle vous pouvez echager vos ' + devise + '\n cliquer sur celui contre lequelle vous voulez echanger');
	embed.setFooter({ text: 'ces donnée peuvent être incorrecte • ' + (new Date() - dateStart).toString() + 'ms' });
	channel.edit({
		embeds: [embed],
		components: CreateButon(targetList, devise)
	});
}

function noResult(embed, devise, channel) {
	embed.setDescription('le ' + devise + 'n\'a pas de paire vou pouvez que le vendre pas l\'echanger !');
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('sell_' + devise)
			.setLabel('vendre ' + devise)
			.setStyle('PRIMARY')
	);
	channel.edit({
		embeds: [embed],
		components: [row]
	});
}

function CreateButon(targetList, devise) {
	// create bututon in 5 per 5

	let buttons = new MessageActionRow();
	let buttons0 = new MessageActionRow();
	let buttons1 = new MessageActionRow();
	let nbBouton = 0;
	for (let i = 0; i < targetList.length; i++) {
		if (nbBouton <= 5) {
			buttons = buttons.addComponents(new MessageButton()
				.setCustomId('changeTo_' + devise + '_' + targetList[i][0] + '_' + targetList[i][1])
				.setLabel('echanger contre ' + targetList[i][0])
				.setStyle('PRIMARY'));
		} else if (nbBouton <= 10) {
			buttons0 = buttons0.addComponents(new MessageButton()
				.setCustomId('changeTo_' + devise + '_' + targetList[i][0] + '_' + targetList[i][1])
				.setLabel('echanger contre ' + targetList[i][0])
				.setStyle('PRIMARY'));
		} else if (nbBouton <= 15) {
			buttons1 = buttons1.addComponents(new MessageButton()
				.setCustomId('changeTo_' + devise + '_' + targetList[i][0] + '_' + targetList[i][1])
				.setLabel('echanger contre ' + targetList[i][0])
				.setStyle('PRIMARY'));
		}
		nbBouton++;
	}
	if (nbBouton <= 5) {
		return [buttons];
	} else if (nbBouton <= 10) {
		return [buttons, buttons0];
	} else if (nbBouton <= 15) {
		return [buttons, buttons0, buttons1];
	} else {
		return [];
	}
}

async function exchangeResponse(devise, target, spread, member, coingecko, dateStart, clientlist) {
	const embed = new MessageEmbed();
	const price = coingecko.add(['priceUsd', devise]);
	const priceTarget = coingecko.add(['priceUsd', target]);
	embed.setTimestamp();
	embed.setTitle('initiation de commande : ' + devise + ' -> ' + target);
	embed.addField('prix de base', (await price).toString());
	embed.addField('spread', spread.toString() + '%');
	embed.addField('prix de votre money', ((await price) + (spread / 100 * await price)).toString() + '$');
	embed.addField('prix de la money a échanger ', (await priceTarget).toString() + '$');
	embed.addField('taux d\'echange', '1 ' + devise + ' = ' + (((await price) + (spread / 100 * await price)) / await priceTarget).toString() + ' ' + target);
	embed.addField('conbien voulez vous en echanger (nombre de ' + devise + ') ?', '\u200B');
	embed.setFooter({ text: 'ces donnée peuvent être incorrecte • ' + (new Date() - dateStart).toString() + 'ms' });
	const client = serachid(clientlist, member.id);
	client.watingMp = 'exchange_' + devise + '_' + target + '_' + spread;
	member.send({
		embeds: [embed]
	});
}

async function exchangeResponseMP(devise, target, spread, channel, number, coingecko) {
	if (isNaN(Number(number))) {
		channel.send('desolée il faut rentrer un nombre !');
		return;
	}
	const price = coingecko.add(['priceUsd', devise]);
	const priceTarget = coingecko.add(['priceUsd', target]);
	const embed = new MessageEmbed()
		.setTitle('confirmation d\'achat')
		.setDescription('voici le recapitulatif de votre commande : ' + devise + ' -> ' + target)
		.addField('prix de base', (await price).toString())
		.addField('spread', spread.toString() + '%')
		.addField('prix de votre money', ((await price) + (spread / 100 * await price)).toString() + '$')
		.addField('prix de la money a échanger ', (await priceTarget).toString() + '$');
	const rate = (((await price) + (spread / 100 * await price)) / await priceTarget);
	embed.addField('taux d\'echange', '1 ' + devise + ' = ' + rate.toString() + ' ' + target)
		.addField('votre trasaction', number + ' ' + devise + '=' + rate * number + ' ' + target)
		.setTimestamp()
		.setFooter({ text: 'ces donée peuvent etre incorect' });
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('changeFinaly_' + devise + '_' + target + '_' + number + '_' + rate * number + '_' + spread)
			.setLabel('finalisée l\'echange')
			.setStyle('SUCCESS')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('cancel')
			.setLabel('annuler l\'echange')
			.setStyle('DANGER')
	);
	channel.send({
		embeds: [embed],
		components: [row]
	});
}
module.exports = { exchange, exchangeResponse, exchangeResponseMP };