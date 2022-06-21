const { MessageEmbed } = require('discord.js');
class user {
	constructor(id, tag) {
		this.id = id;
		this.tag = tag;
		this.cash = 1000;
		this.walet = [['bitcoin', 1000]];
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
}
module.exports = user;