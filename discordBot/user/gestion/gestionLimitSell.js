const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');

async function gestionLimitSell(user, channel, dateStart) {
	const creatorStop = [];
	const creatorLimit = [];
	let StopSell = '';
	let limitSell = '';
	let sleepLimit = [Promise.resolve];
	let sleepStop = [Promise.resolve];
	if ((typeof user.limitSell != 'undefined') && (user.limitSell != []) && (user.limitSell.length != 0)) {
		sleepStop = user.limitSell.map(element => {
			StopSell += ', ' + element[0].toString();
			creatorStop.push(['stopLimitSell_' + element[0].toString(), 'aréter le limit sell de ' + element[0].toString()]);
		});
		await Promise.all(sleepStop);
		// send message for limit sell
		const embed = new MessageEmbed();
		embed.setTitle('voici vos limit sell')
			.addField('limit sell', StopSell.replace(', ', '').toString())
			.setFooter({ text: (new Date() - dateStart).toString() + 'ms' });
		channel.send({
			embeds: [embed]
		});
		createButton(creatorStop, channel);
	}
	if ((typeof user.sellStop != 'undefined') && (user.sellStop != []) && (user.sellStop.length != 0)) {
		sleepLimit = user.sellStop.map(element => {
			limitSell += ', ' + element[0].toString();
			creatorLimit.push(['stopSellStop_' + element[0].toString(), 'aréter le stop sell de ' + element[0].toString()]);
		});
		await Promise.all(sleepLimit);
		// send message for limit sell
		const embed = new MessageEmbed();
		embed.setTitle('voici vos stop sell')
			.addField('stop sell', limitSell.replace(', ', '').toString())
			.setFooter({ text: (new Date() - dateStart).toString() + 'ms' });
		channel.send({
			embeds: [embed]
		});
		createButton(creatorLimit, channel);
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

module.exports = gestionLimitSell;