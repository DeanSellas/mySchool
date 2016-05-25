// GETS MONTH AND DAY
var month = (new Date()).getMonth() + 1;
var day = (new Date()).getDate();



function resize(){
  if (window.matchMedia("(min-width: 768px)").matches) {
    console.log("768px or larger");
    $('#navBtn').addClass("fa-times");
    $('#navBtn').removeClass("fa-bars");
  } else {
    console.log("smaller than 768px");
    $('#navBtn').addClass("fa-bars");
    $('#navBtn').removeClass("fa-times");
  }
}

function setDay() {
  // SETS DATE
  $('#date').text(month + '/' + day);
}

window.onload = resize;
window.onload = setDay;