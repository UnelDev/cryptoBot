const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const anotherTime = require('./anotherTime');
const path = require('path');

async function moreTime(channel, devise) {
	const embed = new MessageEmbed();
	embed.setTitle('optenire plus de courbe sur : ' + devise);
	embed.setDescription('pour avoir de plus ample donée sur : ' + devise + 'veiller ciquer une ene echelle de temps ci dessous');
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '1hour')
			.setLabel('une heur')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '1day')
			.setLabel('un jour')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '3day')
			.setLabel('trois jours')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '1week')
			.setLabel('une semaine')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '3week')
			.setLabel('trois semaine')
			.setStyle('PRIMARY')
	);
	const row2 = new MessageActionRow();
	row2.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '1month')
			.setLabel('un mois')
			.setStyle('PRIMARY')
	);
	row2.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '3mounth')
			.setLabel('trois mois')
			.setStyle('PRIMARY')
	);
	row2.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '6month')
			.setLabel('six mois')
			.setStyle('PRIMARY')
	);
	row2.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '1years')
			.setLabel('un an')
			.setStyle('PRIMARY')
	);
	row2.addComponents(
		new MessageButton()
			.setCustomId('moreInformationChart_' + devise + '_' + '2years')
			.setLabel('deux an')
			.setStyle('PRIMARY')
	);
	channel.send({
		content: ' ',
		embeds: [embed],
		components: [row, row2]
	});
}

async function moreTimeReplay(channel, devise, time, coingecko) {
	let msg = channel.send('generation en cours... https://tenor.com/view/mr-bean-waiting-still-waiting-gif-13052487');
	let nbDay;
	let text;
	if (time == '1hour') {
		// une hour in day
		nbDay = 0.041;
		text = ' en 1 heur';
	} else if (time == '1day') {
		nbDay = 1;
		text = 'en 1 jour';
	} else if (time == '3day') {
		nbDay = 3;
		text = 'en 3 jours';
	} else if (time == '1week') {
		nbDay = 7;
		text = 'en 1 semaine';
	} else if (time == '3week') {
		nbDay = 21;
		text = 'en 3 semaine';
	} else if (time == '1month') {
		nbDay = 30;
		text = 'en 1 mois';
	} else if (time == '3mounth') {
		nbDay = 90;
		text = 'en 3 mois';
	} else if (time == '6month') {
		nbDay = 180;
		text = 'en 6 mois';
	} else if (time == '1years') {
		nbDay = 365;
		text = 'en 1 an';
	} else if (time == '2years') {
		nbDay = 730;
		text = 'en 2 ans';
	}
	const img = anotherTime(devise, nbDay, coingecko);

	const embed = new MessageEmbed();
	embed.setTitle('information sur ' + devise + text)
		.setDescription('voici un graphique de l\'evolution des prix de ' + devise + ' ' + text)
		.setImage('attachment://image.png')
		.setFooter({ text: 'ces donnée peuvent être incorrecte' })
		.setTimestamp();
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('buy_' + devise)
			.setLabel('achter ' + devise)
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('sell_' + devise)
			.setLabel('vendre ' + devise)
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('change_' + devise)
			.setLabel('echanger contre une paire')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('moreTime_' + devise)
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
}

module.exports = { moreTime, moreTimeReplay };