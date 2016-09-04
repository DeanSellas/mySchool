// CLUBS CONTROLLER
angular.module('mySchoolApp')
    .controller("clubsController", function ($scope) {

        // this is required to have variables work in the funtion
        var self = this;
        clubName;
        clubDescription;
        clubMeeting = new Date();

        self.addClub = function () {

            console.log("Club: " + self.clubName);
            console.log("Desciption: " + self.clubDescription);

            var clubDate = $('#clubMeeting').val()
            var dueDate = new Date(clubDate);

            // +1 TO DATE, WHY? JAVASCRIPT IS WEIRD
            dueDate.setDate(dueDate.getDate() + 1);

            // EVENT TIME 8AM TO 3PM
            var startTime = new Date(dueDate.setHours(8));
            var endTime = new Date(dueDate.setHours(15));

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

            console.log(clubEvent);

            // ADDS EVENT

            var request = gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': clubEvent
            });

            //IF EVENT CREATED
            request.execute(function (clubEvent) {
                //console.log(homeworkName + '\n' + className + '\n' + dueDate + '\n' + homeworkDescription);
                console.log('Event created: ' + clubEvent.htmlLink);
                alert("Club Added To Calendar");
            });

            // RESETS TEXT BOX
            self.clubName = "";
            self.clubDescription = "";

        };
    });