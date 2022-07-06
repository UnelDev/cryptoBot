const fs = require('fs');
let Client = '';
async function logs(message, client = '') {
	// Regularly in the program, I will log actions in the channel which has the identifier in this variable.
	if (client != '') {
		Client = client;
	}
	if (client != '') {
		sendToServer(message);
	}
	const dir = './logs';

	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}

	fs.appendFile('./logs/logs.log', message + ' \n', (err) => {
		if (err) {
			console.log(err);
			throw err;
		}
	});
	console.log(message);
}
async function sendToServer(message) {
	const LoggingChannel = process.env.LOGGING_CHANNEL;
	Client.channels.fetch(LoggingChannel).then(Channel => Channel.send(message));
}
module.exports = logs;