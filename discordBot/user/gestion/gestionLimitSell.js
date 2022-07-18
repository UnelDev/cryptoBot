const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');

async function gestionLimitSell(user, channel, dateStart) {
	const creatorStop = [];
	const creatorLimit = [];
	let StopSell = '';
	let limitSell = '';
	let sleepLimit = [Promise.resolve];
	let sleepStop = [Promise.resolve];
	if (typeof user.StopSell != 'undefined' && user.StopSell != []) {
		sleepStop = user.StopSell.map(element => {
			StopSell += ', ' + element[0];
			creatorStop.push(['stopSellStop_' + element[0], 'aréter le stopSell de ' + element[0]]);
		});
		await Promise.all(sleepStop);
		// send message for limit sell
		const embed = new MessageEmbed();
		embed.setTitle('voici vos stop sell')
			.addField('limit sell', limitSell)
			.setFooter({ text: (new Date() - dateStart).toString() + 'ms' });
		channel.send({
			embeds: [embed]
		});
		createButton(creatorStop, channel);
	}
	if (typeof user.StopSell != 'undefined' && user.StopSell != []) {
		sleepLimit = user.limitSell.map(element => {
			limitSell += ', ' + element[0];
			creatorLimit.push(['stopSellStop_' + element[0], 'aréter le stopSell de ' + element[0]]);
		});
		await Promise.all(sleepLimit);
		// send message for stop sell
		const embed = new MessageEmbed();
		embed.setTitle('voici vos stop sell')
			.addField('limit sell', StopSell)
			.setFooter({ text: (new Date() - dateStart).toString() + 'ms' });
		channel.send({
			embeds: [embed]
		});
		creatorLimit(creatorStop, channel);
	}
	if (StopSell == '' && limitSell == '') {
		const row = new MessageActionRow();
		row.addComponents(
			new MessageButton()
				.setCustomId('help_')
				.setLabel('aide')
				.setStyle('PRIMARY')
		);
		channel.send({
			content: 'vous n\'avez ni stop sell ni limit sell... vous ne pouvez donc pas en suprimée ! \n si vous voulez en configurée un vous pouvez consultée l\'aide sur ce sujet',
			components: [row]
		});
	}
}

function createButton(creator, channel) {
	// [[0, 1, 2, 3, 4], ...]
	const nbBouton = creator.length;
	let parseButon = 0;
	let buttonArray = [];

	let numberInWhile = -1;
	while (nbBouton > parseButon) {
		numberInWhile++;
		if (numberInWhile == 0) {
			buttonArray.push(new MessageActionRow());
			buttonArray[buttonArray.length - 1] = buttonArray[buttonArray.length - 1].addComponents(new MessageButton()
				.setCustomId(creator[parseButon][0])
				.setLabel(creator[parseButon][1])
				.setStyle('PRIMARY'));
		} else {
			buttonArray[buttonArray.length - 1] = buttonArray[buttonArray.length - 1].addComponents(new MessageButton()
				.setCustomId(creator[parseButon][0])
				.setLabel(creator[parseButon][1])
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

module.exports = gestionLimitSell;