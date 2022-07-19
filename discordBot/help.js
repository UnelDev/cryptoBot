const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

function helpMenu(channel) {
	const embed = new MessageEmbed();
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
			.setCustomId('help_global')
			.setLabel('vos debut')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_cmd')
			.setLabel('commande')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_tips')
			.setLabel('tips')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_taxes')
			.setLabel('taxes')
			.setStyle('PRIMARY')
	);
	const row2 = new MessageActionRow();
	row2.addComponents(
		new MessageButton()
			.setCustomId('help_limitStopSell')
			.setLabel('aide sur les limite et srop sell')
			.setStyle('PRIMARY')
	);
	channel.send({
		embeds: [embed],
		components: [row, row2]
	});
}
function helpMenuEdit(editable) {
	const embed = new MessageEmbed();
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
			.setCustomId('help_global')
			.setLabel('vos debut')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_cmd')
			.setLabel('commande')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_tips')
			.setLabel('tips')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setCustomId('help_taxes')
			.setLabel('taxes')
			.setStyle('PRIMARY')
	);
	const row2 = new MessageActionRow();
	row2.addComponents(
		new MessageButton()
			.setCustomId('help_limitStopSell')
			.setLabel('aide sur les limite et srop sell')
			.setStyle('PRIMARY')
	);
	editable.edit({
		embeds: [embed],
		components: [row, row2]
	});
}

function helpInteractionRepleay(message, editable) {
	if (message == '') {
		helpMenuEdit(editable);
	} else if (message == 'legal') {
		legal(editable);
	} else if (message == 'cmd') {
		command(editable);
	} else if (message == 'tips') {
		tips(editable);
	} else if (message == 'taxes') {
		taxes(editable);
	} else if (message == 'global') {
		global(editable);
	} else if (message == 'limitStopSell') {
		limitStopSell(editable);
	}

}

function legal(editable) {
	const embed = new MessageEmbed();
	embed.setTitle('information legal')
		.setDescription('PCT est un bot qui permet d\'investire de facon factice dans la crypto !\n')
		.setTimestamp()
		.addField('je sui mineur est ce que j\'ai le droit d\'utiliser PCT ?', 'Oui. Vous le pouvez, vous le pouvez autant que vous pouvez faire une tombola, c\'est l\'article L322-4')
		.addField('est ce que je peut acheter des vrais crypto a partir de PCT ?', 'Non, PCT est uniquement un miroir des crypto il n\'a pas pour vocation de vous incitée a acheter des crypto est ne vous le permet donc pas')
		.addField('credit', '	**développement** ce bot a été integralement crée et ecrit par @unel#1527 en cas de bug contacter moi\n 	**donnée** les donée sur les crypto vienne de CoinGecko et pour certaine comande de CoinGecko API (voir lien)');
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('help_')
			.setLabel('menu d\'aide')
			.setStyle('PRIMARY')
	);
	row.addComponents(
		new MessageButton()
			.setURL('https://github.com/miscavage/CoinGecko-API#-license')
			.setLabel('menu d\'aide')
			.setStyle('LINK')
	);
	editable.edit({
		embeds: [embed],
		components: [row]
	});
}

function command(editable) {
	const embed = new MessageEmbed();
	embed.setTitle('aide sur les commande')
		.setDescription('voici une desccription des diferante commande toute les commande doive etre precédée du prefix')
		.addField('info {paramètre (id)}', 'permet d\'optenire des information sur le parametre lest information peuve etre : le nom, une courbe de son evolution sur 24h, son id (utiliser dans les command), son symbole (eur ou BTC) par exemple, et ses diverante evolution de prix a plusieur echelle de temps. apres ca il vous sera proposée dans acheter ou d\'en revendre')
		.addField('search {paramètre}', 'permet de rechercher le parametre parmis toute les crypto et action disponible ! il vous sera proposer de voir les info sur les 10 premier resultat')
		.addField('create', 'permet de crée un compte dans le bot, ce compte vous permetera de d\'acheter et de revendre des crypto')
		.addField('presentation ou p', 'presente l\'etat du marchée avec plusieur crypto tel que: bitcoin, ethereum, binancecoin, iShares MSCI World ETF Tokenized Stock Defichain')
		.addField('walet', 'afice les information sur votre walet, peut aussi si cella est pertinant tracée une courbe')
		.addField('help', 'afiche cette aide')
		.addField('limit', 'permet de crée des limit et des stop sell vour la rubrique corespondante')
		.addField('ping', 'permet d\'aficher des statistique sur le reseaux cette commande affiche la latence client serveur, et la latence serveur discord. dans cette commande vous afiche aussi la latance de l\'api (la ou je recuperer mes donée) elle afiche aussi le temps de traitement de la demande dans le serveur')
		.addField('supr limit', ' permet de suprimée des limitation (limit sell et stop sell)');

	editable.edit({
		embeds: [embed],
		components: createRow()
	});
}

