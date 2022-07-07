const { MessageEmbed } = require('discord.js');

async function exchange(devise, coingecko) {

	const embed = new MessageEmbed();
	embed.setTimestamp();
	embed.setTitle('vous voulez echanger du ' + devise);
	embed.setDescription('il n\'est pas possible d\'ecahner du ' + devise + ' contre nimporte quelle autre devise');
	const targetList = [];
	const tickersList = await coingecko.add(['exchangesTickers', devise, 'binance']);
	console.log(tickersList.tickers);
	const sleep = tickersList.tickers.map(element => {
		if (typeof element.target_coin_id != 'undefined') {
			targetList.push(element.target_coin_id);
		}

	});
	await Promise.all(sleep);
	console.log(targetList);

}
module.exports = exchange;