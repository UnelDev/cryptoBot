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

async function interfaceLimitSell(channel, user, dateStart) {
	const embed = new MessageEmbed();
	embed.setTitle('choisir des limitation')
		.setDescription('ici vous allez pouvoir selectionnée des prix a partir des quelle vos crypto seront vendus automatiquement !')
		.setFooter({ text: 'ces action demmande beaucoup de resource a etre calculée, n\'en abusée pas ! • ' + (new Date() - dateStart).toString() + 'ms' });
	channel.send({
		embeds: [embed],
		components: CreateButon(user)
	});
}

async function onResponseLimit(devise, coingecko, user, channel, dateStart) {
	if (user.search(user.walet, devise) == -1) {
		channel.send('vous ne posedez pas/plus de ' + devise);
	}
	const price = coingecko.add(['priceUsd ', devise]);
	const embed = new MessageEmbed();
	embed.setTitle('choisir des limitation')
		.setDescription('ici vous allez pouvoir selectionnée des prix a partir des quelle vos ' + devise + ' seront vendus automatiquement ! le prix actuelle et 1' + devise + '=' + await price)
		.setFooter({ text: 'ces action demmande beaucoup de resource a etre calculée, n\'en abusée pas ! • ' + (new Date() - dateStart).toString() + 'ms' })
		.addField('sell stop', 'permet de configurer une limite a laquelle sera vendus vos  ' + devise + '  si leur prix est **inferieur** a cette limite')
		.addField('sell limit', 'permet de configurer une limite a laquelle sera vendus vos  ' + devise + '  si leur prix est **superieur** a cette limite');
	const row = new MessageActionRow()
		.addComponents(new MessageButton()
			.setCustomId('stopSell_' + devise)
			.setLabel('configurer un stop sell')
			.setStyle('PRIMARY'))
		.addComponents(new MessageButton()
			.setCustomId('limitSell_' + devise)
			.setLabel('configurer un limit sell')
			.setStyle('PRIMARY'))
		.addComponents(
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
module.exports = { sellStop, sellLimit, interfaceLimitSell, onResponseLimit };