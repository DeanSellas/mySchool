/* API JAVASCRIPT 
-------------------------------------------------------
*/

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com

// API KEY
var CLIENT_ID = '476941933819-im5o6g7igbtkg51p124bno1866nroh8s.apps.googleusercontent.com';

var CLIENT_SECRET = 'v0326UZAdMymKaMhSjzod4SO';

// SETS PERMISSIONS
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

// CALENDAR ID
var calendar = 'glenbrook225.org_5ubk7oftem2kuc5gm5j6pjgauc@group.calendar.google.com';

// GET DAY OF WEEK
var checkWeekend = (new Date()).getDay();

// QUICK HOTFIX
var checkDay;
var isHomework = 0;
var isClub = 0;


/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize({
    'client_id': CLIENT_ID,
    'scope': SCOPES.join(' '),
    'immediate': true
  }, handleAuthResult);
}


/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  var authorizeDiv = document.getElementById('authorize-div');

  if (authResult && !authResult.error) {
    loadCalendarApi();
    // Hide auth UI, then load client library.
    $('#authorizeDiv').addClass('hide');
    // SHOW APP
    $('#app').removeClass("hide");
  }
  else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    $('#authorizeDiv').removeClass('hide');
  }
}


/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
  gapi.auth.authorize({
    client_id: CLIENT_ID,
    scope: SCOPES,
    immediate: false
  },
    handleAuthResult);
  return false;
}


/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
  gapi.client.load('calendar', 'v3', blueGold);
  gapi.client.load('calendar', 'v3', listUpcomingHomework);
  gapi.client.load('calendar', 'v3', listUpcomingClubs);
}


/**
 * Displays if its a Blue or Gold Day
 */
function blueGold() {
  // ADDED TO HOTFIX DAY NOT SHOWING BUG WHEN PAGE IS REOPENED
  checkDay = 0;
  //Gets events from google calendar
  var request = gapi.client.calendar.events.list({
    'calendarId': calendar,
    // 'calendarId': 'dgsellas@gmail.com', SCHOOL STARTED AGAIN BACK TO SCHOOLS CALENDARf
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 5,
    'orderBy': 'startTime'
  });

  request.execute(function (resp) {
    var events = resp.items;

    if (events.length > 0) {

      // IF WEEKDAY
      if (checkWeekend !== 0 && checkWeekend !== 6) {

        for (i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }

          // CHECK BLUE DAY
          if (event.summary === "BLUE DAY" && checkDay === 0) {
            writeDay("Today is a Blue Day");
            document.title = "mySchool | Blue Day";
            console.log("Blue Moon");
            // alert("Blue Day");
            $('body').addClass("blueDay");
            checkDay = 1;
          }

          // CHECK GOLD DAY
          else if (event.summary === "GOLD DAY" && checkDay === 0) {
            writeDay("Today is a Gold Day");
            document.title = "mySchool | Gold Day";
            console.log("King Midas");
            // alert("Gold Day");
            $('body').addClass("goldDay");
            checkDay = 1;
          }

          // CHECKS FOR NO SCHOOL EVENT
          if (event.summary.indexOf("NO SCHOOL") !== -1 && checkDay === 0) {
            document.title = "mySchool | No School";
            writeDay("No School Today, Have a Good Day off");
            console.log("no school");
            checkDay = 1;
          }

          // CHECKS FOR FINALS
          if (event.summary.indexOf("Final Exams") !== -1) {
            writeDay("Finals Exams!");
            console.log("Finals Exams");
            checkDay = 1;
          }

          // CHECKS FOR FIRST DAY OF SCHOOL
          if (event.summary.indexOf("FIRST DAY OF SCHOOL") !== -1) {
            alert("First Day of School Good Luck!");
            console.log("First Day");
          }
        }
      }

      // IF WEEKEND
      if (checkWeekend === 0 || checkWeekend === 6) {
        writeDay("It's the Weekend");
        document.title = "mySchool | Weekend";
        console.log("Everybody is working for the weekend");
        // alert("weekend");
      }

      // IF NO EVENTS
      else if (checkDay != 1) {
        writeDay("Sorry couldn't catch event from calendar");
      }
    }
  });
}


/**
 * Print the summary and start date of the next twenty homework events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingHomework() {

  // GETS TODAY'S DATE
  var todayDate = new Date(),
    d = todayDate.getDate(),
    m = todayDate.getMonth() + 1,
    today;

  if (d < 10) {
    d = "0" + d;
  }
  if (m < 10) {
    m = "0" + m;
  }

  today = m + "-" + d;
  console.log('Today is: ' + today);


  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 20,
    'orderBy': 'startTime'
  });

  request.execute(function (resp) {
    var events = resp.items;

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {

        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }

        // EVENT NAME
        var str = event.summary;
        var strLength = str.length;

        // IF CATCHES HOMEWORK EVENT
        if (str.indexOf('HOMEWORK') > -1) {
          console.log("HOMEWORK CALENDAR \n" + str.substring(11, strLength) + ' Due On ' + when.substring(5, 10));
          writeHomework(str.substring(11, strLength) + ' Due On ' + when.substring(5, 10));

          // ALERT IF HOMEWORK IS DUE TODAY
          if (when.substring(5, 10) == today && isHomework != 1) {
            alert("You Have Homework due today!");
          }

          isHomework = 1;
        }
      }
    }

    // IF NO HOMEWORK EVENT IS FOUND
    if (isHomework != 1) {
      console.log("no homework found");
      writeHomework('No upcoming homework found!');
    }

  });
}


/**
 * Print the summary and start date of the next ten club events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingClubs() {

  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function (resp) {
    var events = resp.items;

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {

        var event = events[i];
        var when = event.start.dateTime;
        if (!when) {
          when = event.start.date;
        }

        // EVENT NAME
        var str = event.summary;
        var strLength = str.length;

        // IF CATCHES HOMEWORK EVENT
        if (str.indexOf('CLUB') > -1) {
          console.log("CLUB CALENDAR \n" + str.substring(7, strLength) + " Meeting On " + when.substring(5, 10));
          writeClub(str.substring(7, strLength) + " Meeting On " + when.substring(5, 10));

          isClub = 1;
        }
      }
    }

    // IF NO HOMEWORK EVENT IS FOUND
    if (isClub != 1) {
      console.log("no clubs found");
      writeClub('No upcoming clubs found!');
    }

  });
}


// SHOUTOUT TO MDUDE FOR HELPING ME FIX THE CODE
// https://github.com/arhill05
// HOMEWORK LOGIC MOVED TO controllers/angularControllers.js line 60


/*
 * WRITES THE DAY OF WEEK (BLUE OR GOLD)
 * WRITES HOMEWORK
 * WRITES CLUB
 */
function writeDay(message) {
  // DISPLAYS MESSAGE
  $('#output').text(message);
  checkDay = 0;
}
function writeHomework(homeworkList) {
  // FIXES REPEATING HOMEWORK BUG
  if ($('#' + i).text() != homeworkList) {

    // DISPLAYS MESSAGE
    $('#upcomingHomework').append('<p id="' + i + '">' + homeworkList + '</p>' + '\n');
  }
}
function writeClub(clubList) {
  // FIXES REPEATING HOMEWORK BUG
  if ($('#' + i).text() != clubList) {

    // DISPLAYS MESSAGE
    $('#upcomingClubs').append('<p id="' + i + '">' + clubList + '</p>' + '\n');
  }
}