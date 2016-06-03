/* API JAVASCRIPT 
-------------------------------------------------------
*/

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com

// API KEY
var CLIENT_ID = '903500945114-chpbcc2dkele8lnrffk7ko0jtchkhd07.apps.googleusercontent.com';

// SETS PERMISSIONS
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

// CALENDAR ID
var calendar = 'glenbrook225.org_t6icimruvi67t0hj6c8imt2ft8@group.calendar.google.com';

// GET DAY OF WEEK
var checkWeekend = (new Date()).getDay();

// QUICK HOTFIX
var checkDay, isHomework = 0;

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

  } else {
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
}

/**
 * Displays if its a Blue or Gold Day
 */
function blueGold() {
  //Gets events from google calendar
  var request = gapi.client.calendar.events.list({
    // 'calendarId': calendar, SCHOOL CALENDAR NOT UPDATED BECAUSE ITS THE SUMMER
    'calendarId': 'dgsellas@gmail.com', // WORKING OFF MY CALENDAR
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 3,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
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
          if (event.summary === "BLUE DAY") {
            writeDay("Today is a Blue Day");
            document.title = "mySchool | Blue Day";
            console.log("Blue Moon");
            // alert("Blue Day");
            $('body').addClass("blueDay");
            checkDay = 1;
          }

          // CHECK GOLD DAY
          else if (event.summary === "GOLD DAY") {
            writeDay("Today is a Gold Day");
            document.title = "mySchool | Gold Day";
            console.log("King Midas");
            // alert("Gold Day");
            $('body').addClass("goldDay");
            checkDay = 1;
          }

          // CHECKS FOR NO SCHOOL EVENT
          if (event.summary.indexOf("NO SCHOOL") !== -1) {
            writeDay("No School, Have a Good Day off");
            console.log("no school")
            checkDay = 1;
          }
        }
      }

      // IF WEEKEND
      if (checkWeekend === 0 || checkWeekend === 6) {
        writeDay("Its the Weekend");
        document.title = "mySchool | Weekend";
        console.log("Everybody is working for the weekend");
        // alert("weekend");
      }

      // IF NO EVENTS
      else if (checkDay != 1) {
        console.log("true")
        writeDay("Sorry couldn't catch event from calendar");
      }
    }

  });
}

/**
 * Print the summary and start date of the next ten homework events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingHomework() {
  var request = gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;

    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var when = event.start.date;
        if (!when) {
          when = event.start.date;
        }

        var str = event.summary;
        var test = str.length;
        if (str.indexOf('HOMEWORK') > -1) {
          console.log(str.substring(11, test) + '\nDue on ' + when.substring(5, 100));
          writeHomework(str.substring(11, test) + ' Due on ' + when.substring(5, 100));
          isHomework = 1;
        }
      }
    }
    if (isHomework != 1) {
      console.log("no homework found");
      writeHomework('No upcoming homework found!');
    }

  });
}

/**
 * Gets Homework put into the input boxes and adds it to
 * the authorized user's calendar.
 */
function addHomework() {
  // QUICK FIX! VERY SLOPPY!!!
  var hoy = new Date(),
    d = hoy.getDate() + 1,
    m = hoy.getMonth() + 1,
    y = hoy.getFullYear(),
    data;
  if (d < 10) {
    d = "0" + d;
  }
  if (m < 10) {
    m = "0" + m;
  }
  data = y + "-" + m + "-" + d;

  var homeworkName = $('#assignment').val();
  var className = $('#class').val();
  var dueDate = $('#dueDate').val();

  console.log(homeworkName + '\n' + className + '\n' + dueDate);
  alert("Homework Added To Calendar");

  $('#class').val("");
  $('#assignment').val("");

  var homeworkEvent = {
    "start": {
      "date": dueDate //+'T06:00:00-07:00'
    },
    "end": {
      "date": data //+'T22:00:00-07:00'
    },
    "summary": "HOMEWORK - " + homeworkName,
    'description': 'Homework for ' + className + '. It is due on ' + dueDate
  }

  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': homeworkEvent
  });

  request.execute(function(homeworkEvent) {
    console.log('Event created: ' + homeworkEvent.htmlLink);
  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function writeDay(message) {
  // DISPLAYS MESSAGE
  $('#output').text(message);
}

function writeHomework(testVar) {
  // DISPLAYS MESSAGE
  $('#upcomingHomework').append('<p>' + testVar + '</p>' + '\n');
}