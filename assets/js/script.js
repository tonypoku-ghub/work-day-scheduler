var currentDayEl = $("#currentDay");
var calendarEl = $(".container");

// Define styling classes
var timeBlockClass = "";
var calRowClass = "row time-block";
var calBlockTimeClass = "col-1 hour";
var calInputClass = "col-10 description textarea";
var calBlockSaveClass = "col-1 saveBtn";

// Global variables
var storedRecords;

function doInit() {
  setHeaderDate();

  createCalendarGrid();

  // Define listeners
  $("button").on("click", saveCalendar);
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

    var calBlockTimeEl = $("<span>")
      .addClass(calBlockTimeClass)
      .text(hour.format("h a"));

    var calInputEl = $("<textarea>")
      .addClass(calInputClass)
      .attr("type", "textarea")
      //.attr("row", "2")
      .attr("id", hour.format("input-h-a"))
      .attr("placeholder", "Enter Text here...")
      .text(localStorage.getItem(hour.format("input-h-a")));

    var saveIconEl = $("<i>").addClass("fa-solid fa-save");

    var calBlockSaveEl = $("<button>")
      .addClass(calBlockSaveClass)
      .attr("id", hour.format("btn-h-a"));

    calBlockSaveEl.append(saveIconEl);
    // .text("Save");

    calRowEl.append(calBlockTimeEl, calInputEl, calBlockSaveEl);

    calendarEl.append(calRowEl);
  }
}

function setHeaderDate() {
  var $today = moment().format("dddd, MMMM Do");

  currentDayEl.text($today);
}

function saveCalendar(event) {
  event.stopPropagation();

  var clickedBtn = $(this);

  // Fetch textarea data
  var $textarea = $(clickedBtn.siblings("textarea")[0]);

  // Save to local storage
  localStorage.setItem($textarea.attr("id"), $textarea.val());
}

$.ready(doInit());
