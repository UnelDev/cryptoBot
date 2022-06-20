async function search(find, client) {
	const result = await client.add(['search', find]);
	// we need 10 first results
	let resultTest = [];
	result.forEach(element => {
		if (element.id) {
			resultTest.push(element);
		}
	});
	if (resultTest.length > 10) {
		resultTest = resultTest.slice(0, 10);
	}
	return resultTest;


}
module.exports = search;