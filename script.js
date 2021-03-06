var contactSearchApp = angular.module("ContactSearchApp", ['ngSanitize', 'ui.bootstrap']);

contactSearchApp.controller("mainCtrl", function ($scope, $http) {
    //    $scope.searchBar = "Search ...";
    $scope.peopleData = [];
    //    $scope.filterArray = angular.copy($scope.peopleData);
    $scope.showTable = false;
    $scope.selectedPerson = {
        name: '',
        description: '',
        img: '',
        likes: [],
        dislikes: [],
    }
    $scope.username = "Guest User";

    $scope.rate = 3;
    $scope.max = 5;
    $scope.isReadonly = true;


    $http.get('./people_(5).json').then(function (data) {
        var res = data.data.People;
        //console.log(res);
        res.map(function (item) {
            $scope.peopleData.push(item);
        });
        console.log($scope.peopleData);
    });


    var setLikesDislikes = function (like, dislike) {
        //var longer = (like.length >= dislike.length) ? like : dislike;
        var likeDislikeArray = [];
        for (let i = 0; i < Math.max(like.length, dislike.length); i++) {
            let temp = [like[i] ? like[i] : '', dislike[i] ? dislike[i] : ''];
            likeDislikeArray[i] = temp;
        }
        $scope.showTable = true;
        return likeDislikeArray;
    }


    $scope.showDescription = function (index) {
        var person = $scope.peopleData[index];
        $scope.selectedPerson.name = person.name;
        $scope.selectedPerson.description = person.Description;
        $scope.selectedPerson.img = person.img;
        $scope.selectedPerson.likes = person.Likes;
        $scope.selectedPerson.dislikes = person.Dislikes;

        $scope.likeDislikeArray = setLikesDislikes($scope.selectedPerson.likes, $scope.selectedPerson.dislikes);
        $scope.username = $scope.selectedPerson.name;
        $scope.rate = person.rating;
    }


});
