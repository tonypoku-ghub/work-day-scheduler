var currentDayEl = $("#currentDay");
var calendarEl = $("#calendar");

// Define styling classes
var timeBlockClass = "";
var calRowClass = "row time-block";
var calBlockTimeClass = "col-1 pt-3 hour";
var calInputClass = "col-10 description textarea";
var calBlockSaveClass = "col-1 saveBtn pt-3";

// Global variables
var storedRecords;

function doInit() {
  setHeaderDate();

  createCalendarGrid();
}

function createCalendarGrid() {
  var current_time = moment();

  for (
    var hour = moment("9 AM", "h a");
    hour.hour() <= moment("5 PM", "h a").hour();
    hour.add(1, "hours")
  ) {
    var color_code_class = "future";

    if (hour.hour() < current_time.hour()) {
      color_code_class = "past";
    } else if (hour.hour() === current_time.hour()) {
      color_code_class = "present";
    }

    var calRowEl = $("<div>").addClass(calRowClass).addClass(color_code_class);

    var inputGroupEl = $("<div>").addClass("input-group");

    var calBlockTimeEl = $("<span>")
      .addClass(calBlockTimeClass)
      .text(hour.format("h a"));

    var calInputEl = $("<textarea>")
      .addClass(calInputClass)
      .attr("type", "textarea")
      //.attr("row", "2")
      .attr("id", hour.format("input-h-a"))
      .attr("placeholder", "Enter Event");

    var calBlockSaveEl = $("<button>")
      .addClass(calBlockSaveClass)
      .attr("id", hour.format("btn-h-a"))
      .text("Save");

    inputGroupEl.append(calBlockTimeEl, calInputEl, calBlockSaveEl);

    calRowEl.append(inputGroupEl);
    calendarEl.append(calRowEl);
  }
}

function setHeaderDate() {
  var $today = moment().format("dddd, MMMM Do");

  currentDayEl.text($today);
}

// Define listeners
$(".saveBtn").on("click", doSave());

function doSave() {
  console.log("doSave called");
  // get current globally stored var
  var updatedRecords = storedRecords;
  // get initials from input box
  var saveBtnEl = $(this);

  console.log(saveBtnEl.attr("id"));

  // // add new score
  // updatedRecords.push({ user_initial: initials.value, user_score: score });

  // // Save to local storage
  // localStorage.setItem("quiz-challenge-scores", JSON.stringify(updatedScores));
  // //update global var
  // storedScores = updatedScores;
}

$.ready(doInit());
