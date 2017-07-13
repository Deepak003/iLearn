/**
 * @appName    Quizzler
 * @version    0.0.2
 * @date       2017-07-02
 * @homepage   http://ust-global.com
 * @copyright  2017 Deepak Tiwari [ Emp Id: U43779 ] <deepak.tiwari@ust-global.com>
 */
(function(e){"use strict";e("utils/supplant",[],function(){var e=function(e,t,n){return n=n||/\{([^\{\}]*)\}/g,e.replace(n,function(e,n){var r=n.split("."),i=t;try{for(var s in r)i=i[r[s]]}catch(o){i=e}return typeof i=="string"||typeof i=="number"?i:e})};return Function.prototype.method=function(e,t){return this.prototype[e]=t,this},String.method("supplant",function(t,n){var r=this;return e(r,t,n)}),String.supplant=e})})(define),function(e){"use strict";define("utils/makeTryCatch",[],function(){return e.makeTryCatch=function(t,n){var r=function(e){if(t!=null){var r=e&&e.stack?e:null,i=e!=null?String(e):"";r!=null&&(i=r.message+"\n"+r.stack),t.apply(n,[i])}return e},i=function(t,n,i){try{var s=e.isFunction(t)?t.apply(n,i||[]):String(t),o=e.isObject(s)&&s.then?s:null;return o!=null&&o.then(null,r),t=null,s}catch(u){throw t=null,r(u)}};return i},e.makeTryCatch})}(angular),function(){"use strict";define("utils/DateTime",[],function(){var e=function(e,t){function n(e,t){return typeof t=="undefined"&&(t=!1),t&&(e<10?e="00"+e:e<100&&(e="0"+e)),e.toString().length<2?"0"+e:e}return t=t||"%h:%m:%s:%z",t.replace(/%([a-zA-Z])/g,function(t,r){switch(r){case"Y":return e.getFullYear();case"M":return n(e.getMonth()+1);case"d":return n(e.getDate());case"h":return n(e.getHours());case"m":return n(e.getMinutes());case"s":return n(e.getSeconds());case"z":return n(e.getMilliseconds(),!0);default:throw new Error("Unsupported format code: "+r)}})};return{formattedNow:function(){return e(new Date)}}})}(),function(e){"use strict";define("utils/BrowserDetect",[],function(){var t={init:function(){return this.browser=this.searchString(this.dataBrowser)||"An unknown browser",this.version=this.searchVersion(e.userAgent)||this.searchVersion(e.appVersion)||"an unknown version",this.OS=this.searchString(this.dataOS)||"an unknown OS",t},isIE8:function(){return document.documentElement.hasAttribute("class")&&document.documentElement.getAttribute("class")==="ie8"?!0:!1},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string,r=e[t].prop;this.versionSearchString=e[t].versionSearch||e[t].identity;if(n){if(n.indexOf(e[t].subString)!=-1)return e[t].identity}else if(r)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t==-1)return;return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:"PhantomJS",subString:"PhantomJS",identity:"PhantomJS",versionSearch:"PhantomJS"},{string:e.userAgent,subString:"Chrome",identity:"Chrome"},{string:e.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:e.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:e.vendor,subString:"iCab",identity:"iCab"},{string:e.vendor,subString:"KDE",identity:"Konqueror"},{string:e.userAgent,subString:"Firefox",identity:"Firefox"},{string:e.vendor,subString:"Camino",identity:"Camino"},{string:e.userAgent,subString:"Netscape",identity:"Netscape"},{string:e.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:e.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:e.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:e.platform,subString:"Win",identity:"Windows"},{string:e.platform,subString:"Mac",identity:"Mac"},{string:e.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:e.platform,subString:"Linux",identity:"Linux"}]};return t.init()})}(window.navigator),function(){"use strict";define("utils/logger/LogEnhancer",["utils/supplant","utils/makeTryCatch","utils/DateTime","utils/BrowserDetect"],function(e,t,n,r){var i=function(t){var i="::",s=function(e){return{log:e.log,info:e.info,warn:e.warn,debug:e.debug,error:e.error}}(t),o=function(e,t){var n=r.browser=="Chrome",i=n&&t!==undefined;return i?["%c"+e,t]:[e]},u=function(r,i,s){var u=function(){try{var u=Array.prototype.slice.call(arguments),a=n.formattedNow();u[0]=e("{0} - {1}{2}",[a,i,u[0]]),u=o(e.apply(null,u),s),r.apply(null,u)}catch(f){t.error("LogEnhancer ERROR: "+f)}};return u.logs=[],u},a=function(e,t,n){e=e!==undefined?e+(n||i):"";var r={log:u(s.log,e,t),info:u(s.info,e,t),warn:u(s.warn,e,t),debug:u(s.debug,e,t),error:u(s.error,e)};return angular.isDefined(angular.makeTryCatch)&&(r.tryCatch=angular.makeTryCatch(r.error,r)),r};return t.getInstance=a,t};return i})}(),function(){"use strict";define("utils/logger/ExternalLogger",["utils/logger/LogEnhancer","utils/BrowserDetect"],function(e,t){var n=function(e){var n=window.console,r=function(e){return typeof e==typeof Function},i=function(e){var i=t.browser!="PhantomJS";return n&&n[e]&&r(n[e])},s=function(t){if(i(e))try{n[e](t)}catch(r){}};return s},r={log:n("log"),info:n("info"),warn:n("warn"),debug:n("debug"),error:n("error")};return new e(r)})}(),function(){"use strict";define("utils/logger/LogDecorator",["utils/logger/LogEnhancer"],function(e){var t=function(t){t.decorator("$log",["$delegate",function(t){return e(t),t}])};return["$provide",t]})}(),function(e){"use strict";e("auth/Session",[],function(){var e=function(e,t){return e||t},t=function(t){return n.account.userName=e(t,!1)?"":n.account.userName,n.account.password="",n.account.email="",n.sessionID=null,n.quiz=undefined,n.score=undefined,n.selectedQuiz=1,n},n={account:{userName:"",password:"",email:""},sessionID:null,clear:t,logout:t,selectedQuiz:1};return function(){return n}})}(define),function(){"use strict";define("utils/createGuid",[],function(){function e(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=Math.random()*16|0,n=e==="x"?t:t&3|8;return n.toString(16)})}return e})}(),function(e){"use strict";e("utils/crypto/md5",[],function(){function e(e,t){var o=e[0],u=e[1],a=e[2],f=e[3];o=n(o,u,a,f,t[0],7,-680876936),f=n(f,o,u,a,t[1],12,-389564586),a=n(a,f,o,u,t[2],17,606105819),u=n(u,a,f,o,t[3],22,-1044525330),o=n(o,u,a,f,t[4],7,-176418897),f=n(f,o,u,a,t[5],12,1200080426),a=n(a,f,o,u,t[6],17,-1473231341),u=n(u,a,f,o,t[7],22,-45705983),o=n(o,u,a,f,t[8],7,1770035416),f=n(f,o,u,a,t[9],12,-1958414417),a=n(a,f,o,u,t[10],17,-42063),u=n(u,a,f,o,t[11],22,-1990404162),o=n(o,u,a,f,t[12],7,1804603682),f=n(f,o,u,a,t[13],12,-40341101),a=n(a,f,o,u,t[14],17,-1502002290),u=n(u,a,f,o,t[15],22,1236535329),o=r(o,u,a,f,t[1],5,-165796510),f=r(f,o,u,a,t[6],9,-1069501632),a=r(a,f,o,u,t[11],14,643717713),u=r(u,a,f,o,t[0],20,-373897302),o=r(o,u,a,f,t[5],5,-701558691),f=r(f,o,u,a,t[10],9,38016083),a=r(a,f,o,u,t[15],14,-660478335),u=r(u,a,f,o,t[4],20,-405537848),o=r(o,u,a,f,t[9],5,568446438),f=r(f,o,u,a,t[14],9,-1019803690),a=r(a,f,o,u,t[3],14,-187363961),u=r(u,a,f,o,t[8],20,1163531501),o=r(o,u,a,f,t[13],5,-1444681467),f=r(f,o,u,a,t[2],9,-51403784),a=r(a,f,o,u,t[7],14,1735328473),u=r(u,a,f,o,t[12],20,-1926607734),o=i(o,u,a,f,t[5],4,-378558),f=i(f,o,u,a,t[8],11,-2022574463),a=i(a,f,o,u,t[11],16,1839030562),u=i(u,a,f,o,t[14],23,-35309556),o=i(o,u,a,f,t[1],4,-1530992060),f=i(f,o,u,a,t[4],11,1272893353),a=i(a,f,o,u,t[7],16,-155497632),u=i(u,a,f,o,t[10],23,-1094730640),o=i(o,u,a,f,t[13],4,681279174),f=i(f,o,u,a,t[0],11,-358537222),a=i(a,f,o,u,t[3],16,-722521979),u=i(u,a,f,o,t[6],23,76029189),o=i(o,u,a,f,t[9],4,-640364487),f=i(f,o,u,a,t[12],11,-421815835),a=i(a,f,o,u,t[15],16,530742520),u=i(u,a,f,o,t[2],23,-995338651),o=s(o,u,a,f,t[0],6,-198630844),f=s(f,o,u,a,t[7],10,1126891415),a=s(a,f,o,u,t[14],15,-1416354905),u=s(u,a,f,o,t[5],21,-57434055),o=s(o,u,a,f,t[12],6,1700485571),f=s(f,o,u,a,t[3],10,-1894986606),a=s(a,f,o,u,t[10],15,-1051523),u=s(u,a,f,o,t[1],21,-2054922799),o=s(o,u,a,f,t[8],6,1873313359),f=s(f,o,u,a,t[15],10,-30611744),a=s(a,f,o,u,t[6],15,-1560198380),u=s(u,a,f,o,t[13],21,1309151649),o=s(o,u,a,f,t[4],6,-145523070),f=s(f,o,u,a,t[11],10,-1120210379),a=s(a,f,o,u,t[2],15,718787259),u=s(u,a,f,o,t[9],21,-343485551),e[0]=h(o,e[0]),e[1]=h(u,e[1]),e[2]=h(a,e[2]),e[3]=h(f,e[3])}function t(e,t,n,r,i,s){return t=h(h(t,e),h(r,s)),h(t<<i|t>>>32-i,n)}function n(e,n,r,i,s,o,u){return t(n&r|~n&i,e,n,s,o,u)}function r(e,n,r,i,s,o,u){return t(n&i|r&~i,e,n,s,o,u)}function i(e,n,r,i,s,o,u){return t(n^r^i,e,n,s,o,u)}function s(e,n,r,i,s,o,u){return t(r^(n|~i),e,n,s,o,u)}function o(t){var n=t.length,r=[1732584193,-271733879,-1732584194,271733878],i;for(i=64;i<=t.length;i+=64)e(r,u(t.substring(i-64,i)));t=t.substring(i-64);var s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(i=0;i<t.length;i++)s[i>>2]|=t.charCodeAt(i)<<(i%4<<3);s[i>>2]|=128<<(i%4<<3);if(i>55){e(r,s);for(i=0;i<16;i++)s[i]=0}return s[14]=n*8,e(r,s),r}function u(e){var t=[],n;for(n=0;n<64;n+=4)t[n>>2]=e.charCodeAt(n)+(e.charCodeAt(n+1)<<8)+(e.charCodeAt(n+2)<<16)+(e.charCodeAt(n+3)<<24);return t}function f(e){var t="",n=0;for(;n<4;n++)t+=a[e>>n*8+4&15]+a[e>>n*8&15];return t}function l(e){for(var t=0;t<e.length;t++)e[t]=f(e[t]);return e.join("")}function c(e){return l(o(e))}var a="0123456789abcdef".split(""),h=function(e,t){return e+t&4294967295};return c("hello")!=="5d41402abc4b2a76b9719d911017c592"&&(h=function(e,t){var n=(e&65535)+(t&65535),r=(e>>16)+(t>>16)+(n>>16);return r<<16|n&65535}),function(){return{encrypt:c}}})}(define),function(e){"use strict";e("auth/Authenticator",["utils/supplant","utils/createGuid","utils/crypto/md5"],function(e,t,n){var r=function(e,n,r){r=r.getInstance("Authenticator");var i=function(e){var t=n.defer();return t.resolve(e),t.promise},s=function(e){var t=n.defer();return t.reject(e),t.promise},o=function(e,n){return r.debug("loginUser( email={0}, password={1} )",[e,n]),e===""?s("A valid email is required!"):i({session:t(),email:e})},u=function(){return r.debug("logoutUser()"),i({session:null})},a=function(e,t,n){return r.debug("changePassword ( email={0}, newPassword={1}",[e,newPasword]),i({email:e,password:t})},f=function(e,t,n){return r.debug("resetPassword( password={0}, hint={1}",[t,n]),a(e,t)};return{login:o,logout:u,changePassword:a,resetPassword:f}};return["$http","$q","$log",r]})}(define),function(e){"use strict";e("auth/SessionController",["utils/supplant"],function(e){var t="/login",n=function(e,n,r,i){var s=function(){e&&!e.sessionID&&i.path()!=t&&(r.debug("session is invalid - routing to '{0}' ",[t]),i.path(t))};r=r.getInstance("SessionController"),r.debug("constructor() "),n.$on("$routeChangeSuccess",function(){s()}),n.$watch(function(){return e.sessionID},s)};return["session","$rootScope","$log","$location",n]})}(define),function(e){"use strict";e("auth/LoginController",["utils/supplant"],function(e){var t="The Quizzler server is not responding",n="Unable to connect to secure Quizzler dataservices",r="Dataservice did not respond and timed out.",i="404 Not Found",s=function(s,o,u,a,f,l){f=f.getInstance("LoginController"),f.debug("constructor() ");var c=function(){var e="This feature is not yet available!";f.error(e)},h=function(e){return u.hasError=e!=="",u.errorMessage=u.errorMessage||"",angular.isUndefined(e)||(u.errorMessage=e||"",u.title=n),u.errorMessage},p=function(){f.debug("onLogin( email={email}, password={password} )",u),f.tryCatch(function(){return o.login(u.email,u.password).then(function(t){return f.debug("onResult_login( sessionID={session}",t),s.sessionID=t.session,s.account={userName:u.email,password:u.password,email:u.email},h(""),l.path("/quiz"),s},function(o){return o=o||t,o=e(String(o),["onLogin()"]),f.error(o.toString()),s.sessionID=null,h(o.toString()),o==r&&h(t),o==i&&h(i),a.reject(o)})})},d=function(){f.debug("onLogout( )"),f.tryCatch(function(){return o.logout().then(function(){return f.debug("onResult_logout()"),u.sessionID=null,s.sessionID=null,h(""),s},function(n){return n=n||t,f.error(n.toString()),s.sessionID=null,h(n),n==r&&h(t),n==i&&h(i),a.rejected(s)})})};u.email="ThomasBurleson@gmail.com",u.password="none",u.sessionID=s.sessionID,u.errorMessage="",u.submit=p,u.logout=d,u.register=c};return["session","authenticator","$scope","$q","$log","$location",s]})}(define),function(e,t){"use strict";e("auth/AuthenticateModule",["auth/Session","auth/Authenticator","auth/SessionController","auth/LoginController"],function(e,n,r,i){var s="quizzer.Authenticate";return t.module(s,[]).service("session",e).service("authenticator",n).controller("SessionController",r).controller("LoginController",i),s})}(define,angular),function(e){"use strict";e("quiz/controllers/TestController",["utils/supplant"],function(e){var t="/quiz/{index}",n="/scoring",r="Before you can continue, please select your answer!",i=function(i,s,o,u,a,f,l){f=f.getInstance("TestController"),f.debug("constructor() ");var c=s.quiz,h=function(){var n=null,s="";f.debug("nextQuestion( )");if(i.challenge&&i.challenge.selected===undefined){f.warn(r),l.alert(r);return}n=c.nextQuestion(),s=e(t,n),f.debug("Navigating to the '{0}' view...",[s]),u.path(s)},p=function(){f.debug("submitTest()"),f.tryCatch(function(){return o.submitQuiz(c).then(function(t){f.debug(e("onResult_submitTest( Test Score = {totalScore} )",[t])),s.score=t,s.quiz=null,f.debug("Navigating to the '/scoring' view..."),u.path(n)})})},d=function(t){f.debug(e("loadQuiz( quiz ID = {0} )",[t])),f.tryCatch(function(){return o.loadQuiz(t).then(function(t){f.debug(e("onResult_loadQuiz( quizID = {0} )",[t.uid])),s.quiz=c=t,i.quizName=c.name,h()})})},v=function(e){return i.challenge&&i.challenge.index===e},m=function(e){var t=null;return e=e||a.question||1,i.next=h,i.btnTitle="Continue",c&&angular.isDefined(e)&&!v(e)&&(f.debug("loadBookMarkedQuestion( index = {0} )",[e]),t=c.seekQuestion(e),f.debug(" current question = {index} ",t),i.next=c.hasNext()?h:p,i.btnTitle=c.hasNext()?"Continue":"Submit"),t};s.sessionID&&(!c||c.uid!=s.selectedQuiz)&&d(s.selectedQuiz),i.quizName=c?c.name:"",i.challenge=m()};return["$scope","session","quizDelegate","$location","$routeParams","$log","$window",i]})}(define),function(e){"use strict";e("quiz/controllers/ScoreController",["utils/supplant"],function(e){var t=function(e,t,n){n=n.getInstance("ScoreController"),n.debug("constructor() "),e.title=t.score?t.score.quizName:0,e.grade=t.score?t.score.totalScore:0,e.scores=t.score?t.score.items:[],e.email=t.account.email,e.logout=t.logout};return["$scope","session","$log",t]})}(define),function(e){"use strict";e("quiz/RouteManager",["utils/logger/ExternalLogger","auth/LoginController","quiz/controllers/TestController","quiz/controllers/ScoreController"],function(e,t,n,r){var i=function(t){e.debug("Configuring $routeProvider..."),t.when("/login",{templateUrl:"./assets/views/login.tpl.html",controller:"LoginController"}).when("/quiz/:question?",{templateUrl:"./assets/views/quiz.tpl.html",controller:"TestController"}).when("/scoring",{templateUrl:"./assets/views/score.tpl.html",controller:"ScoreController"}).otherwise({redirectTo:"/login"})};return e=e.getInstance("RouteManager"),["$routeProvider",i]})}(define),function(){"use strict";define("utils/Factory",[],function(){function e(e,t){return[].slice.call(e,t||0)}function t(e){return angular.isArray(e)&&(e=e[e.length-1]),e}var n=function(){var n=e(arguments),r=t(n.shift());if(angular.isFunction(r))return r.length>0?r.apply(undefined,n):new r;throw new Error("Specified target is not a constructor function or constructor array")};return{instanceOf:n}})}(),function(e,t){"use strict";e("quiz/builders/QuizBuilder",["utils/supplant","utils/logger/ExternalLogger"],function(e,n){var r=function(){n=n.getInstance("QuizBuilder");var e=function(e){var r=null,i=-1,s=0,o=function(){var e=s>0&&i>-1&&i<s-1;return e?r.questions[i]:null},u=function(e){var t,n;return e-=1,t=s>0&&e>-1&&e<s,n=t?r.questions[e]:null,i=t?e:i,n},a=function(){return s&&i<s-1},f=function(){return a()?r.questions[++i]:null},l=function(){i=-1,t.every(r.questions,function(e){e.hasOwnProperty("selected")&&(e.selected=undefined)})},c=function(e){return t.each(e.questions,function(e,t){e.index=t+1}),e},h=function(){return n.debug("buildQuizInstance()"),s=e.questions.length,r={uid:e.uid,name:e.name,current:o,questions:[].concat(e.questions),calculateScore:undefined,reset:l,hasNext:a,nextQuestion:f,seekQuestion:u},c(r)};return n.debug("buildFromJSON()"),e==null&&(e={}),e.questions==null&&(e.questsions=[]),h()};return{fromJSON:e}};return["$log",r]})}(define,_),function(e,t){"use strict";e("quiz/builders/ScoreBuilder",["utils/supplant","utils/logger/ExternalLogger"],function(e,n){var r=["A","B","C","D","E","F","G","H"],i=function(){n=n.getInstance("ScoreBuilder");var i=function(i){var s={expected:[],given:[]},o=function(){n.debug("gatherAnswers()"),s.expected=t.pluck(i.questions,"answer"),s.given=t.pluck(i.questions,"selected"),t.every(i.questions,function(e){e.hasOwnProperty("selected")&&delete e.selected})},u=function(){var e,t=0,r=s.expected.length,i=s.expected,o=s.given;n.debug("calculateTotal()");for(e=0;e<r;e++){if(e>=o.length)break;i[e]==o[e]&&(t+=1)}return Math.min(100,Math.ceil(t/r*100))},a=function(){var t,o=[],u=!1,a=null,f=s.expected,l=s.given,c=f.length,h=function(e){return a.choices[e]},p=function(e){return r[e]};n.debug("buildReviewList()");for(t=0;t<c;t++)a=i.questions[t],u=f[t]==l[t],o.push({index:t+1,title:a.question,details:a.details,correct:u,expected:e("{0}. {1}",[p(f[t]),h(f[t])]),answered:u?e("{0}. {1}",[p(l[t]),h(l[t])]):l[t]!=null?e("{0}. {1}",[p(l[t]),h(l[t])]):"- no answer given -"});return o},f=function(){var t;return n.debug("buildScoreInstance()"),o(),t={quizName:i.name,totalScore:u(),items:a()},n.debug(e("calculateScore() == {totalScore} ",t)),t};return f()};return{calculateScore:i}};return["$log",i]})}(define,_),function(e){"use strict";var t="./assets/data/quiz_{id}.json";e("quiz/delegates/QuizDelegate",["utils/supplant","utils/Factory","quiz/builders/QuizBuilder","quiz/builders/ScoreBuilder"],function(e,n,r,i){var s=n.instanceOf(r),o=n.instanceOf(i),u=function(n,r,i){i=i.getInstance("QuizDelegate");var u=function(e){var t=r.defer();return t.resolve(e),t.promise},a=function(r){var o=e(t,{id:r});return i.debug("loadQuiz( quizID={0} )",[r]),n.get(o).then(function(e){return s.fromJSON(e.data)})},f=function(e,t){return i.debug("submitQuiz()"),u(o.calculateScore(e))};return{loadQuiz:a,submitQuiz:f}};return["$http","$q","$log",u]})}(define),function(e,t){"use strict";e("quiz/QuizModule",["quiz/delegates/QuizDelegate","quiz/controllers/TestController","quiz/controllers/ScoreController"],function(e,n,r){var i="quizzer.Quiz";return t.module(i,[]).service("quizDelegate",e).controller("TestController",n).controller("ScoreController",r),i})}(define,angular),function(e){"use strict";e("main",["utils/logger/ExternalLogger","utils/logger/LogDecorator","auth/AuthenticateModule","quiz/RouteManager","quiz/QuizModule"],function(e,t,n,r,i){var s,o="quizzer.OnlineTest";return e=e.getInstance("BOOTSTRAP"),e.debug("Initializing {0}",[o]),s=angular.module(o,["ngRoute","ngSanitize",n,i]).config(t).config(r),angular.bootstrap(document.getElementsByTagName("body")[0],[o]),s})}(define);