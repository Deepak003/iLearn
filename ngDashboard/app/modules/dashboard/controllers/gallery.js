/*==========================================================
    Author      : Deepak Tiwari
    Date Created: 13 Jan 2017
    Description : Controller to handle Gallery page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("GalleryController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $state, $location, dashboardService, Flash) {
    var vm = this;

    console.log("coming to Gallery controller");

     var recommender = new jsrecommender.Recommender();

                var table = new jsrecommender.Table();

                  // table.setCell('[movie-name]', '[user]', [score]);
				  
				  
                table.setCell('AngularJS', 'Deepak', 5);
                table.setCell('DataStructures', 'Deepak', 4);
                table.setCell('Java', 'Deepak', 3);
                table.setCell('Oracle', 'Deepak', 5);
                table.setCell('React', 'Purushottam', 5);
                table.setCell('Handlebars', 'Purushottam', 4);
                table.setCell('AngularJS', 'Purushottam', 4);
                table.setCell('Oracle', 'Purushottam', 0);
                table.setCell('Oracle', 'Rishi', 3);
                table.setCell('AngularJS', 'Rishi', 2);
                table.setCell('Handlebars', 'Rishi', 5);
                table.setCell('Java', 'Rishi', 5);
                table.setCell('Oracle', 'Student', 5);
                table.setCell('DataStructures', 'Student', 0);
                table.setCell('AngularJS', 'Student', 4);
				table.setCell('Handlebars', 'Student', 5);
				table.setCell('Java', 'Student', 4);
				table.setCell('Oracle', 'Student', 3);

                var model = recommender.fit(table);
                console.log(model);

                predicted_table = recommender.transform(table);

                console.log("predicted_table::"+JSON.stringify(predicted_table));
                
                $scope.table = table;
                $scope.predicted_table = predicted_table;

  

}]);

