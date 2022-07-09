const fs = require('fs');
async function logs(message) {
	// Regularly in the program, I will log actions in the channel which has the identifier in this variable.
	const time = new Date();
	message = time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear() + ' ' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + ':' + time.getMilliseconds() + '	' + message;
	if (typeof process.client != 'undefined' && process.isPublic) {
		sendToServer(message);
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
	}

	console.log(message);
}
async function sendToServer(message) {
	const LoggingChannel = process.env.LOGGING_CHANNEL;
	process.client.channels.fetch(LoggingChannel).then(Channel => Channel.send(message));
}
module.exports = logs;