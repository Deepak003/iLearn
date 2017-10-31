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
     vm.user=$rootScope.userName;

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
	vm.addChat = function(){
		alert(vm.chat);
		var _oldHtml= document.getElementById("iChatDivId").innerHTML;
		var _newHtml  = "<div class='direct-chat-msg'><div class='direct-chat-info clearfix'><span class='direct-chat-name pull-left'>{{vm.user}}</span><span class='direct-chat-timestamp pull-right'>30 Oct 1017 2:00 pm</span></div><img class='direct-chat-img' src=## alt='message user image'><div class='direct-chat-text'>{{vm.chat}}</div></div>";
		_newHtml = _newHtml.replace('{{vm.user}}',vm.user);
		_newHtml = _newHtml.replace('{{vm.chat}}',vm.chat);
		var img = "../../../../ngDashboard/images/user-pic/"+vm.user+".jpg";
		_newHtml = _newHtml.replace('##',img);
		
		document.getElementById("iChatDivId").innerHTML= _oldHtml + _newHtml;
		//var left = (screen.width/2);
        //var top = (screen.height/2);
		//$window.open(courseLnk, '_blank', 'location=yes,height=700,width=700,scrollbars=no,status=yes','top="+top+"','left="+left+"');
	};
	
	    /*
		The following is not free software. You may use it for educational purposes, but you may not redistribute or use it commercially.
		(C) All Rights Reserved, Burak Kanber 2013
		*/

		// Define a couple of global variables so we can easily inspect data points we guessed incorrectly on.
		var incorrectNegs = [];
		var incorrectPos = [];

		// A list of negation terms that we'll use to flag nearby tokens
		var negations = new RegExp("^(never|no|nothing|nowhere|noone|none|not|havent|hasnt|hadnt|cant|couldnt|shouldnt|wont|wouldnt|dont|doesnt|didnt|isnt|arent|aint)$");

		// Use 85% of our data set for training, the remaining 15% will be used for testing.
		var length = negatives.length;
		var split = Math.floor(0.85 * length);

		// Don't spit out console.log stuff during training and guessing. 
		Bayes.debug = false;

		// Close-proximity negation-marked unigram ("eMSU")
		Bayes.tokenizer = function (text) {
			// Standard unigram tokenizer; lowercase, strip special characters, split by whitespace
			text = Bayes.unigramTokenizer(text);
			// Step through our array of tokens
			for (var i = 0, len = text.length; i < len; i++) {
				// If we find a negation word, add an exclamation point to the word preceding and following it.
				if (text[i].match(negations)) {
					if (typeof text[i + 1] !== 'undefined') text[i + 1] = "!" + text[i + 1];
					if (typeof text[i - 1] !== 'undefined') text[i - 1] = "!" + text[i - 1];
				}
			}
			// Porter Stemmer; this reduces entropy a bit
			text = text.map(function (t) { return stemmer(t); });
			return text;
		};

		// Set the storage engine to in-memory; this example has too much data for localStorage.
		Bayes.storage = Storage;

		// Runs a single training and testing experiment.
		function go() {

			// Start from scratch.
			var correct = 0;
			var incorrect = 0;
			var skipped = 0;
			var trainingBar = document.getElementById("trainingProgressBar");
			var trainingVal = document.getElementById("trainingProgressValue");
			var trainingPct = 0;
			var resultsBar = document.getElementById("testResultsBar");
			var resultsVal = document.getElementById("testResultsValue");
			var resultsPct = 0.0;
			
			Bayes.storage._data = {};

			// Shuffle our arrays. I'm sure some really astute CS genius will find a flaw with this ;)
			negatives.sort(function () { return Math.random() - 0.5; });
			positives.sort(function () { return Math.random() - 0.5; });

			// First we train. Walk through the data until we hit our split/pivot point.
			// Unfortunately our progress bar doesn't work because of the browser's JS event loop,
			// And retooling to use animation frames is more annoying than it's worth.
			
			for (var i = 0; i < split; i++) {
				Bayes.train(negatives[i], 'negative');
				Bayes.train(positives[i], 'positive');
				if (i % 500 === 0) {       
					// Next three lines are largely useless.
					trainingPct = Math.round(i*100 / split);
					trainingVal.innerHTML = trainingPct;
					trainingBar.style.width = trainingPct + '%';
					// If you want live updates, look at the console.
					console.log("Training progress: " + trainingPct + "%");
				}
			}
			
			// Clean up the progress bar for the final state.
			trainingPct = 100;
			trainingVal.innerHTML = trainingPct;
			trainingBar.style.width = trainingPct + '%';

			// Now we guess. Look at the remainder of the data set and test each of those.
			for (var i = split; i < length; i++) {
				var negResult = Bayes.extractWinner(Bayes.guess(negatives[i]));
				var posResult = Bayes.extractWinner(Bayes.guess(positives[i]));

				// Probability less than 75%? Skip it. No sense in making guesses that we know are uncertain.
				if (negResult.score < 0.75) skipped++;
				else if (negResult.label === 'negative') correct++;
				else {
					incorrect++;
					incorrectNegs.push(negatives[i]);
				}

				// Repeat for the corresponding positive data point.
				if (posResult.score < 0.75) skipped++;
				else if (posResult.label === 'positive') correct++;
				else {
					incorrect++;
					incorrectPos.push(positives[i]);
				}
			}

			// Show the accuracy for this training/testing run.
			resultsPct = Math.round(10000 * correct / (correct + incorrect)) / 100;
			resultsBar.style.width = Math.round(resultsPct) + '%';
			resultsVal.innerHTML = resultsPct;
			return resultsPct;
		}

		document.getElementById("testButton").addEventListener('click', function() {
			var text = document.getElementById("testBox").value;
			var result = Bayes.extractWinner(Bayes.guess(text));
			document.getElementById("testBox").value = '';
			document.getElementById("testResultLabel").innerHTML = result.label;
			document.getElementById("testResultProbability").innerHTML = Math.round(100*result.score);
			document.getElementById("testResult").style.display = 'block';
		});

		setTimeout(go, 500);

		// We're not using this function in the public example, but this is a simple helper to run 30 tests at a time and record and average their scores.
		function run() {
			var n = 30;
			var i = n;
			var scores = [];
			var sum = 0;
			while (i--) scores.push(go());
			scores.forEach(function (score) {
				sum += score;
			});

			console.log(scores);
			console.log("Average " + sum / n);
		}
}]);

