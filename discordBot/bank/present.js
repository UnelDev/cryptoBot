const { MessageEmbed } = require('discord.js');

async function presentBank(channel, bank, dateStart) {
	const embed = new MessageEmbed();
	embed.setTitle('voici les information sur la banque :classical_building: :')
		.setDescription('avant tout il faut savoir que la banque est partie avec un capital de ' + bank.startingCapital + '$')
		.addField('la banque a gagnée ', bank.cash - bank.startingCapital)
		.addField('elle a donc ', bank.cash)
		.addField('pourquoi la banque posede elle ca ?', 'les effet levier arrive bientôt pour faire cella la banque doit posedée d\'enorme fond :money_with_wings: ')
		.setFooter({ text: (new Date() - dateStart).toString() + 'ms' });
	channel.edit({
		embeds: [embed]
	});
}
module.exports = presentBank;