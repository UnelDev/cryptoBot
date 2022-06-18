async function search(find, client) {
	let result = await client.add(['search', find]);
	console.log(result);
	// we need 10 first results
	if (result.length > 10) {
		result = result.slice(0, 10);
	}
	return result;


}
module.exports = search;