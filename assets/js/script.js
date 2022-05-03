var currentDayEl = $("#currentDay");

function doInit() {
  var $today = moment().format("dddd, MMMM Do");

  currentDayEl.text($today);
}

$.ready(doInit());
