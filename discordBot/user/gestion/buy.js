const verifyExist = require('./verifyExist');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const serach = require('./search');
async function buy(id, channel, member, nCoingeko, clientlist, client) {
	try {
		if (!verifyExist(clientlist, client)) {
			channel.send('vous n\'avez pas de compte !');
			return;
		}
		const price = nCoingeko.add(['priceUsd', id]);
		createEmbed(clientlist, member, id, await price);
	} catch (error) {
		channel.send('une erreur est survenu lors de l\'achat : ' + error);
	}
}
function createEmbed(clientlist, member, name, price) {
	const client = serach(clientlist, member.id);
	client.watingMp = 'priceFor_' + name;
	const embed = new MessageEmbed()
		.setTitle('initiation d\'achat')
		.setDescription('vous voulez acheter du ' + name + ' cella vous coutera ' + price + ' $ unitée \n combien en voulez vous ?\n repondez uniquement le prix en $ que vous voulez optenire');
	member.send({
		embeds: [embed]
	});

}
async function buyOnResponse(response, devise, channel, coingecko) {
	devise = devise.replace('priceFor_', '');
	if (typeof parseFloat(response) != 'number') {
		channel.send('desolée il faut rentrer un nombre !');
		return;
	}
	let price;
	try {
		price = await coingecko.add(['priceUsd', devise]);
	} catch (error) {
		channel.send('desolée la devise ' + devise + ' a generer un erreur : ' + error);
		return;
	}

	let number = response / price;
	number *= 1000;
	number = Math.trunc(number);
	number /= 1000;
	const embed = new MessageEmbed()
		.setTitle('confirmation d\'achat')
		.setDescription('voici le recapitulatif de votre commande :')
		.addFields(
			{ name: 'prix actuelle de ' + devise, value: '≈' + price + '$' },
			{ name: 'prix en $ ', value: response },
			{ name: 'devise ', value: devise },
			{ name: 'vous allez achetez (valeur arondie)', value: number + ' de : ' + devise }
		)
		.setTimestamp()
		.setFooter({ text: 'le reste de l\'arondit sert a "financeée" le bot. (argent factice)' });
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('buyFinaly_' + devise + '_' + number)
			.setLabel('finalisée l\'achat')
			.setStyle('SUCCESS')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('cancel')
			.setLabel('annuler l\'achat')
			.setStyle('DANGER')
	);

	channel.send({
		embeds: [embed],
		components: [row]
	});
}
module.exports = { buy, buyOnResponse };