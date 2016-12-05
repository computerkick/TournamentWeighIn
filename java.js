//Notice on load - DO NOT REFRESH OR LOSE data
//alert("DO NOT RELOAD THIS PAGE!\r\rDoing so will cause LOSS OF STORED DATA!\r\r");

/*###########################################################################
TO DO:
  Validate Team numbers don't duplicate (DONE ln.19)
Give an option to break out weights by boater and non-boater.
Modify print to not show the entry header.
  BUG - Fix the maxlength field on mobile devices. (DONE Ln.44)
############################################################################*/

/*
Pre-Fish Setup Page:
Take the submitted entry and create an array with the information.
Loop through the array, updating the current list of teams
*/
var teamArray = [];
var teamBigFishHolder;
var bigBagHolder = 0;
var bigFishHolder = 0;

//Validate no duplicate numbers on focus out
$("#teamNumber").focusout(function(){
  for(var i=0;i<teamArray.length;i++){
    if($("#teamNumber").val() == teamArray[i].teamNumber){
      alert("Team Number already exists");
      $("#teamNumber").val("");
    }
  }
});

$("#addTeam").submit(function(event){

  //prevent the refresh of the page
    event.preventDefault();

//associate the inputs to an object
  var teamObject = {
    teamNumber: $("#teamNumber").val(),
    boater: $("#boaterName").val(),
    nonBoater: $("#nonBoaterName").val()
  };

//Mobile fix for input length
  if(teamObject.boater.length > 20){teamObject.boater = teamObject.boater.slice(0,20)};
  if(teamObject.nonBoater.length > 20){teamObject.nonBoater = teamObject.nonBoater.slice(0,20)};
//END mobile input length fix

//store the data in a growing object array
  teamArray.push(teamObject);

  //update the team listing at the bottom.
$(".fullTeamList").append("<div class='teamLine'><div class='teamNumber'>Team:<br>"+teamObject.teamNumber+"</div><div class='boaters'><div class='boater'>"+teamObject.boater+"</div><div class='boater'>"+teamObject.nonBoater+"</div></div></div>");

    //reset the fields blank and return focus to first field.
    $("#teamNumber").val("");
    $("#boaterName").val("");
    $("#nonBoaterName").val("");
    $("#teamNumber").focus();

});

//when finish button is clicked on the team entry page.
$(".finishedTeams").click(function(){
  var result;
  if(result = window.confirm("Are you sure you're finished?")){

/*#############################################################################

    Build the Weigh In Page:

#############################################################################*/

//Replace Team building form with the new weigh in form
    $("#addTeam").replaceWith("<form id='weighIn'>\
    <div style='font-size:.75em;'>Break out weights by angler: <input type='checkbox' id='breakOutWeights'></div>\
    <div><label for '#teamNumber'>Team Number</label><br>\
    <input id='teamNumber' type='number' min='1' max='999' required></div>\
    <div><label for '#totalWeight'>Total Weight</label><br>\
    <input id='totalWeight' type='text' maxlength='5' required></div>\
    <div><label for '#bigFish'>Big Fish</label><br>\
    <input id='bigFish' type='text' maxlength='5' required></div>\
    <input id='submit' style='margin-top:5px;' type='submit'>\
    </form>"
    );
    $(".title").remove();

    //build out the top weight display box below the form and above the team list
    $("<div class='topWeightBox'>\
        <div class='teamInfo'><b>TOP WEIGHT - </b>Team #: 0</div>\
        <div class='topWeight'>00.00</div>\
        <div class='bigFishInfo'><b>BIG FISH - </b>Team #: 0 (00.00)\
      </div>").insertAfter(".teamEntry");

      /*When the weigh in submit button is clicked, cycle through the teamArray
      and find the team number associated with the new submit. Create a new object
      property for total weight and big fish.*/
    $("#weighIn").submit(function(event){
      event.preventDefault();

      if($("#breakOutWeights").checked = true){
        console.log("Checked box!")
      }

//loop through the array and find the team we're entering weight for
      for(var i=0;i<teamArray.length;i++){
        if($("#teamNumber").val() == teamArray[i].teamNumber){
//update the array with the new weight for this team.
            teamArray[i].totalWeight = $("#totalWeight").val();
            teamArray[i].bigFish = $("#bigFish").val();

            /*Clear the current list of teams and rebuild it with the new information
            pulled from the array. */
            $(".fullTeamList").replaceWith("<div class='fullTeamList'></div>");
//loop through the array and create a new list from every array index, might as well
//kill two birds and check for the biggest bag and fish.
              for(i=0;i<teamArray.length;i++){
                if(!teamArray[i].totalWeight){teamArray[i].totalWeight = "0"}
                if(!teamArray[i].bigFish){teamArray[i].bigFish = "0"}

                //check the big bag and find the biggest one. Update the big field
                if(teamArray[i].totalWeight > bigBagHolder){
                  bigBagHolder = teamArray[i].totalWeight;
                  var teamNumberHolder = teamArray[i].teamNumber;
                }

                //check the big fish and find the biggest one. Update the big field
                if(teamArray[i].bigFish > bigFishHolder){
                  bigFishHolder = teamArray[i].bigFish;
                  teamBigFishHolder = teamArray[i].teamNumber
                }

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
//Clear the entered weights in the form and reset focus to the team number.
              $("#teamNumber").val("");
              $("#totalWeight").val("");
              $("#bigFish").val("");
              $("#teamNumber").focus();

              $(".teamInfo").replaceWith("<div class='teamInfo'><b>TOP WEIGHT - </b>Team #: "+teamNumberHolder+"</div>");
              $(".topWeight").replaceWith("<div class='topWeight'>"+bigBagHolder+"</div>");
              $(".bigFishInfo").replaceWith("<div class='bigFishInfo'><b>BIG FISH - </b>Team #: "+teamBigFishHolder+" ("+bigFishHolder+")")

              bigBagHolder = 0;
              bigFishHolder = 0;
            }
      }
    });
  }
});
