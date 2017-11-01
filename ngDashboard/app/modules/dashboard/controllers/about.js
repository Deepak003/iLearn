/*==========================================================
    Author      : Deepak Tiwari
    Date Created: 13 Jan 2017
    Description : Controller to handle About page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("AboutController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
        var vm = this;
        vm.user=$rootScope.userName;
        console.log("coming to About controller");

    }]);

