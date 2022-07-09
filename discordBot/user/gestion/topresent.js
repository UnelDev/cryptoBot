const path = require('path');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const chartWalet = require('../chartWalet');
const log = require('../../../tools/log');
async function toPresent(CoinGecko, channel, user, dateStart) {
	let msg = channel.send('generation en cours... https://tenor.com/view/mr-bean-waiting-still-waiting-gif-13052487');
	if (user.walet.length < 1) {
		msg = await msg;
		msg.edit('vous avez ' + user.cash + ' de cash est c\'est tout, bonne chance :money_mouth:');
		return;
	}
	const embed = new MessageEmbed();
	embed.setTitle('presentation du compte de @' + user.tag);

	embed.addField('cash', user.cash.toString());
	let total = 0;
	for (let i = 0; i < user.walet.length; i++) {
		if (Number(user.walet[i][1]) != 0) {
			let price = await CoinGecko.add(['priceUsd', user.walet[i][0]]);
			// usd , 1*1000 + '$'
			price = price * Number(user.walet[i][1]);
			embed.addField(user.walet[i][0], Number(user.walet[i][1]) + ' ' + user.walet[i][0] + ' ≈ ' + price.toString() + '$');
			total += price;
		}
	}
	embed.addField('total crypto ', ' ≈ ' + total.toString() + '$');
	embed.addField('total', ' ≈ ' + (user.cash + total).toString() + '$');
	embed.setTimestamp();
	msg = await msg;
	embed.setFooter({ text: 'ces donnée peuvent être incorrecte • ' + (new Date() - dateStart).toString() + 'ms' });
	if (user.history.length > 1) {
		let pathOfImg;
		try {
			pathOfImg = chartWalet(user, CoinGecko);
		} catch (error) {
			pathOfImg = 'topresent.js';
			log('error in topresent.js:35');
		}

		embed.setImage('attachment://image.png');
		msg.edit({
			content: ' ',
			embeds: [embed],
			files: [{
				attachment: path.resolve(await pathOfImg),
				name: 'image.png'
			}],
			components: CreateButon(user)
		});
	} else {
		msg.edit({ embeds: [embed], components: CreateButon(user) });
	}
}

function CreateButon(user) {
	// create bututon in 5 per 5

	let buttons = new MessageActionRow();
	let buttons0 = new MessageActionRow();
	let buttons1 = new MessageActionRow();
	let nbBouton = 0;
	for (let i = 0; i < user.walet.length; i++) {
		if (nbBouton < 5) {
			buttons = buttons.addComponents(new MessageButton()
				.setCustomId('search_' + user.walet[i][0])
				.setLabel('voir ' + user.walet[i][0])
				.setStyle('PRIMARY'));
		} else if (nbBouton < 10) {
			buttons0 = buttons0.addComponents(new MessageButton()
				.setCustomId('search_' + user.walet[i][0])
				.setLabel('voir ' + user.walet[i][0])
				.setStyle('PRIMARY'));
		} else if (nbBouton < 15) {
			buttons1 = buttons1.addComponents(new MessageButton()
				.setCustomId('search_' + user.walet[i][0])
				.setLabel('voir ' + user.walet[i][0])
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


module.exports = toPresent;

