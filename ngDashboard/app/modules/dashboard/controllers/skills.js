/*==========================================================
    Author      : Deepak Tiwari
    Date Created: 13 Jan 2017
    Description : Controller to handle Skills page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("SkillController", ['$rootScope', '$scope', '$window','$state', '$location', 'dashboardService', 'Flash',
function ($rootScope, $scope, $window,$state, $location, dashboardService, Flash) {
    var vm = this;

    vm.skills = {};

    //development stack
    vm.skills.development = [
        {
            Software: "Mongo DB",
            Percentage: "80",
            theme: "yellow",
            image: "mongodb"
        },
        {
            Software: "Express JS",
            Percentage: "75",
            theme: "aqua",
            image: "express"
        },
        {
            Software: "Angular JS",
            Percentage: "85",
            theme: "green",
            image: "angular"
        },
        {
            Software: "Node JS",
            Percentage: "83",
            theme: "purple",
            image: "node"
        },
        {
            Software: "Javascript",
            Percentage: "80",
            theme: "maroon",
            image: "javascript"
        },
        {
            Software: "Type Script",
            Percentage: "70",
            theme: "teal",
            image: "typescript"
        },
        {
            Software: "jQuery & AJAX",
            Percentage: "80",
            theme: "yellow",
            image: "jquery"
        },
        {
            Software: "Joomla",
            Percentage: "85",
            theme: "red",
            image: "joomla"
        }
    ];

    //Design Stack
    vm.skills.design = [
        {
            Software: "HTML 5",
            Percentage: "90",
            theme: "yellow",
            image: "html5"
        },
        {
            Software: "CSS 3",
            Percentage: "83",
            theme: "aqua",
            image: "css3"
        },
        {
            Software: "SAAS",
            Percentage: "72",
            theme: "green",
            image: "saas-css"
        },
        {
            Software: "Bootstrap",
            Percentage: "85",
            theme: "purple",
            image: "bootstrap"
        },
        {
            Software: "Photo Shop",
            Percentage: "90",
            theme: "maroon",
            image: "Photoshop"
        },
        {
            Software: "Corel Draw",
            Percentage: "95",
            theme: "teal",
            image: "coreldraw"
        },
        {
            Software: "Flash",
            Percentage: "65",
            theme: "yellow",
            image: "flash"
        }
    ];

    //Other Stack
    vm.skills.others = [
        {
            Software: "Java",
            Percentage: "60",
            theme: "aqua",
            image: "java",
        },
        {
            Software: "SQL",
            Percentage: "70",
            theme: "purple",
            image: "sql"
        },
        {
            Software: "Hardware",
            Percentage: "87",
            theme: "maroon",
            image: "hardware"
        },
        {
            Software: "Cloud Computing",
            Percentage: "72",
            theme: "yellow",
            image: "cloud"
        }
    ];
	
	vm.openQuiz = function(quizId){
		//alert("hi");
		$window.quizId = quizId;
		var left = (screen.width/2);
        var top = (screen.height/2);
		$window.open("../ngQuiz/client/index.html", '_blank', 'location=yes,height=600,width=500,scrollbars=no,status=yes','top="+top+"','left="+left+"');
	};
}]);

