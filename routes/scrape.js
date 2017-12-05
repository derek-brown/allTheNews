var request = require("request");
var cheerio = require("cheerio");
var db = require("../models");
var axios = require("axios");

var title, link, summary;
var url = "https://www.nytimes.com/section/technology?action=click&pgtype=Homepage&region=TopBar&module=HPMiniNav&contentCollection=Tech&WT.nav=page";

module.exports = function(app){
	app.get("/scrape", function(req, res){

		axios.get(url).then(function(response){
			var $ = cheerio.load(response.data);
				$("a.story-link").each(function(i, elm){

				var result = {};

				result.link = $(this).attr("href");
				result.title = $(this).children(".story-meta").children("h2.headline").text();

				console.log(result);

				db.Article
					.create(result)
					.then(function(dbArticle){
						res.send("Scrape Complete");
					})
					.catch(function(err){
						res.json(err);
					});
				});
		});
	});

	app.get("/articles", function(req, res){
		db.Article
			.find({})
			.then(function(dbArticle){
				res.json(dbArticle);
			})
			.catch(function(err){
				res.json(err);
			});
	});

	app.get("/articles/:id", function(req, res) {
  
    db.Article
    .findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
	});
};