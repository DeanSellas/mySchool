// GETS MONTH AND DAY
var month = (new Date()).getMonth() + 1;
var day = (new Date()).getDate();


// CHECKS WINDOW SIZE
function resize(){

  // IF >= 768PX
  if (window.matchMedia("(min-width: 768px)").matches) {

    // console.log("768px or larger");
    $('#navBtn').addClass("fa-times");
    $('#navBtn').removeClass("fa-bars");

  } 

  // IF < 768PX
  else {

    // console.log("smaller than 768px");
    $('#navBtn').addClass("fa-bars");
    $('#navBtn').removeClass("fa-times");

  }
}

// SETS DATE
function setDay() {
  $('#date').text(month + '/' + day);
}

window.onload = resize;
window.onload = setDay;