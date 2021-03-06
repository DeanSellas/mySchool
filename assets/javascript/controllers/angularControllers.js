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

            // CHECKS IF INPUTS ARE FILLED OUT
            if (homeworkName.value !== "" && className.value !== "") {
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
            }
            else {

                console.log("Not all Fields Filled out");

                if (homeworkName.value === "" && className.value === ""){
                    alert("Please Fill Assignment Name and Class Fields");
                    console.log("Missing: Assignment Name and Class Fields");
                }
                else if (homeworkName.value === "") {
                    alert("Please Fill Assignment Name Field");
                    console.log("Missing: Assignment Name Field");
                }
                else if (className.value === ""){
                    alert("Please Fill Class Field");
                    console.log("Missing: Class Field");
                }
            }

        };

    });
    

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

            var startTime, endTime;

            var clubDate = $('#clubMeeting').val();
            var clubMeeting = new Date(clubDate);
            var clubTime = $("#meetingTime").val();

            // +1 TO DATE, WHY? JAVASCRIPT IS WEIRD
            clubMeeting.setDate(clubMeeting.getDate() + 1);

            // CHECKS IF FORE BEFORE SCHOOL
            if (clubTime === "1") {
                // EVENT TIME 7AM TO 8AM
                startTime = new Date(clubMeeting.setHours(7));
                endTime = new Date(clubMeeting.setHours(8));
            }
            
            //CHECKS FOR AFTER SCHOOL
            if (clubTime === "2"){
                // EVENT TIME 3PM TO 4PM
                startTime = new Date(clubMeeting.setHours(15));
                endTime = new Date(clubMeeting.setHours(16));
            }

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

            // CHECKS IF INPUTS ARE FILLED OUT
            if (clubName.value !== "") {
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
            }
            else {
                alert("Please Fill Club Name Field");
                console.log("Not all Fields Filled out");
            }

        };
    });