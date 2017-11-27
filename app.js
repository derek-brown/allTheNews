var request = require("request");
var cheerio = require("cheerio");

var urls = [];

request("http://www.reddit.com/", function(err, res, body){
	if(!err && res.statusCode == 200){
		var $ = cheerio.load(body);
		$("a.title", "#siteTable").each(function(){
			var url = $(this).attr("href");
			if(url.indexOf("i.imgur.com")!=-1){
			urls.push(url);
			}
		});
		console.log(urls);
	}
});