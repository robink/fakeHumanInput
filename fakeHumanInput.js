/**
 * Copyright 2011 Robin Komiwes
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

(function($) {

var methods = {
  init : function( options ) {
    var settings = {
      speed: 30
    };

    if ( options ) 
      $.extend( settings, options );

    var content = settings['content'];
    if ( ! content ) 
      return;

    var charCount = content.length;

    return this.each( function() {
      var $this = $(this),
        i = 0;

      var writeNextChar = function() {
        var newVal = content.substr(0, i);

        i++;

        $this.val( newVal );

        if ( i <= charCount ) {
          var nextInterval = settings['speed'] * ( 1 + ( Math.random() * 2 - 1) );

          setTimeout( writeNextChar , nextInterval );
        }
        else
          $this.trigger( 'fakeHumanInputEnd' )
      };

      writeNextChar();
    });
  }
};

$.fn.fakeHumanInput = function( method ) {
  if ( methods[method] ) {
    return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
  } else if ( typeof method === 'object' || ! method ) {
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist.' );
  }      
};

})(jQuery);