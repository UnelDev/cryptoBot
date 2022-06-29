const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

function helpMenu(channel) {
	const embed = new MessageEmbed;
	embed.setTitle('aide')
		.setDescription('PCT est un bot qui permet d\'investire de facon factice dans la crypto !\npour plus dinformation cliquer sur les bouton suivant');
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('help_legal')
			.setLabel('legal')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_cmd')
			.setLabel('commande')
			.setStyle('PRIMARY')
	);
	channel.send({
		embeds: [embed],
		components: [row]
	});
}
function helpMenuEdit(editable) {
	const embed = new MessageEmbed;
	embed.setTitle('aide')
		.setDescription('PCT est un bot qui permet d\'investire de facon factice dans la crypto !\npour plus dinformation cliquer sur les bouton suivant');
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('help_legal')
			.setLabel('legal')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_cmd')
			.setLabel('commande')
			.setStyle('PRIMARY')
	);
	editable.edit({
		embeds: [embed],
		components: [row]
	});
}

function helpInteractionRepleay(message, editable) {
	if (message == '') {
		helpMenuEdit(editable);
	} else if (message == 'legal') {
		legal(editable);
	} else if (message == 'cmd') {
		command(editable);
	}

}

function legal(editable) {
	const embed = new MessageEmbed;
	embed.setTitle('information legal')
		.setDescription('PCT est un bot qui permet d\'investire de facon factice dans la crypto !\n')
		.setTimestamp()
		.addField('je sui mineur est ce que j\'ai le droit d\'utiliser PCT ?', 'Oui. Vous le pouvez, vous le pouvez autant que vous pouvez faire une tombola, c\'est l\'article L322-4')
		.addField('est ce que je peut acheter des vrais crypto a partir de PCT ?', 'Non, PCT est uniquement un miroir des crypto il n\'a pas pour vocation de vous incitée a acheter des crypto est ne vous le permet donc pas');
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('help_')
			.setLabel('menu d\'aide')
			.setStyle('PRIMARY')
	);
	editable.edit({
		embeds: [embed],
		components: [row]
	});
}

function command(editable) {
	const embed = new MessageEmbed;
	embed.setTitle('aide sur les commande')
		.setDescription('voici une desccription des diferante commande toute les commande doive etre precédée du prefix')
		.addField('info {paramètre (id)}', 'permet d\'optenire des information sur le parametre lest information peuve etre : le nom, une courbe de son evolution sur 24h, son id (utiliser dans les command), son symbole (eur ou BTC) par exemple, et ses diverante evolution de prix a plusieur echelle de temps. apres ca il vous sera proposée dans acheter ou d\'en revendre')
		.addField('search {paramètre}', 'permet de rechercher le parametre parmis toute les crypto et action disponible ! il vous sera proposer de voir les info sur les 10 premier resultat')
		.addField('create', 'permet de crée un compte dans le bot, ce compte vous permetera de d\'acheter et de revendre des crypto')
		.addField('presentation ou p', 'presente l\'etat du marchée avec plusieur crypto tel que: bitcoin, ethereum, binancecoin, iShares MSCI World ETF Tokenized Stock Defichain')
		.addField('walet', 'afice les information sur votre walet, peut aussi si cella est pertinant tracée une courbe')
		.addField('help', 'afiche cette aide');
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('help_')
			.setLabel('menu d\'aide')
			.setStyle('PRIMARY')
	);
	editable.edit({
		embeds: [embed],
		components: [row]
	});
}

function tips(editable) {
	const embed = new MessageEmbed;
	embed.setTitle('quelque tips !')
		.setDescription('je vais vous aprendre ici quelque tips sur les crypto est sur moi PCT')
		.addField('courbe', 'l\'or ce que vous faite la commande p ou prensentation une courbe de la monai s\'afiche, elle est calculer sur 24h. soi vous voulez en voir plus allez sur google ou sur des site de crypto tel que coinmarketcap ou d\'autre.');
}
module.exports = { helpMenu, helpInteractionRepleay };