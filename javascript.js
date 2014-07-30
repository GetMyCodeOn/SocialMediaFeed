$(document).ready(function() {
  // code for the twitter API challenge
$.ajax({
        url: "data.json",
        dataType: "json",

        success: function(data) {
          $.each(data.statuses, function () {
            $( "#tweets" ).append('<img src="' + this['img'] + '" >');
          });
        }});
});