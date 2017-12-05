$.getJSON("/articles", function(data){
	console.log("working");
	data.forEach(function(data){
		$("#articles").append("<p data-id='" + data._id + "'>" + data.title + "<br />" + data.link + "</p>");
	});
});

$(document).on("click", "p", function(){
	$("#notes").empty();
	var thisId = $(this).attr("data-id");

	console.log(thisId);

	$.get("/articles/" + thisId, function(data){
		console.log(data);
		$("#notes").append("<h2>" + data.title + "</h2>");
	});
});