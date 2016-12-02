//Notice on load - DO NOT REFRESH OR LOSE data
//alert("DO NOT RELOAD THIS PAGE!\r\rDoing so will cause LOSS OF STORED DATA!\r\r");

/*###########################################################################
TO DO:
Validate Team numbers don't duplicate
############################################################################*/

/*
Pre-Fish Setup Page:
Take the submitted entry and create an array with the information.
Loop through the array, updating the current list of teams
*/
var teamArray = [];

$("#addTeam").submit(function(event){

  //prevent the refresh of the page
    event.preventDefault();

//associate the inputs to an object
  var teamObject = {
    teamNumber: $("#teamNumber").val(),
    boater: $("#boaterName").val(),
    nonBoater: $("#nonBoaterName").val()
  };

//store the data in a growing object array
  teamArray.push(teamObject);

  //update the team listing at the bottom.
$(".fullTeamList").append("<div class='teamLine'><div class='teamNumber'>Team:<br>"+teamObject.teamNumber+"</div><div class='boaters'><div class='boater'>"+teamObject.boater+"</div><div class='boater'>"+teamObject.nonBoater+"</div></div></div>");

    //$(".teamNoCol").append("<div class='teamLines'>"+teamObject.teamNumber+"</div>");
    //$(".boaterCol").append("<div class='teamLines'>"+teamObject.boater+"</div>");
    //$(".nonBoaterCol").append("<div class='teamLines'>"+teamObject.nonBoater+"</div>");
    /* $(".totalWeight").append("<div class='teamLines'><input type='text' size='5px'></div>");
    $(".bigFish").append("<div class='teamLines'><input type='text' size='5px'></div>"); */

    //reset the fields blank
    $("#teamNumber").val("");
    $("#boaterName").val("");
    $("#nonBoaterName").val("");

});

//when finish button is clicked on the team entry page.
$(".finishedTeams").click(function(){
  var result;
  if(result = window.confirm("Are you sure you're finished?")){

    /*
    Build the Weigh In Page:

    The angelers names will show under the weight in a smaller font
    Fields: Team#, total weight, big fish (optional)
    */

//Replace Team building form with the new weigh in form
    $("#addTeam").replaceWith("<form id='weighIn'>\
    <div><label for 'teamNumber'>Team Number</label><br>\
    <input id='teamNumber' type='number' min='1' max='999' required></div>\
    <div><label for 'totalWeight'>Total Weight</label><br>\
    <input id='totalWeight' type='text' required></div>\
    <div><label for 'bigFish'>Big Fish</label><br>\
    <input id='bigFish' type='text' required></div>\
    <input id='submit' type='submit'></form>"
    );
    $(".title").remove();

    //build out the top weight display box below the form and above the team list
    $("<div class='topWeightBox'>\
        <div class='teamInfo'><b>TOP WEIGHT - </b>Team #: 1</div>\
        <div class='topWeight'>20.45</div>\
      </div>").insertAfter(".teamEntry");

      /*When the weigh in submit button is clicked, cycle through the teamArray
      and find the team number associated with the new submit. Create a new object
      property for total weight and big fish.*/
    $("#weighIn").submit(function(event){
      event.preventDefault();

//loop through the array and find the team we're entering weight for
      for(var i=0;i<teamArray.length;i++){
        if($("#teamNumber").val() == teamArray[i].teamNumber){
//update the array with the new weight for this team.
            teamArray[i].totalWeight = $("#totalWeight").val();
            teamArray[i].bigFish = $("#bigFish").val();
            console.log(teamArray[i]);

            /*Clear the current list of teams and rebuild it with the new information
            pulled from the array. */
            $(".fullTeamList").replaceWith("<div class='fullTeamList'></div>");
//loop through the array and create a new list from every array index
              for(i=0;i<teamArray.length;i++){
                if(!teamArray[i].totalWeight){teamArray[i].totalWeight = "0"}
                if(!teamArray[i].bigFish){teamArray[i].bigFish = "0"}
                $(".fullTeamList").append(
                "<div class='teamLine'>\
                  <div class='teamNumber'>Team:<br>"+teamArray[i].teamNumber+"</div>\
                  <div class='boaters'>\
                    <div class='boater'>"+teamArray[i].boater+"</div>\
                    <div class='boater'>"+teamArray[i].nonBoater+"</div>\
                  </div>\
                  <div class='teamNumber'>Total:<br><b>"+teamArray[i].totalWeight+"</b></div>\
                  <div class='teamNumber'>BF:<br>"+teamArray[i].bigFish+"</div>\
                </div></div>");
              };
            }
      }
    });
  }
});
