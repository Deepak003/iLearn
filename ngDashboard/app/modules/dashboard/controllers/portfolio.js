/*==========================================================
    Author      : Deepak Tiwari
    Date Created: 13 Jan 2017
    Description : Controller to handle Portfolio page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("PortfolioController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
    var vm = this;


    vm.portfolioData = [
        {
            image: "alpha-tech-logo",
            title: "Alpha Logo"
        },
        {
            image: "logic-softlogo",
            title: "Logic Soft Logo"
        }
    ];
    console.log("coming to Portfolio controller");
}]);

