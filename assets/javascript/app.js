/* JAVASCRIPT FOR DAY OF WEEK APP */

var day;

function setDay() {

  day = "Blue"
  $('#day').text(day);

  if(day === "Gold"){
    $('#day').css({
      "color":"yellow"
    });
  }
  if(day === "Blue"){
    $('#day').css({
      "color":"blue"
    });
  }
}

window.onload = setDay;