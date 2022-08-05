const path = require('path');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const chartWalet = require('../chartWalet');
const logs = require('../../../tools/log');
async function toPresent(CoinGecko, channel, user, dateStart) {
	let msg = channel.send('generation en cours... https://tenor.com/view/mr-bean-waiting-still-waiting-gif-13052487');
	if (user.walet.length < 1) {
		msg = await msg;
		msg.edit('vous avez ' + user.cash + ' de cash est c\'est tout, bonne chance :money_mouth:');
		return;
	}
	const embed = new MessageEmbed();
	embed.setTitle('presentation du compte de @' + user.tag);

	embed.addField('cash', user.cash.toString() + '$');
	let total = 0;
	for (let i = 0; i < user.walet.length; i++) {
		if (Number(user.walet[i][1]) != 0) {
			let price = await CoinGecko.add(['priceUsd', user.walet[i][0]]);
			// usd , 1*1000 + '$'
			price = price * Number(user.walet[i][1]);
			embed.addField(user.walet[i][0] + ' ', user.walet[i][1] + ' ' + user.walet[i][0] + ' ≈ ' + price.toString() + '$');
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
			logs('error in topresent.js:35');
		}

		embed.setImage('attachment://image.png');
		msg.edit({
			content: ' ',
			embeds: [embed],
			files: [{
				attachment: path.resolve(await pathOfImg),
				name: 'image.png'
			}]
		});
		await CreateButon(user, channel);
	} else {
		msg.edit({ embeds: [embed] });
		await CreateButon(user, channel);
	}
}

async function CreateButon(user, channel) {
	const ConstructeButon = [];
	const sleepButon = user.walet.map(element => {
		console.log(element);
		if (Number(element[1]) != 0) {
			ConstructeButon.push([('search_' + element[0].toString()), ('voir ' + element[0].toString())]);
		}
	});
	await Promise.all(sleepButon);
	createButton(ConstructeButon, channel);
}

function createButton(creator, channel) {
	// creator = [[id (string), label (string)],[id (string), label (string)],...]
	// buttonArray = [[0, 1, 2, 3, 4], ...]
	const nbBouton = creator.length;
	let parseButon = 0;
	let buttonArray = [];

	let numberInWhile = -1;
	while (nbBouton > parseButon) {
		numberInWhile++;
		if (numberInWhile == 0) {
			buttonArray.push(new MessageActionRow());
			buttonArray[buttonArray.length - 1] = buttonArray[buttonArray.length - 1].addComponents(new MessageButton()
				.setCustomId(creator[parseButon][0].toString())
				.setLabel(creator[parseButon][1].toString())
				.setStyle('PRIMARY'));
		} else {
			buttonArray[buttonArray.length - 1] = buttonArray[buttonArray.length - 1].addComponents(new MessageButton()
				.setCustomId(creator[parseButon][0].toString())
				.setLabel(creator[parseButon][1].toString())
				.setStyle('PRIMARY'));
		}
		if (numberInWhile == 4) {
			numberInWhile = -1;
		}
		parseButon++;
		if (((parseButon % 25) == 0) || (nbBouton <= parseButon)) {
			channel.send({
				components: buttonArray
			});
			buttonArray = [];
		}
	}
}

module.exports = toPresent;

