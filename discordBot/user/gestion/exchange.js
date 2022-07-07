const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
async function exchange(devise, coingecko, channel) {
	const embed = new MessageEmbed();
	embed.setTimestamp();
	embed.setTitle('vous voulez echanger du ' + devise);
	const targetList = [];
	const tickersList = await coingecko.add(['exchangesTickers', devise, 'binance']);
	const sleep = tickersList.tickers.map(async element => {
		if (typeof element.target_coin_id != 'undefined') {
			targetList.push(element.target_coin_id);
		}
	});
	await Promise.all(sleep);
	embed.setDescription('il n\'est pas possible d\'echanger du ' + devise + ' contre nimporte quelle autre devise\nvoici la liste des ' + targetList.length + ' crypto contre lesquelle vous pouvez echager vos ' + devise + '\n cliquer sur celui contre lequelle vous voulez echanger');
	channel.send({
		embeds: [embed],
		components: CreateButon(targetList)
	});
}

function CreateButon(targetList) {
	// create bututon in 5 per 5

	let buttons = new MessageActionRow();
	let buttons0 = new MessageActionRow();
	let buttons1 = new MessageActionRow();
	let nbBouton = 0;
	for (let i = 0; i < targetList.length; i++) {
		if (nbBouton < 5) {
			buttons = buttons.addComponents(new MessageButton()
				.setCustomId('search_' + targetList[i])
				.setLabel('echanger contre ' + targetList[i])
				.setStyle('PRIMARY'));
		} else if (nbBouton < 10) {
			buttons0 = buttons0.addComponents(new MessageButton()
				.setCustomId('search_' + targetList[i])
				.setLabel('voir ' + targetList[i])
				.setStyle('PRIMARY'));
		} else if (nbBouton < 15) {
			buttons1 = buttons1.addComponents(new MessageButton()
				.setCustomId('search_' + targetList[i])
				.setLabel('voir ' + targetList[i])
				.setStyle('PRIMARY'));
		}
		nbBouton++;
	}
	if (nbBouton < 5) {
		return [buttons];
	} else if (nbBouton < 10) {
		return [buttons, buttons0];
	} else if (nbBouton < 15) {
		return [buttons, buttons0, buttons1];
	} else {
		return [];
	}
}
module.exports = exchange;