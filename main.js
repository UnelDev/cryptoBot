const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
require('dotenv').config({ path: __dirname + '/.env' });

// create new instance of crypto client
const NcoingeckoApi = require('./nCoingeko-api/coingecko-api.js');
const NcoingeckoApiClient = new NcoingeckoApi();

// create new instance of bank
const { restoreBank } = require('./discordBot/bank/saveBank.js');
const bank = restoreBank();
// include all discord Bot commands
const marketPresntation = require('./discordBot/marketPresentation.js');
const information = require('./discordBot/information.js');
const idToName = require('./tools/convert/idTo/idToName.js');
const user = require('./discordBot/user/user.js');
const verifyExist = require('./discordBot/user/gestion/verifyExist');
const { buy } = require('./discordBot/user/gestion/buy');
const { serachid } = require('./discordBot/user/gestion/search.js');
const { sell } = require('./discordBot/user/gestion/sell.js');
const { helpInteractionRepleay, helpMenu } = require('./discordBot/help.js');
const fs = require('fs');
const path = require('path');
const { presentUser } = require('./discordBot/user/presentUser');
const { restore } = require('./discordBot/user/save.js');
const { moreTime, moreTimeReplay } = require('./discordBot/moreTime.js');
const ping = require('./tools/ping.js');
// Regularly in the program, I will log actions in the channel which has the identifier in this variable.
const log = require('./tools/log.js');
const { exchange, exchangeResponse } = require('./discordBot/user/gestion/exchange.js');
const presentBank = require('./discordBot/bank/present.js');
const { interfaceLimitSell, onResponseLimit, onResponseStopSell, sellStop, onResponseLimitSell, sellLimit } = require('./discordBot/bank/limitSell.js');
const logs = require('./tools/log.js');
const createButton = require('./tools/gestionBot/createButon.js');
const gestionLimitSell = require('./discordBot/user/gestion/gestionLimitSell.js');
const { prefix } = require('./tools/gestionBot/changePrefix.js');
const { saveChanel, stopSaveChanel } = require('./tools/gestionBot/sendMessage.js');

// resore userListe whith restor
const userListe = restore();


const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGES
	],
	partials: [
		'CHANNEL'
	]
});

// This variable is changed by me every time I want to change test bot
// if (IS_DEV === 'true') return true; else return false;
const isPublic = (process.env.IS_DEV === 'true');
process.isPublic = isPublic;
let token;

// Tihs is a minimal system to help me test the bot, just switching between dev token and public token
if (isPublic) {
	token = process.env.PUBLIC_TOKEN;
} else {
	token = process.env.DEV_TOKEN;
}


// The default prefix is !
const defaultPrefix = '.';
let Prefix = defaultPrefix;
client.once('ready', () => {
	process.client = client;
	log('Connected as ' + client.user.tag, client);
	sellStop(NcoingeckoApiClient, [userListe], client);
	sellLimit(NcoingeckoApiClient, [userListe], client);

});

