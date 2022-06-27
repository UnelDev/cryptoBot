const verifyExist = require('./verifyExist');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const serach = require('./search');
async function sell(id, channel, member, nCoingeko, clientlist, client) {
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
	client.watingMp = 'sellNumber_' + name;
	const embed = new MessageEmbed()
		.setTitle('initiation de vente')
		.setDescription('vous voulez vendre du ' + name + ' en ce moment il coute ' + price + ' $ unitée \n combien voulez vous en vendre ?\n repondez uniquement le nombre de ' + name + ' que vous voulez vendre');
	member.send({
		embeds: [embed]
	});

}

async function sellOnResponse(response, devise, channel, coingecko) {
	devise = devise.replace('priceFor_', '');
	if (typeof response != 'number') {
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

	let number = response * price;
	number *= 1000;
	number = Math.trunc(number);
	number /= 1000;
	const embed = new MessageEmbed()
		.setTitle('confirmation de vente')
		.setDescription('voici le recapitulatif de votre commande :')
		.addFields(
			{ name: 'prix actuelle de ' + devise, value: '≈' + price + '$' },
			{ name: 'vou voulez en vendre ', value: response },
			{ name: 'devise ', value: devise },
			{ name: 'cella vous raporteras (valeur arondie)', value: number + ' $' }
		)
		.setTimestamp()
		.setFooter({ text: 'le reste de l\'arondit sert a "financeée" le bot. (argent factice)' });
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('sellFinaly_' + devise + '_' + response)
			.setLabel('finalisée la vente')
			.setStyle('SUCCESS')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('cancel')
			.setLabel('annuler la vente')
			.setStyle('DANGER')
	);

	channel.send({
		embeds: [embed],
		components: [row]
	});
}
module.exports = { sell, sellOnResponse };