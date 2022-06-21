const { MessageEmbed } = require('discord.js');
class user {
	constructor(id, tag) {
		this.id = id;
		this.tag = tag;
		this.cash = 1000;
		this.walet = [['bitcoin', 1000]];
		// this.history = [date, [name,quatity]]
		this.history = [['bitcon', 1], new Date];
	}

	async toPresent(CoinGecko, channel) {
		console.log(this.walet);
		const embed = new MessageEmbed();
		embed.setTitle('presentation du compte de #' + this.tag);
		embed.setFooter({ text: 'ces donnée peuvent être incorrecte' });
		embed.addField('cash', this.cash.toString());
		for (let i = 0; i < this.walet.length; i++) {
			console.log(i);
			let price = await CoinGecko.add(['priceUsd', this.walet[i][0]]);
			// usd , 1*1000 + '$'
			price = price * this.walet[i][1];
			embed.addField(this.walet[i][0], price.toString() + '$');
		}
		console.log(CoinGecko);
		channel.send({ embeds: [embed] });
	}

	async buy(CoinGecko, channel, name, quantity) {
		const price = await CoinGecko.add(['priceUsd', name]);
		const total = price * quantity;
		if (this.cash < total) {
			channel.send('vous n\'avez pas ' + total + '$');
			return (false);
		} else {
			this.cash -= total;
			this.walet.push([name, quantity]);
			this.history.push([new Date, this.walet]);
			this.toPresent(CoinGecko, channel);
		}
	}

	async sell(CoinGecko, channel, name, quantity) {
		const price = await CoinGecko.add(['priceUsd', name]);
		const total = price * quantity;
		if (this.walet[name] < quantity) {
			channel.send('vous n\'avez pas ' + quantity + ' ' + name);
			return (false);
		} else {
			this.cash += total;
			this.walet.splice(name, quantity);
			this.history.push([new Date, this.walet]);
			this.toPresent(CoinGecko, channel);

		}
	}

}
module.exports = user;