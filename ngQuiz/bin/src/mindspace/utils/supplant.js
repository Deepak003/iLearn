/**
 * @author      Manu Tiwari [ Emp Id: U43779 ]
 * @date        June 2017
 * @description
 *
 *  String supplant global utility (similar to but more powerful than sprintf() ).
 *
 *  Usages:
 *
 *      var user = {
 *              first : "Manu",
 *              last  : "Tiwari",
 *              address : {
 *                  city : "Bangalore",
 *                  state: "Karnataka"
 *              },
 *              contact : {
 *                  email : "Manu.tiwari@ust-global.com"
 *                  url   : "http://www.ust-global.com"
 *              }
 *          },
 *          message = "Hello Mr. {first} {last}. How's life in {address.city}, {address.state} ?";
 *
 *     return supplant( message, user );
 *
 *
 * @author Manu Tiwari [ Emp Id: U43779 ]
 *
 */
(function( define ) {
    "use strict";

    define( [], function ( )
    {
        // supplant() method from Crockfords `Remedial Javascript`

        var supplant =  function( template, values, pattern ) {
            pattern = pattern || /\{([^\{\}]*)\}/g;

            return template.replace(pattern, function(a, b) {
                var p = b.split('.'),
                    r = values;

                try {
                    for (var s in p) { r = r[p[s]];  }
                } catch(e){
                    r = a;
                }

                return (typeof r === 'string' || typeof r === 'number') ? r : a;
            });
        };


        // supplant() method from Crockfords `Remedial Javascript`
        Function.prototype.method = function (name, func) {
            this.prototype[name] = func;
            return this;
        };

        String.method("supplant", function( values, pattern ) {
            var self = this;
            return supplant(self, values, pattern);
        });


        // Publish this global function...
        return String.supplant = supplant;

    });

}( define ));
