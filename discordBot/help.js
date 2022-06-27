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
	editable.edit({
		embeds: [embed],
		components: [row]
	});
}

function helpInteractionRepleay(message, editable) {
	if (message == 'legal') {
		legal(editable);
	}
	if (message == '') {
		helpMenuEdit(editable);
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
module.exports = { helpMenu, helpInteractionRepleay };