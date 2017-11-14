/*==========================================================
    Author      : Deepak Tiwari
    Date Created: 13 Jan 2017
    Description : Controller to handle Websites page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("WebsitesController", ['$http','$rootScope', '$scope', '$state', '$window','$location', 'dashboardService', 'Flash',
function ($http,$rootScope, $scope, $state,$window, $location, dashboardService, Flash) {
    var vm = this;
	$http.get('../ngCourse/uploads/list-of-courses.json').success(function (data){
	  console.log(JSON.stringify(data));
	  //vm.courses =JSON.parse(JSON.stringify(data));
		//obj1.push(_objCourse);
	});
    console.log("userName:"+$rootScope.userName);
	if($rootScope.userName=="Deepak"){
		vm.courses = [
			{
				name: "AngularJS",
				thumbnail: "../ngCourse/uploads/1_AngularJS/thumbnails/1.jpg",
				url:"../ngCourse/uploads/1_AngularJS"
			},
			{
				name: "DataStructures",
				thumbnail: "../ngCourse/uploads/2_DataStructures/thumbnails/1.jpg",
				url: "../ngCourse/uploads/2_DataStructures"
			},
			{
				name: "React",
				thumbnail: "../ngCourse/uploads/8_React_Native_Crash_Course/thumbnails/1.jpg",
				url: "../ngCourse/uploads/8_React_Native_Crash_Course"
			},
			{
				name: "Handlebars",
				thumbnail: "../ngCourse/uploads/3_Handlebars/thumbnails/1.jpg",
				url: "../ngCourse/uploads/3_Handlebars"
			}
        ];
	}else if($rootScope.userName=="Purushottam"){
		vm.courses = [
			{
				name: "AngularJS",
				thumbnail: "../ngCourse/uploads/1_AngularJS/thumbnails/1.jpg",
				url:"../ngCourse/uploads/1_AngularJS"
			},
			{
				name: "Java",
				thumbnail: "../ngCourse/uploads/4_Java_Advanced/thumbnails/1.jpg",
				url: "../ngCourse/uploads/4_Java_Advanced"
			},
			{
				name: "React",
				thumbnail: "../ngCourse/uploads/8_React_Native_Crash_Course/thumbnails/1.jpg",
				url: "../ngCourse/uploads/8_React_Native_Crash_Course"
			},
			{
				name: "Handlebars",
				thumbnail: "../ngCourse/uploads/3_Handlebars/thumbnails/1.jpg",
				url: "../ngCourse/uploads/3_Handlebars"
			}
        ];
		
	}else if($rootScope.userName=="Rishi"){
		vm.courses = [
			{
				name: "Java",
				thumbnail: "../ngCourse/uploads/4_Java_Advanced/thumbnails/1.jpg",
				url: "../ngCourse/uploads/4_Java_Advanced"
			},
			{
				name: "React",
				thumbnail: "../ngCourse/uploads/8_React_Native_Crash_Course/thumbnails/1.jpg",
				url: "../ngCourse/uploads/8_React_Native_Crash_Course"
			},
			{
				name: "Handlebars",
				thumbnail: "../ngCourse/uploads/3_Handlebars/thumbnails/1.jpg",
				url: "../ngCourse/uploads/3_Handlebars"
			}
        ];
		
	}else if($rootScope.userName=="Student"){
		vm.courses = [
			{
				name: "Java",
				thumbnail: "../ngCourse/uploads/4_Java_Advanced/thumbnails/1.jpg",
				url: "../ngCourse/uploads/4_Java_Advanced"
			},
			{
				name: "React",
				thumbnail: "../ngCourse/uploads/8_React_Native_Crash_Course/thumbnails/1.jpg",
				url: "../ngCourse/uploads/8_React_Native_Crash_Course"
			},
			{
				name: "Handlebars",
				thumbnail: "../ngCourse/uploads/3_Handlebars/thumbnails/1.jpg",
				url: "../ngCourse/uploads/3_Handlebars"
			}
        ];
		
	}else{
		vm.courses = [
			{
				name: "AngularJS",
				thumbnail: "../ngCourse/uploads/1_AngularJS/thumbnails/1.jpg",
				url:"../ngCourse/uploads/1_AngularJS"
			},
			{
				name: "DataStructures",
				thumbnail: "../ngCourse/uploads/2_DataStructures/thumbnails/1.jpg",
				url: "../ngCourse/uploads/2_DataStructures"
			},
			{
				name: "Java",
				thumbnail: "../ngCourse/uploads/4_Java_Advanced/thumbnails/1.jpg",
				url: "../ngCourse/uploads/4_Java_Advanced"
			},
			{
				name: "Oracle",
				thumbnail: "../ngCourse/uploads/7_Oracle/thumbnails/1.jpg",
				url: "../ngCourse/uploads/7_Oracle"
			},
			{
				name: "React",
				thumbnail: "../ngCourse/uploads/8_React_Native_Crash_Course/thumbnails/1.jpg",
				url: "../ngCourse/uploads/8_React_Native_Crash_Course"
			},
			{
				name: "Handlebars",
				thumbnail: "../ngCourse/uploads/3_Handlebars/thumbnails/1.jpg",
				url: "../ngCourse/uploads/3_Handlebars"
			}
        ];
	}
    
    console.log("coming to Websites controller");
	vm.openCourse = function(courseLnk){
		//alert(courseLnk);
		var left = (screen.width/2);
        var top = (screen.height/2);
		$window.open(courseLnk, '_blank', 'location=yes,height=700,width=700,scrollbars=no,status=yes','top="+top+"','left="+left+"');
	};

}]);

