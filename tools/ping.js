const { MessageEmbed } = require('discord.js');
async function ping(channel, coingecko, timestart, timeSend, discordApiLatance) {
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
		.addField('temps d\'envoie de message: ' + ((timestart - timeSend) + discordApiLatance).toString() + ' ms', '	ping client serveur: ' + (timestart - timeSend).toString() + 'ms\n	api discord: ' + discordApiLatance.toString() + 'ms')
		.addField('temps de calcul: ' + (new Date() - timestart).toString() + ' ms', '	api crypto: ' + pingCoingecko.toString() + 'ms\n	calcule et generationde cette demande (sans la latence de l\'api): ' + ((new Date() - timestart) - pingCoingecko).toString() + 'ms')
		.addField('total: ' + (((timestart - timeSend) + discordApiLatance) + (pingCoingecko + (new Date() - timestart))).toString() + 'ms', '\u200B');
	channel.send({ embeds: [Embed] });
}
module.exports = ping;