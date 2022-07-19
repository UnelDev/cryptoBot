const { MessageActionRow, MessageButton } = require('discord.js');

function verifyExist(userliste, id) {
	let exist = false;
	userliste.forEach(element => {
		if (id == element.id) {
			exist = true;
		}
	});
	return exist;
}
async function verifyExistReturnUser(userliste, id, channel) {
	let user;
	const sleep = userliste.map(element => {
		if (id == element.id) {
			user = element;
		}
	});
	await Promise.all(sleep);
	if (user) { return user; }

	const row = new MessageActionRow();
	row.addComponents(
		new MessageButton()
			.setCustomId('createAcount')
			.setLabel('crée un compte !')
			.setStyle('PRIMARY')
	);
	channel.send({
		content: 'vous n\'avez pas crée de compte',
		components: [row]
	});
	return;
}
module.exports = { verifyExist, verifyExistReturnUser };