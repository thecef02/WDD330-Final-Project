



const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5c80726bacmsha4026533a6e64d3p14eef0jsn0eb1adbcc357',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

fetch('https://hotels4.p.rapidapi.com/v2/get-meta-data', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
