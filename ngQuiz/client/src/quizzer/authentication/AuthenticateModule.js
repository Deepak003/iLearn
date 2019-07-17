/**
 * ******************************************************************************************************
 *
 *   QuizModule
 *
 *   Defines controllers and services for the Authentication Module Quiz
 *
 *  @author     Manu Tiwari [ Emp Id: U43779 ]
 *  @date       June 2017
 *
 * ******************************************************************************************************
 */

(function ( define, angular ) {
    "use strict";

    define([
            'auth/Session',
            'auth/Authenticator',
            'auth/SessionController',
            'auth/LoginController'
        ],
        function ( Session, Authenticator, SessionController, LoginController )
        {
            var moduleName = "quizzer.Authenticate";

            angular
                .module(     moduleName,    [ ]                     )
                .service(    "session",           Session           )
                .service(    "authenticator",     Authenticator     )
                .controller( "SessionController", SessionController )
                .controller( "LoginController",   LoginController   );

            return moduleName;
        });


}( define, angular ));

