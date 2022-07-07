const { MessageEmbed } = require('discord.js');

async function exchange(devise, coingecko) {
	const embed = new MessageEmbed();
	embed.setTimestamp();
	embed.setTitle('vous voulez echanger du ' + devise);
	embed.setDescription('il n\'est pas possible d\'ecahner du ' + devise + ' contre nimporte quelle autre devise');
}