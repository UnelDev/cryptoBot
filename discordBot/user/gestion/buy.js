const verifyExist = require('./verifyExist');
const { MessageEmbed } = require('discord.js');
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
function buyOnResponse(response, devise, channel) {
	channel.send(response + '	, 	' + devise);
}
module.exports = { buy, buyOnResponse };