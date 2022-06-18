const { MessageEmbed } = require('discord.js');
const search = require('../tools/search');
async function information(message, find, Prefix, client) {
	const result = await search(find, client);
	if (result[0].name.toLowerCase() === find.toLowerCase()) {
		console.log('found');
		presentMoney(message, result[0], client);
	} else {

		// inside a command, event listener, etc.
		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Some title')
			.setURL('https://discord.js.org/')
			.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
			.setDescription('Some description here')
			.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.addFields(
				{ name: 'Regular field title', value: 'Some value here' },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
			)
			.addField('Inline field title', 'Some value here', true)
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

		message.channel.send({ embeds: [exampleEmbed] });
	}

}
async function presentMoney(message, money, client) {
	const embed = new MessageEmbed();
	embed.setTitle('information sur ' + money.name);
	embed.setFooter({ text: 'ces donnée peuve être incorrecte' });
	embed.addFields(
		{ name: 'nom', value: money.name },
		{ name: 'symbole', value: money.symbol },
		{ name: 'id', value: money.id },
		{ name: 'marketcap', value: money.market_cap_rank.toString() }
	);
	embed.setThumbnail(money.large);

	message.channel.send({ embeds: [embed] });
}
module.exports = information;