// CLUBS CONTROLLER
angular.module('mySchoolApp')

    .controller("clubsController", function ($scope) {

        // this is required to have variables work in the funtion
        var self = this;
        clubName;
        clubDescription;

        /**
        * Gets Clubs Information put into the input boxes 
        * and adds it to the authorized user's calendar.
        */
        self.addClub = function () {

            var clubDate = $('#clubMeeting').val();
            var clubMeeting = new Date(clubDate);

            // +1 TO DATE, WHY? JAVASCRIPT IS WEIRD
            clubMeeting.setDate(clubMeeting.getDate() + 1);

            // EVENT TIME 8AM TO 3PM
            var startTime = new Date(clubMeeting.setHours(8));
            var endTime = new Date(clubMeeting.setHours(15));

            // EVENT INFO
            var clubEvent = {

                "summary": "CLUB - " + self.clubName,
                'description': 'club ' + self.clubName,

                "start": {
                    "dateTime": startTime
                },

                "end": {
                    "dateTime": endTime
                },
            };

            // LOG
            // console.log(clubEvent);
            console.log("CLUB DETAILS \nClub " + self.clubName + "\nDescription " + self.clubDescription + "\nMeeting " + clubMeeting);

            // ADDS EVENT
            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': clubEvent
            });

            //IF EVENT CREATED
            request.execute(function (clubEvent) {
                console.log('Event created: ' + clubEvent.htmlLink);
                alert("Club Added To Calendar");
            });

            // CLEARS INPUT BOX
            self.clubName = "";
            self.clubDescription = "";

        };
    });

// HOMEWORK CONTROLLER
angular.module('mySchoolApp')
    .controller("homeworkController", function ($scope) {

        var self = this;
        homeworkName;
        className;
        homeworkDescription;

        /**
        * Gets Homework Information put into the input boxes 
        * and adds it to the authorized user's calendar.
        */
        self.addAssignment = function () {
            var homeworkDate = $('#dueDate').val();
            var dueDate = new Date(homeworkDate);

            // +1 TO DATE, WHY? JAVASCRIPT IS WEIRD
            dueDate.setDate(dueDate.getDate() + 1);

            // EVENT TIME 8AM TO 3PM
            var startTime = new Date(dueDate.setHours(8));
            var endTime = new Date(dueDate.setHours(15));

            // EVENT INFO
            var homeworkEvent = {

                "summary": "HOMEWORK - " + self.homeworkName + " For " + self.className,
                'description': 'Homework for ' + self.className + '. It is due on ' + dueDate.toLocaleDateString() + '\nDescription: ' + self.homeworkDescription,

                "start": {
                    "dateTime": startTime
                },

                "end": {
                    "dateTime": endTime
                },
            };

            // LOG
            //console.log(homeworkEvent);
            console.log("HOMEWORK DETAILS \nHomework:" + self.homeworkName + '\nClass: ' + self.className + '\nHomework Description: ' + self.homeworkDescription + '\nDue Date: ' + dueDate);

            // ADDS EVENT
            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': homeworkEvent
            });

            //IF EVENT CREATED
            request.execute(function (homeworkEvent) {
                console.log('Event created: ' + homeworkEvent.htmlLink);
                alert("Homework Added To Calendar");
            });

            // CLEARS INPUT BOX
            self.homeworkName = "";
            self.className = "";
            self.homeworkDescription = "";

        };

    });