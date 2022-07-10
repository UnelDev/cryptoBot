const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
async function sellStop(coingecko, userListe, clientDiscord) {
	const listDeviseWatch = [];
	const listDevisePrice = new Map();
	let sleep = userListe.map(user => {
		if (user.limitSell != []) {
			user.limitSell.forEach(element => {
				listDeviseWatch.push(element[0]);
			});
		}
	});
	await Promise.all(sleep);
	sleep = listDeviseWatch.map(async Element => {
		listDevisePrice.set(Element, await coingecko.add(['priceUsd -f', Element]));
	});
	await Promise.all(sleep);
	sleep = userListe.map(user => {
		if (user.limitSell != []) {
			user.limitSell.forEach(element => {
				if (listDevisePrice.get(element[0]) <= element[1]) {
					sell(element[0], user, coingecko, clientDiscord);
				}
			});
		}
	});
}
async function sellLimit(coingecko, userListe, clientDiscord) {
	const listDeviseWatch = [];
	const listDevisePrice = new Map();
	let sleep = userListe.map(user => {
		if (user.limitSell != []) {
			user.limitSell.forEach(element => {
				listDeviseWatch.push(element[0]);
			});
		}
	});
	await Promise.all(sleep);
	sleep = listDeviseWatch.map(async Element => {
		listDevisePrice.set(Element, await coingecko.add(['priceUsd -f', Element]));
	});
	await Promise.all(sleep);
	sleep = userListe.map(user => {
		if (user.limitSell != []) {
			user.limitSell.forEach(element => {
				if (listDevisePrice.get(element[0]) >= element[1]) {
					sell(element[0], user, coingecko, clientDiscord);
				}
			});
		}
	});
}

function sell(name, user, coingecko, clientDiscord) {
	user.sellAll(name, coingecko, clientDiscord);
}

async function interfaceLimitSell(channel, user) {
	const embed = new MessageEmbed();
	embed.setTitle('choisir des limitSell')
		.setDescription('ici vous allez pouvoir selectionnée des prix a partir des quelle vos crypto seront vendus automatiquement !')
		.setFooter({ text: 'ces action demmande beaucoup de resource a etre calculée, n\'en abusée pas !' })
		.addField('sell stop', 'permet de configurer une limite a laquelle sera vendus vos crypto si leur prix sont **inferieur** a cette limite')
		.addField('sell limit', 'permet de configurer une limite a laquelle sera vendus vos crypto si leur prix sont **superieur** a cette limite');
	channel.send({ embeds: [embed], components: CreateButon(user) });
}

function CreateButon(user) {
	// create bututon in 5 per 5

	let buttons = new MessageActionRow();
	let buttons0 = new MessageActionRow();
	let buttons1 = new MessageActionRow();
	let nbBouton = 0;

	for (let i = 0; i < user.walet.length; i++) {
		if (nbBouton < 5) {
			buttons = buttons.addComponents(new MessageButton()
				.setCustomId('limit_' + user.walet[i][0])
				.setLabel('limiter ' + user.walet[i][0])
				.setStyle('PRIMARY'));
		} else if (nbBouton < 10) {
			buttons0 = buttons0.addComponents(new MessageButton()
				.setCustomId('limit_' + user.walet[i][0])
				.setLabel('limiter ' + user.walet[i][0])
				.setStyle('PRIMARY'));
		} else if (nbBouton < 15) {
			buttons1 = buttons1.addComponents(new MessageButton()
				.setCustomId('limit_' + user.walet[i][0])
				.setLabel('limiter ' + user.walet[i][0])
				.setStyle('PRIMARY'));
		}
		nbBouton++;
	}
	if (nbBouton < 5) {
		return [buttons];
	} else if (nbBouton < 10) {
		return [buttons, buttons0];
	} else if (nbBouton < 15) {
		return [buttons, buttons0, buttons1];
	} else {
		return [];
	}
}
module.exports = { sellStop, sellLimit, interfaceLimitSell };