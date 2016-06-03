// GETS MONTH AND DAY
var month = (new Date()).getMonth() + 1;
var day = (new Date()).getDate();


// CHECKS WINDOW SIZE
function resize() {

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

// SETS ACTIVE CLASS
function setActive() {
  setTimeout(function() {

    if (window.location.hash.includes("homework") === true) {
      $('.active').toggleClass("active");
      $('#homework').toggleClass("active");
    } else if (window.location.hash.includes("about") === true) {
      $('.active').toggleClass("active");
      $('#about').toggleClass("active");
    } else if (window.location.hash.includes("school") === true) {
      $('.active').toggleClass("active");
      $('#school').toggleClass("active");
    } else {
      $('.active').toggleClass("active");
      $('#home').toggleClass("active");
    }
  }, 50);
}

// SETS DATE
function setDay() {
    $('#date').text(month + '/' + day);
    console.log(month+'/'+day);
}


// LOAD FUNTIONS
$('body').ready(resize);
$('body').ready(setDay);
$('body').ready(setActive);