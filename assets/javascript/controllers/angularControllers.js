angular.module('mySchoolApp')
    .controller("clubsController", function ($scope) {

        $scope.clubName;
        $scope.clubDescription;
        $scope.clubAttendees;

        $scope.logAllThings = function() {

            console.log($scope.clubName);

        };

    });