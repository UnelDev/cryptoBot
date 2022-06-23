const { Client, Intents } = require('discord.js');
require('dotenv').config({ path: __dirname + '/.env' });

// create new instance of crypto client
const NcoingeckoApi = require('./nCoingeko-api/coingecko-api.js');
const NcoingeckoApiClient = new NcoingeckoApi();

// include all discord Bot commands
const marketPresntation = require('./discordBot/marketPresentation.js');
const information = require('./discordBot/information.js');
const idToName = require('./tools/convert/IdTo/idToName.js');
const user = require('./discordBot/user/user.js');
const presnentWalet = require('./discordBot/user/presentWalet.js');

const userListe = new Array();

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

const fs = require('fs');
const path = require('path');


// This variable is changed by me every time I want to change test bot
const isPublic = false;

let token;

// Tihs is a minimal system to help me test the bot, just switching between dev token and public token
if (isPublic) {
	token = process.env.PUBLIC_TOKEN;
} else {
	token = process.env.DEV_TOKEN;
}

// Regularly in the program, I will log actions in the channel which has the identifier in this variable.
const LoggingChannel = process.env.LOGGING_CHANNEL;


// The default prefix is !
const defaultPrefix = '!';
let Prefix = defaultPrefix;


client.once('ready', () => {
	console.log('Connected as ' + client.user.tag);
});

client.on('interactionCreate', async interaction => {
	// This part is for buttons interactions
	if (interaction.isButton()) {
		let buttonName = interaction.customId;
		client.channels.fetch(LoggingChannel).then(Channel => Channel.send('[BUTTON] \'' + interaction.customId + '\' from: ' + interaction.user.tag));
		if (buttonName.startsWith('help')) {
			// helpButton(interaction, defaultPrefix);
		} else if (buttonName.startsWith('search_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('search_', '');
			const coinName = await idToName(buttonName, NcoingeckoApiClient);
			// coin name is a array
			information(interaction.channel, coinName[0], NcoingeckoApiClient);

		} else if (buttonName.startsWith('visualize_')) {
			interaction.deferUpdate();
			buttonName = buttonName.replace('visualize_', '');
			information(interaction.channel, buttonName, NcoingeckoApiClient);
		}
	}
});

client.on('messageCreate', message => {
	// This part is for commands
	// This first line is for getting the prefix of the server and if it's not defined, we use the default prefix
	if (fs.existsSync(path.resolve('./prefix/' + message.guildId + '.json'))) {
		Prefix = JSON.parse(fs.readFileSync(path.resolve('./prefix/' + message.guildId + '.json')));
	} else {
		Prefix = defaultPrefix;
	}
	if (!message.content.startsWith(Prefix)) { return; }
	// Checking if the message is from a bot
	if (message.author.bot) { return; }
	let command = message.content.replace(Prefix, '').toLowerCase();
	client.channels.fetch(LoggingChannel).then(Channel => Channel.send('[COMMAND] \'' + message.content + '\' from: ' + message.author.tag));

	if (command.startsWith('presentation') || command.startsWith('presnetation du marché') || command.startsWith('p')) {
		marketPresntation(message, NcoingeckoApiClient);
	} else if (command.startsWith('information') || command.startsWith('info') || command.startsWith('search')) {
		command = command.replace('information', '');
		command = command.replace('info', '');
		command = command.replace('search', '');
		command = command.split(' ').pop();
		information(message.channel, command, NcoingeckoApiClient);
	} else if (command.startsWith('create')) {
		const Nuser = new user(message.author.id, message.author.tag);
		userListe.push(Nuser);
		presnentWalet(Nuser, NcoingeckoApi);
		Nuser.buy(NcoingeckoApiClient, message.channel, 'bitcoin', 1);
		presnentWalet(Nuser, NcoingeckoApi);

	}

	return;

});


module.exports = {
	/**
	  *
	  * @param {Client} client
	  */
};


client.login(token);