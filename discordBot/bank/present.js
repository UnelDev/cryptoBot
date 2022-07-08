const { MessageEmbed } = require('discord.js');

async function presentBank(channel, bank, dateStart) {
	const embed = new MessageEmbed();
	embed.setTitle('voici les information sur la banque :classical_building: :')
		.setDescription('avant tout il faut savoir que la banque est partie avec un capital de ' + bank.startingCapital.toString() + '$')
		.addField('la banque a gagnée ', (bank.cash - bank.startingCapital).toString())
		.addField('elle a donc ', bank.cash.toString())
		.addField('pourquoi la banque posede elle autant ?', 'les effet levier arrive bientôt pour faire cella la banque doit posedée d\'enorme fond :money_with_wings: ')
		.setFooter({ text: (new Date() - dateStart).toString() + 'ms' });
	channel.send({
		embeds: [embed]
	});
}
module.exports = presentBank;