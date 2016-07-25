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
var checkDay = 0;
var isHomework = 0;

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
    'maxResults': 5,
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
          else if (event.summary === "GOLD DAY" && checkDay === 0) {
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

          // CHECKS FOR FINALS
          if (event.summary.indexOf("Final Exams") !== -1) {
            writeDay("Finals Exams!");
            console.log("Finals Exams");
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

  request.execute(function(resp) {
    var events = resp.items;
    
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {

        var event = events[i];
        var when = event.start.date;
        if (!when) {
          when = event.start.date;
        }
        
        // EVENT NAME
        var str = event.summary;
        var strLength = str.length;
        
        // IF CATCHES HOMEWORK EVENT
        if (str.indexOf('HOMEWORK') > -1) {
          console.log(str.substring(11, strLength) + '\nDue on ' + when.substring(5, 100));
          writeHomework(str.substring(11, strLength) + ' Due on ' + when.substring(5, 100));
          
          // ALERT IF HOMEWORK IS DUE TODAY
          if(when.substring(5,100) == today && isHomework != 1){
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
 * Gets Homework put into the input boxes and adds it to
 * the authorized user's calendar.
 */
 function addHomework() {

 /*
  * WORKS!
  * WORKING CODE I WILL COMMENT LATER
  * WHEN I FIGURE OUT WHAT I DID!
  */
  var date = $('#dueDate').val().split("-");
  console.log(date, $('#dueDate').val());
  d = date[2];
  day = 0 + parseInt(d) + 1;
  m = date[1];
  month = parseInt(m, 10);
  year = date[0];
  console.log(year+'-'+month+'-'+0+day);

  // GETS LAST DAY OF MONTH
  var lastDayDate = new Date(year, month + 1, 0);

  // IF LAST DAY OF MONTH GO TO FIRST DAY OF NEXT MONTH
  if(lastDayDate.getDate() === day){
    day = 1;
    month ++;
    // console.log(month);
    // console.log(day);
  }

  // I HAVE NO CLUE WHAT THE F$$K I AM DOING!

  var homeworkName = $('#assignment').val();
  var className = $('#class').val();
  var dueDate = $('#dueDate').val();

  console.log(homeworkName + '\n' + className + '\n' + dueDate);
  alert("Homework Added To Calendar");

  $('#class').val("");
  $('#assignment').val("");

  // INFO FOR EVENT
  var homeworkEvent = {

    "summary": "HOMEWORK - " + homeworkName + " for " + className,
    'description': 'Homework for ' + className + '. It is due on ' + dueDate,

    "start": {
      "date": dueDate
    },
    // 0 BEFORE DATE AND MONTH F&&KS EVERYTHING UP!
    "end": {
      "date": year+'-'+month+'-'+day
    },
  }

  // ADDS EVENT
  var request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': homeworkEvent
  });
  
   // IF EVENT CREATED
   request.execute(function(homeworkEvent) {
    console.log('Event created: ' + homeworkEvent.htmlLink);
  });
 }

/*
 * WRITES THE DAY OF WEEK (BLUE OR GOLD) AND WRITES THE HOMEWORK
 */
 function writeDay(message){
  // DISPLAYS MESSAGE
  $('#output').text(message);
}
function writeHomework(homeworkList){
  // FIXES REPEATING HOMEWORK BUG
  if($('#'+i).text() != homeworkList){

    // DISPLAYS MESSAGE
    $('#upcomingHomework').append('<p id="'+i+'">' + homeworkList + '</p>' + '\n');
  }
}