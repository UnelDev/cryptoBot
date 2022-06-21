const { MessageEmbed } = require('discord.js');
class user {
	constructor(id, tag) {
		this.id = id;
		this.tag = tag;
		this.walet = [['usd-coin', 1000], ['bitcoin', 1000]];
	}
	async toPresent(CoinGecko, channel) {
		console.log(this.walet);
		const embed = new MessageEmbed();
		embed.setTitle('presentation du compte de #' + this.tag);
		embed.setFooter({ text: 'ces donnée peuvent être incorrecte' });

		for (let i = 0; i < this.walet.length; i++) {
			console.log(i);
			let price = await CoinGecko.add(['priceUsd', this.walet[i][0]]);
			// usd , 1*1000 + '$'
			price = price * this.walet[i][1];
			console.log('price of ' + this.walet[i][0] + ' is ' + price);
			embed.addField(this.walet[i][0], price.toString() + '$');
		}
		console.log(CoinGecko);
		channel.send({ embeds: [embed] });
	}
}
module.exports = user;