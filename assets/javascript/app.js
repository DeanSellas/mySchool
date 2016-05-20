var day;

function setDay() {
  day = "Gold Day"
  $('p').text("Today is a "+day);
}

window.onload = setDay;