client.on('interactionCreate', async interaction => {
	// This part is for buttons interactions
	if (interaction.isButton()) {
		let buttonName = interaction.customId;
		log('[BUTTON] \'' + interaction.customId + '\' from: ' + interaction.user.tag);
		if (buttonName.startsWith('search_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('search_', '');
			const coinName = await idToName(buttonName, NcoingeckoApiClient);
			// coin name is a array
			information(interaction.channel, coinName[0], NcoingeckoApiClient, isPublic, new Date());
		} else if (buttonName.startsWith('visualize_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('visualize_', '');
			information(interaction.channel, buttonName, NcoingeckoApiClient, isPublic, new Date());
		} else if (buttonName.startsWith('buy_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('buy_', '');
			buy(buttonName, interaction.channel, interaction.member, NcoingeckoApiClient, userListe, interaction.user.id);
		} else if (buttonName.startsWith('buyFinaly_')) {
			interaction.deferUpdate();
			const arrayResponse = buttonName.split('_');
			const byClient = serachid(userListe, interaction.user.id);
			byClient.buy(NcoingeckoApiClient, interaction.channel, arrayResponse[1], arrayResponse[2], arrayResponse[3], arrayResponse[4], bank);
		} else if (buttonName.startsWith('cancel')) {
			const Muser = serachid(userListe, interaction.user.id);
			if (Muser == -1) {
				Muser.watingMp = '';
			}
			interaction.deferUpdate();
			interaction.message.edit({ content: 'annulation bien prise en compte !', embeds: [], components: [] });
		} else if (buttonName.startsWith('sell_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('sell_', '');
			sell(buttonName, interaction.channel, interaction.member, NcoingeckoApiClient, userListe, interaction.user.id);
		} else if (buttonName.startsWith('sellNumber_')) {
			interaction.deferUpdate();
			const arrayResponse = buttonName.split('_');
			const byClient = serachid(userListe, interaction.user.id);
			byClient.sell(NcoingeckoApiClient, interaction.channel, arrayResponse[1], arrayResponse[2]);
		} else if (buttonName.startsWith('sellFinaly_')) {
			interaction.deferUpdate();
			const arrayResponse = buttonName.split('_');
			const byClient = serachid(userListe, interaction.user.id);
			byClient.sell(NcoingeckoApiClient, interaction.channel, arrayResponse[1], arrayResponse[2]);
		} else if (buttonName.startsWith('createAcount')) {
			interaction.deferUpdate();
			if (verifyExist(userListe, interaction.user.id) == true) {
				interaction.channel.send('desolée vous ne pouvez pas avoir plusieur compte');
				return;
			}
			const Nuser = new user(interaction.user.id, interaction.user.tag);
			userListe.push(Nuser);
			Nuser.toPresent(NcoingeckoApiClient, interaction.channel, new Date());
		} else if (buttonName.startsWith('help_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('help_', '');
			helpInteractionRepleay(buttonName, interaction.message);
		} else if (buttonName.startsWith('moreTime_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('moreTime_', '');
			moreTime(interaction.channel, buttonName);
		} else if (buttonName.startsWith('moreInformationChart_')) {
			interaction.deferUpdate();
			const response = buttonName.split('_');
			moreTimeReplay(interaction.channel, response[1], response[2], NcoingeckoApiClient);
		} else if (buttonName.startsWith('changeTo_')) {
			interaction.deferUpdate();
			const response = buttonName.split('_');
			exchangeResponse(response[1], response[2], response[3], interaction.user, NcoingeckoApiClient, new Date(), userListe);
		} else if (buttonName.startsWith('changeFinaly_')) {
			interaction.deferUpdate();
			const Muser = serachid(userListe, interaction.user.id);
			const response = buttonName.split('_');
			Muser.change(response[1], response[2], response[3], response[4], response[5], interaction.channel, NcoingeckoApiClient, bank);
		} else if (buttonName.startsWith('change_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('change_', '');
			exchange(buttonName, NcoingeckoApiClient, interaction.message, new Date());
		} else if (buttonName.startsWith('limit_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('limit_', '');
			const Muser = serachid(userListe, interaction.user.id);
			onResponseLimit(buttonName, NcoingeckoApiClient, Muser, interaction.channel, new Date());
		} else if (buttonName.startsWith('stopSell_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('stopSell_', '');
			const Muser = serachid(userListe, interaction.user.id);
			onResponseStopSell(buttonName, Muser, interaction.channel, NcoingeckoApiClient);
		} else if (buttonName.startsWith('limitSell_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('limitSell_', '');
			const Muser = serachid(userListe, interaction.user.id);
			onResponseLimitSell(buttonName, Muser, interaction.channel, NcoingeckoApiClient);
		}
	}
});

client.on('messageCreate', async message => {
	// This part is for commands
	// This first line is for getting the prefix of the server and if it's not defined, we use the default prefix

	if (fs.existsSync(path.resolve('./discordBot/prefix/' + message.guildId + '.json'))) {
		Prefix = JSON.parse(fs.readFileSync(path.resolve('./discordBot/prefix/' + message.guildId + '.json'))).prefix;
	} else {
		Prefix = defaultPrefix;
	}
	// Checking if the message is from a bot
	if (message.author.bot) { return; }

	if (message.channel.type == 'DM') {
		log('[dm] \'' + message.content + '\' from: ' + message.author.tag);
		const responseUser = serachid(userListe, message.author.id);
		responseUser.responseMp(message.content, message.channel, NcoingeckoApiClient);
		return;
	}

	if (!message.content.startsWith(Prefix)) { return; }
	let command = message.content.replace(Prefix, '').toLowerCase();
	log('[COMMAND] \'' + message.content + '\' from: ' + message.author.tag);

	if (command.startsWith('presentation') || command.startsWith('presnetation du marché') || command.startsWith('p') && command != 'ping' && !command.startsWith('prefix')) {
		marketPresntation(message, NcoingeckoApiClient);
	} else if (command.startsWith('information') || command.startsWith('info') || command.startsWith('search')) {
		command = command.replace('information', '');
		command = command.replace('info', '');
		command = command.replace('search', '');
		command = command.split(' ').pop();
		information(message.channel, command, NcoingeckoApiClient, isPublic, new Date());
	} else if (command.startsWith('create')) {
		if (verifyExist(userListe, message.author.id) == true) {
			message.channel.send('desolée vous ne pouvez pas avoir plusieur compte');
			return;
		}
		const Nuser = new user(message.author.id, message.author.tag);
		userListe.push(Nuser);
		Nuser.toPresent(NcoingeckoApiClient, message.channel, new Date());
	} else if (command.startsWith('help') || command.startsWith('aide')) {
		helpMenu(message.author);
	} else if (command.startsWith('trader') || command.startsWith('user') || command.startsWith('walet')) {
		presentUser(userListe, message, NcoingeckoApiClient, Prefix);
	} else if (command.startsWith('ping')) {
		ping(message.channel, NcoingeckoApiClient, new Date(), message.createdTimestamp, client.ws.ping);
	} else if (command.startsWith('bank') || command.startsWith('banque')) {
		presentBank(message.channel, bank, new Date);
	} else if (command.startsWith('limit sell') || command.startsWith('limitSell') || command.startsWith('sell limit') || command.startsWith('sellLimit') || command.startsWith('stop limit') || command.startsWith('stopLimit') || command.startsWith('limit')) {
		if (!verifyExist(userListe, message.author.id)) {
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
		const MUser = serachid(userListe, message.author.id);
		if (MUser == -1) {
			logs('error in limit');
			message.channel.send('une erreur est survenu');
		}
		interfaceLimitSell(message.author, MUser, new Date());
		message.channel.send('l\'outil de limitation vous a été envoyer en mp');
	} else if (command.startsWith('create button') || command.startsWith('createButton')) {
		command = command.replace('create button');
		command = command.replace('createButton');
		createButton(command, message.channel);
	} else if (command.startsWith('remove limite') || command.startsWith('remove limit') || command.startsWith('supr limite') || command.startsWith('supr limit')) {
		const Muser = await verifyExist.verifyExistReturnUser(userListe, message.author.id, message.channel);
		if (Muser) {
			gestionLimitSell(Muser, message.channel, new Date());
		}
	} else if (command.startsWith('prefix')) {
		prefix(message, Prefix, Prefix);
	} else if (command.startsWith('annonce')) {
		saveChanel(message);
	} else if (command.startsWith('stop annonce')) {
		stopSaveChanel(message);
	}
});
module.exports = {
	/**
	  *
	  * @param {Client} client
	  */
};


client.login(token);