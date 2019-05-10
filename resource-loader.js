var ys = require('youtube-search');
var opts = {
	maxResults: 10,
	key: 'AIzaSyDHTuBJeubsoh8-cjVQEcGrZ9UOV_1uS5Y'
}

var search = function (keyword, limit, page_token) {
	return new Promise(function (resolve, reject) {
		opts.maxResults = limit;
		if(page_token) {
			opts.pageToken = page_token;
		}
		ys(keyword, opts, function (err, results, page_info) {
			if(err) {
				reject(err);
			} else {
				resolve({
					results: results,
					page_info: page_info
				});
			}
		});
	});
}

window.searchFromYoutube = search;
