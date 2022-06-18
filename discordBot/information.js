const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const path = require('path');
const search = require('../tools/search');
const draw = require('../tools/drawchart.js');
async function information(message, find, Prefix, client) {
	const result = await search(find, client);
	if (result[0].name.toLowerCase() === find.toLowerCase()) {
		presentMoney(message, result[0], client);
	} else {

		// inside a command, event listener, etc.
		const exampleEmbed = new MessageEmbed()
			.setTitle('resultat de la recherche');
		for (let i = 0; i < result.length; i++) {
			const Element = result[i];
			exampleEmbed.addField(Element.name, Element.symbol);
		}

		message.channel.send({ embeds: [exampleEmbed] });
	}

}
async function presentMoney(message, money, client) {
	const img = draw(money.id, client);
	let price = client.add(['priceEur', money.id]);
	const embed = new Discord.MessageEmbed();
	embed.setTitle('information sur ' + money.name + 'à ' + new Date().getHours() + ':' + new Date().getMinutes());
	embed.setFooter({ text: 'ces donnée peuve être incorrecte' });
	embed.addFields(
		{ name: 'nom', value: money.name },
		{ name: 'symbole', value: money.symbol },
		{ name: 'id', value: money.id },
		{ name: 'marketcap', value: money.market_cap_rank.toString() }
	);
	price = await price;
	embed.addField('prix', await price.toFixed(2));
	embed.setThumbnail(money.large);
	message.channel.send({ embeds: [embed] });
	message.channel.send({ files: [path.resolve(await img)] });
}
module.exports = information;