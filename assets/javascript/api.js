/* API JAVASCRIPT 
-------------------------------------------------------
*/

// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '1010036669880-b47odlcdjj5124d5cbtvoo6mktu0u207.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// CALENDAR ID
var calendar = 'glenbrook225.org_t6icimruvi67t0hj6c8imt2ft8@group.calendar.google.com';

// TEST CODE FOR DATE
var checkWeekend = (new Date()).getDay();

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
    // Hide auth UI, then load client library.
    authorizeDiv.style.display = 'none';
    loadCalendarApi();
  } else {
    // Show auth UI, allowing the user to initiate authorization by
    // clicking authorize button.
    authorizeDiv.style.display = 'inline';
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
  gapi.client.load('calendar', 'v3', listUpcomingEvents);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  //Gets events from google calendar
  var request = gapi.client.calendar.events.list({
    'calendarId': calendar,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 3,
    'orderBy': 'startTime'
  });

  request.execute(function(resp) {
    var events = resp.items;
    writeDay('Upcoming events:');


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
            writeDay("Blue");
            console.log("Blue Moon");
            // alert("Blue Day");
            $('body').addClass("blueDay");
          }

          // CHECK GOLD DAY
          else if (event.summary === "GOLD DAY") {
            writeDay("Gold");
            console.log("King Midas");
            // alert("Gold Day");
            $('body').addClass("goldDay");
          }

          // writeDay(event.summary /*+ ' (' + when + ')'*/)

        }
      }

      // IF WEEKEND
      if (checkWeekend === 0 || checkWeekend === 6) {
        console.log("Everybody is working for the weekend");
        writeDay("Its the Weekend");
        // alert("weekend");
      }

    }

    // IF NO EVENTS
    else {
      writeDay("Sorry couldn't catch event from calendar");
    }

  });
}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function writeDay(message) {
  // JQUERY
  $('#output').text(message);
}



/* NON API JAVASCRIPT 
-------------------------------------------------------
*/

// GETS MONTH AND DAY
var month = (new Date()).getMonth() + 1;
var day = (new Date()).getDate();

function setDay() {
  // SETS DATE
  $('#date').text(month + '/' + day);
}

window.onload = setDay;