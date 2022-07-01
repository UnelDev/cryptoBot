const { MessageEmbed } = require('discord.js');
async function ping(channel, coingecko, time) {
	let pingCoingecko = coingecko.add(['ping']);
	const Embed = new MessageEmbed();
	let numberOfResolve = 0;
	for (let i = coingecko.runer.length; i > 0; i--) {
		if (coingecko.runer[i] == Promise.resolve) {
			numberOfResolve = i;
			break;
		}
	}
	pingCoingecko = await pingCoingecko;
	Embed.setTitle('test de latence')
		.setDescription('voici les statistique du serveur elle on ete mesurer en temps réel')
		.addField('demande en atente de traitement', numberOfResolve.toString())
		.addField('api', pingCoingecko.toString() + 'ms')
		.addField('traitement de cette demande', (new Date() - time).toString() + 'ms');
	channel.send({ embeds: [Embed] });
}
module.exports = ping;