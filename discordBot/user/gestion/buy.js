const verifyExist = require('./verifyExist');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { serachid } = require('./search');
const logs = require('../../../tools/log');
async function buy(id, channel, member, nCoingeko, clientlist, client) {
	try {
		if (!verifyExist(clientlist, client)) {
			const embed = new MessageEmbed()
				.setTitle('vous n\'avez pas de compte !');
			const row = new MessageActionRow();
			row.addComponents(
				new MessageButton()
					.setCustomId('createAcount')
					.setLabel('crée un compte !')
					.setStyle('PRIMARY')
			);
			channel.send({
				embeds: [embed],
				components: [row]
			});
			return;
		}
		const price = nCoingeko.add(['priceUsd', id]);
		createEmbed(clientlist, member, id, await price);
	} catch (error) {
		channel.send('une erreur est survenu lors de l\'achat : ' + error + 'contacter @unel#1527');
		logs('@unel#1527 error in buy error :' + error + ' client : ' + client + 'require :' + id);
	}
}
function createEmbed(clientlist, member, name, price) {
	const client = serachid(clientlist, member.id);
	client.watingMp = 'priceFor_' + name;
	const embed = new MessageEmbed()
		.setTitle('initiation d\'achat')
		.setDescription('vous voulez acheter du ' + name + ' cella vous coutera ' + price + ' $ unitée \n combien en voulez vous ?\n repondez uniquement le prix en $ que vous voulez obtenir');
	member.send({
		embeds: [embed]
	});

}
async function buyOnResponse(response, devise, channel, coingecko, bankTaxe) {
	devise = devise.replace('priceFor_', '');
	if (isNaN(Number(response))) {
		channel.send('desolée il faut rentrer un nombre !');
		return;
	}
	let price;
	try {
		price = await coingecko.add(['priceUsd', devise]);
	} catch (error) {
		channel.send('desolée la devise ' + devise + ' a generer un erreur : ' + error + 'contacter @unel#1527');
		return;
	}
	const taxe = ((bankTaxe / 100) * response);

	const number = (response - taxe) / price;

	const embed = new MessageEmbed()
		.setTitle('confirmation d\'achat')
		.setDescription('voici le recapitulatif de votre commande :')
		.addFields(
			{ name: 'prix actuelle de ' + devise, value: '≈' + price + '$' },
			{ name: 'taxe actuelle ', value: bankTaxe + ' = ' + taxe + '$' },
			{ name: 'prix en $ ', value: response },
			{ name: 'devise ', value: devise },
			{ name: 'vous allez achetez ', value: number + ' de : ' + devise }
		)
		.setTimestamp()
		.setFooter({ text: 'les taxe revienne au bot' });
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('buyFinaly_' + devise + '_' + number + '_' + price + '_' + taxe)
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