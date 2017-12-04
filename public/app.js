$.getJSON("/articles", function(data){
	data.forEach(function(data){
		$("#articles").append("<p> data-id='"+data._id+"'>"+data.title"<br />"+data.link"</p>");
	})
});