function tips(editable) {
	const embed = new MessageEmbed();
	embed.setTitle('quelque tips !')
		.setDescription('je vais vous aprendre ici quelque tips sur les crypto est sur moi PCT')
		.addField('courbe', 'lors ce que vous faite la commande p ou prensentation une courbe de la monnaie s\'afiche, elle est calculer sur 24h. si vous voulez en voir plus vous pouvez cliquer sur graphique autre periode');

	editable.edit({
		embeds: [embed],
		components: createRow()
	});
}

function taxes(editable) {
	const embed = new MessageEmbed;
	embed.setTitle('Aide sur les taxe')
		.setDescription('Comme dans la vrais vie chaque virement est soumis à une taxe. Dans pct il y a donc plusieurs type de taxe')
		.addField('Taxe d\'achat ', '2% elle s\'applique lors ce que vous cliquer sur un bouton acheter.')
		.addField('Taxe d\'échange ou spread', 'n\'est jamais dévoilé dans la vrais vie. C\'est le fait de gonfler artificiellement le prix d\'une monnaie. Dans PCT il est affiché et il s\'applique que lors des échanges')
		.addField('utilitée', 'on pourais ce demandée pourquoi des taxes doive etre aplquée ! les taxes dan la vrais vie serve a payer les platforme ! PCT se veut le plus realiste posible c\'est pourquoi elle existe ici aussi, elle serve aussi a finacée les efet levier mais chut ca arive bientôt');

	editable.edit({
		embeds: [embed],
		components: createRow()
	});
}

function global(editable) {
	const embed = new MessageEmbed();
	embed.setTitle('Aide global')
		.setDescription('ici je vais vous espliquée comment je fonctionne !')
		.addField('vos debut', 'au debut PCT vous donne 1000$ (oui c\'est becoups) apres vous pouvez faire ce que vous voulée avec ! le but de ce je d\'avoir la plus haute capitalisation !')
		.addField('la suite', 'bon c\'est bien beaux de dire qu\'il faut gagner de l\'argent mais comment ?')
		.addField('comment gagner de l\'argent ?', 'pour gagner de l\'argent il faut trouver une crypto qui va beaucoups monter pour cella les courbe vont etre utile. Vous investiser donc une partie de votre argent dedans.Les taxes vont etre prise (voir aide sur es taxes) il faut donc que la crypto monte assez pour pouvoir remboursée et votre investisemment et les taxes !');
	editable.edit({
		embeds: [embed],
		components: createRow()
	});
}

function limitStopSell(editable) {
	const embed = new MessageEmbed();
	embed.setTitle('aide sur les limit sell et les stop sell')
		.setFooter({ text: 'ces action demmande beaucoup de resource a etre calculée, n\'en abusée pas ! ' })
		.setField('utilité', 'les limite est les stop sell sont utile pour des personne un peut experimentée. c\'est un moyen de vendre automatiquemment vos crypto lors ce qu\'elle arrive a un certain prix')
		.addField('sell stop', 'permet de configurer une limite a laquelle sera vendus vos crypto si leur prix est **inferieur** a cette limite')
		.addField('limit sell ', 'permet de configurer une limite a laquelle sera vendus vos crypto si leur prix est **superieur** a cette limite')
		.addField('exemple limit sell', 'j\'achete 1 bitcoin a 20 000$ je configure un limit sell a 19 000$ lors ce que le prix du bitcoin passe a 18 999$ il sera vendu en totalitée automatiquement par le bot')
		.addField('exemple stop sell', 'j\'achete 1 bitcoin a 20 000$ je configure un stop sell a 21 000$ lors ce que le prix du bitcoin passe a 21 000,00...1$ il sera vendu en totalitée automatiquement par le bot')
		.addField('limitation', 'bon pour ne pas se mentir les stop et limit sell sont tres gourment en requete, je suis limitée a 50 requete minite et chaque limit et stop sell sont verifier toute les deux minute il demande donc une requete pour chaque limite ou stop sell. \n donc svp ne configurer pas 200 limite/stop sell sinon je devrais les limitée !')
		.addField('precaussion', 'atention l\'or de la vente le bot va aissayer de vous prevenir toutefois discord peut refusée si ca fait trop longtemps que vous avez envoyer un message au bot ! il faut donc que vous verifier que les limite ne se sont pas activée')
		.addField('commande', 'vous pouvez les activée en tapant limit');
	editable.edit({
		embeds: [embed],
		components: createRow()
	});
}
function createRow() {
	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('help_')
			.setLabel('menu d\'aide')
			.setStyle('PRIMARY')
	);
	return [row];
}
module.exports = { helpMenu, helpInteractionRepleay };