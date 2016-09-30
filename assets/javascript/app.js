// GETS MONTH AND DAY
var month = (new Date()).getMonth() + 1;
var day = (new Date()).getDate();


// CHECKS WINDOW SIZE
function resize() {

  // IF >= 768PX
  if (window.matchMedia("(min-width: 768px)").matches) {
    if($('#wrapper').hasClass("toggled") === false){
      // console.log("768px or larger");
      $('#navBtn').addClass("fa-times");
      $('#navBtn').removeClass("fa-bars");
    }
  }

  // IF < 768PX
  else {

    $('#navBtn').addClass("fa-bars");
    $('#navBtn').removeClass("fa-times");
    
    if($('#wrapper').hasClass("toggled") === true){
      $('#navBtn').addClass("fa-bars");
      $('#navBtn').removeClass("fa-times");
      $('#wrapper').removeClass("toggled");
    }
  }
}

// SETS ACTIVE CLASS
function setActive() {
  setTimeout(function() {
    // IF ON HOMEWORK PAGE
    if (window.location.hash.includes("homework") === true) {
      $('.active').toggleClass("active");
      $('#homework').toggleClass("active");
    }

    // IF ON CLUBS PAGE
    else if (window.location.hash.includes("clubs") === true) {
      $('.active').toggleClass("active");
      $('#clubs').toggleClass("active");
    }

    // IF ON SCHOOL PAGE
    else if (window.location.hash.includes("school") === true) {
      $('.active').toggleClass("active");
      $('#school').toggleClass("active");
    }

    //IF ON ABOUT PAGE
    else if (window.location.hash.includes("about") === true) {
      $('.active').toggleClass("active");
      $('#about').toggleClass("active");
    }
    
    // IF ON HOME PAGE
    else {
      $('.active').toggleClass("active");
      $('#home').toggleClass("active");
    }
  }, 50);
}

// ADDS DEVELOPMENT BRANCH TEXT TO PAGE
function testingBranch() {

  if (window.location.href.indexOf("http://thespacecoder.com/myschool/") > -1 || window.location.href.indexOf("localhost") > -1){
    console.log("DEVELOPMENT BRANCH");
    console.log("                 ________ \n             _,.-Y  |  |  Y-._ \n        .-~\"   ||  |  |  |   \"-. \n        I\" \"\"==\"|\" !\"\"! \"|\"[]\"\"|     _____ \n        L__  [] |..------|:   _[----I\" .-{\"-. \n       I___|  ..| l______|l_ [__L]_[I_/r(=}=-P \n      [L______L_[________]______j~  '-=c_]/=-^ \n       \\_I_j.--.\\==I|I==_/.--L_] \n         [_((==)[`-----\"](==)j \n           I--I\"~~\"\"\"~~\"I--I \n            |[]|         |[]| \n            l__j         l__j \n            |!!|         |!!| \n            |..|         |..| \n            ([])         ([]) \n            ]--[         ]--[ \n            [_L]         [_L] \n           /|..|\\       /|..|\\ \n          `=}--{='     `=}--{=' \n         .-^--r-^-.   .-^--r-^-.             Imperial AT-AT \n   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    $(".title").append('<h4>Development Branch</h4>');
    $(".version").html('<p class="version"><a href="https://github.com/TheSpaceCoder/mySchool/wiki/Development-Branch">Development Branch</a></p>');
  }
}

// SETS DATE
function setDay() {
  $('#date').text(month + '/' + day);
  // console.log(month+'/'+day);
}

// LOAD FUNTIONS
$('body').ready(resize);
$('body').ready(setDay);
$('body').ready(setActive);
$('body').ready(testingBranch);