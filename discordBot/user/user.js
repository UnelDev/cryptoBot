const { MessageEmbed } = require('discord.js');
const path = require('path');
const { buyOnResponse } = require('./gestion/buy.js');
const { sellOnResponse } = require('./gestion/sell.js');
const presentWalet = require('./presentWalet.js');
class user {
	constructor(id, tag) {
		this.id = id;
		this.tag = tag;
		this.cash = 1000;
		this.walet = [];
		this.history = [[new Date, JSON.parse(JSON.stringify(this)).walet]];
		this.watingMp = '';
	}

	async toPresent(CoinGecko, channel) {
		const embed = new MessageEmbed();
		embed.setTitle('presentation du compte de @' + this.tag);
		embed.setFooter({ text: 'ces donnée peuvent être incorrecte' });
		embed.addField('cash', this.cash.toString());
		for (let i = 0; i < this.walet.length; i++) {
			if (Number(this.walet[i][1]) != 0) {
				let price = await CoinGecko.add(['priceUsd', this.walet[i][0]]);
				// usd , 1*1000 + '$'
				price = price * Number(this.walet[i][1]);
				embed.addField(this.walet[i][0], Number(this.walet[i][1]) + ' ' + this.walet[i][0] + ' ≈ ' + price.toString() + '$');
			}
		}
		if (this.history.length > 1) {
			channel.send({
				embeds: [embed],
				files: [{
					attachment: path.resolve(await presentWalet(this)),
					name: 'image.png'
				}]
			});
		} else {
			channel.send({ embeds: [embed] });
		}
	}

	async buy(CoinGecko, channel, name, quantity) {
		const price = await CoinGecko.add(['priceUsd', name]);
		const total = price * quantity;
		if (this.cash < total) {
			channel.send('vous n\'avez pas ' + total + '$');
			return false;
		} else {
			this.cash -= total;

			const index = search(this.walet, name);
			if (index != -1) {
				this.walet[index][1] = Number(this.walet[index][1]) + Number(Math.round(quantity * 1000) / 1000);
			} else {
				this.walet.push([name, quantity]);
			}
			this.history.push([new Date, JSON.parse(JSON.stringify(this)).walet]);
			this.toPresent(CoinGecko, channel);
			return true;
		}
	}

	async sell(CoinGecko, channel, name, quantity) {
		console.log(quantity);
		const price = await CoinGecko.add(['priceUsd', name]);
		let total = quantity * price;
		total *= 1000;
		total = Math.trunc(total);
		total /= 1000;
		if (this.walet[name] < quantity) {
			channel.send('vous n\'avez pas ' + quantity + ' ' + name);
			return false;
		} else {
			this.cash += total;
			const index = search(this.walet, name);
			if (index == -1) {
				console.log('error in remove money');
				return false;
			}
			this.walet[index][1] = Number(this.walet[index][1]) - Number(Math.round(quantity * 1000) / 1000);
			this.history.push([new Date, JSON.parse(JSON.stringify(this)).walet]);
			this.toPresent(CoinGecko, channel);
			return true;

		}
	}
	async responseMp(response, channel, coingecko) {
		if (this.watingMp.startsWith('priceFor_')) {
			this.watingMp.replace('priceFor_', '');
			buyOnResponse(response, this.watingMp, channel, coingecko);
			this.watingMp = '';
		} else if (this.watingMp.startsWith('sellNumber_')) {
			this.watingMp = this.watingMp.replace('sellNumber_', '');
			sellOnResponse(response, this.watingMp, channel, coingecko);
			this.watingMp = '';
		}
	}
}

function search(array, comparing) {
	let result = -1;
	for (let i = 0, len = array.length; i < len; i++) {
		if (array[i][0] === comparing) {
			result = i;
			break;
		}
	}
	return result;
}
module.exports = user;

/*
JSON.parse(JSON.stringify(this)).walet
permet de copier l'object this sinon il fait des pointeur */