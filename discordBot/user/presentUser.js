const { MessageActionRow, MessageButton } = require('discord.js');
const { serachTag, searchIndexToId } = require('./gestion/search.js');

function presentUser(userListe, message, coingecko, Prefix) {
	let text = message.content.replace(Prefix, '');
	text = text.replace('trader', '');
	text = text.replace('user', '');
	text = text.replace('walet', '');
	text = text.replace(' ', '');
	text = text.replace('@', '');
	text = text.replace('<', '');
	text = text.replace('>', '');
	let index = -1;
	if (text == '') {
		index = serachTag(userListe, message.author.tag);
		if (index == -1) {
			const row = new MessageActionRow();
			row.addComponents(
				new MessageButton()
					.setCustomId('createAcount')
					.setLabel('crée un compte !')
					.setStyle('PRIMARY')
			);
			message.channel.send({
				content: 'vous n\'avez pas crée de compte',
				components: [row]
			});
			return;
		}
	} else {
		// if user write @wumpus the message contain id of wumpus
		index = searchIndexToId(userListe, text);
		if (index == -1) {
			// but if user write @wumpus#0001 the messgage contain tag of wumpus
			index = serachTag(userListe, text);
			if (index == -1) {
				message.channel.send('client non trouvée parmi les id et les tag connu !');
				return;
			}
		}
	}
	userListe[index].toPresent(coingecko, message.channel);
}
exports.presentUser = presentUser;
