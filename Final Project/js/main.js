



const options = {
	method: 'GET',
	headers: {
		//'X-RapidAPI-Key': '5c80726bacmsha4026533a6e64d3p14eef0jsn0eb1adbcc357',
        //'X-RapidAPI-Key': '6931d989ffmsh118bed85a85a6c4p176f43jsn2b460f96d581',
        'X-RapidAPI-Key': '04f2322d57msh40214398878f730p1baf7bjsnba45fd962457',

		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

fetch('https://hotels4.p.rapidapi.com/locations/v3/search?q=new%20york&locale=en_US&langid=1033&siteid=300000001', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
