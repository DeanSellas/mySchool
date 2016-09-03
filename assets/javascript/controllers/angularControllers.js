angular.module('mySchoolApp')
    .controller("clubsController", function ($scope) {
        var self = this;
        clubName;
        clubDescription;
        clubAttendees;

        self.logAllThings = function () {

            console.log("Club: " + self.clubName);
            console.log("Desciption: " + self.clubDescription);
        };

    });