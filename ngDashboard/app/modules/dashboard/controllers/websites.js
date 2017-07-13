/*==========================================================
    Author      : Deepak Tiwari
    Date Created: 13 Jan 2017
    Description : Controller to handle Websites page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("WebsitesController", ['$rootScope', '$scope', '$state', '$window','$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state,$window, $location, dashboardService, Flash) {
    var vm = this;

    vm.websites = [
        {
            title: "AngularJS Course",
            image: "1_AngularJS",
            link:"../ngCourse/uploads/1_AngularJS/index.html"
        },
        {
            title: "Javascript Course",
            image: "6_Javascript",
            link: "../ngCourse/uploads/6_Javascript/index.html"
        }
    ];
    console.log("coming to Websites controller");
	vm.openCourse = function(courseLnk){
		alert(courseLnk);
		var left = (screen.width/2);
        var top = (screen.height/2);
		$window.open(courseLnk, '_blank', 'location=yes,height=700,width=700,scrollbars=no,status=yes','top="+top+"','left="+left+"');
	};

}]);

