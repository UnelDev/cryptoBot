const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

async function sell(name, user, coingecko, clientDiscord) {
	await user.sellAll(name, coingecko, clientDiscord);
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
		return;
	}
	const price = coingecko.add(['priceUsd', devise]);
	const embed = new MessageEmbed();
	embed.setTitle('choisir des limitation')
		.setDescription('ici vous allez pouvoir selectionnée des prix a partir des quelle vos ' + devise + ' seront vendus automatiquement ! le prix actuelle et 1' + devise + '=' + await price + '$')
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

async function onResponseStopSell(devise, user, channel, coingecko) {
	if (user.search(user.walet, devise) == -1) {
		channel.send('vous ne posedez pas/plus de ' + devise);
		return;
	}
	const price = coingecko.add(['priceUsd', devise]);
	const embed = new MessageEmbed()
		.setTitle('vous allez definir un stop sell sur ' + devise)
		.setDescription('veiller rentrer une limite en $ a partir de laquelle tout vos ' + devise + ' seron vendu')
		.addField('prix', '1' + devise + '=' + await price + '$');
	const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('cancel')
				.setLabel('annuler l\'achat')
				.setStyle('DANGER')
		);
	user.watingMp = 'stopSell_' + devise;
	channel.send({
		embeds: [embed],
		components: [row]
	});
}

async function onResponsePriceStopSell(devise, number, user, channel) {
	if (user.search(user.walet, devise) == -1) {
		channel.send('vous ne posedez pas/plus de ' + devise);
		return;
	}
	user.limitSell.push([devise, number]);
	channel.send('le limite sell du ' + devise + ' a été fixée a ' + number + '$');
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

// auto verif
/*
I have found a slightly different way implement pointers that is perhaps more general and easier to understand from a C perspective (and thus fits more into the format of the users example).

In JavaScript, like in C, array variables are actually just pointers to the array, so you can use an array as exactly the same as declaring a pointer. This way, all pointers in your code can be used the same way, despite what you named the variable in the original object.

It also allows one to use two different notations referring to the address of the pointer and what is at the address of the pointer.
https://stackoverflow.com/questions/10231868/pointers-in-javascript  awnser 14
*/
// eslint-disable-next-line no-inline-comments
async function sellStop(coingecko, _userListe/* is a array [userlist]*/, clientDiscord) {

	const listDeviseWatch = [];
	const listDevisePrice = new Map();
	let sleep = _userListe[0].map(user => {
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
	sleep = _userListe[0].map(user => {
		if (user.limitSell != []) {
			user.limitSell.forEach(async element => {
				if (listDevisePrice.get(element[0]) <= element[1]) {
					console.log(listDevisePrice.get(element[0]), '<=', element[1]);
					await sell(element[0], user, coingecko, clientDiscord);
				}
			});
		}
	});
	delay(1000).then(() => sellStop(coingecko, _userListe, clientDiscord));
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

function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}
module.exports = { sellStop, sellLimit, interfaceLimitSell, onResponseLimit, onResponseStopSell, onResponsePriceStopSell };