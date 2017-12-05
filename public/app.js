$(document).on("click", "#scrape", function(){
	$.get("/scrape", function(data){
		$.getJSON("/articles", function(data){
			for (var i = 0; i < 12; i++) {
    		$("#articles").append("<p>" + data[i].title + "<br />" + data[i].link + "</p>")
    		$("#articles").append("<button id='make-note' data-id='"+data[i]._id+"' class='btn btn-primary'>Make a Note!</button>");
  		}
		});
	});
});




$(document).on("click", "#make-note", function(){
	$("#notes").empty();
	var thisId = $(this).attr("data-id");

	$.get("/articles/" + thisId, function(data){
		$("#notes").append("<h2>" + data.title + "</h2>");
    $("#notes").append("<input id='titleinput' name='title' >");
    $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
    $("#notes").append("<button data-id='" + data._id + "'class='btn btn-primary' id='savenote'>Save Note</button>");
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
	});
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
});