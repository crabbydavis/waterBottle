$(document).ready(function(){
  $("#postGlucose").click(function(){
    var myobj = {Amount:$("#glucoseAmount").val()};
    jobj = JSON.stringify(myobj);
    $("#json").text(jobj);
    var url = "glucoseAmount";
    $.ajax({
      url:url,
      type:"POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
        $("#done").html(textStatus);
      }
    })
  });
  $("#getGlucose").click(function() {
    console.log("Going to try and get data");
    $.getJSON('glucoseAmount', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var glucose in data) {
        gluc = data[glucose];
        everything += "<li>Glucose Amount: " + gluc.Amount + "g</li>";
      }
      everything += "</ul>";
      $("#glucose").html(everything);
    })
  });
  $("#deleteGlucose").click(function() {
    var url = "glucoseAmount";
    $.ajax({
    url:url,
    type:"DELETE",
    success: function(result) {
      }
    })
  });
});
