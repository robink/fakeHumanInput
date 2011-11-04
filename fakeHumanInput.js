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
      

    $(this).removeData('fakeHumanInputStop');

    return this.each( function() {
      var that = this,
        $this = $(this),
        i = 0;

      var prependContent = "";
      if ( settings['append'] ) {
        if ( that.nodeName.toLowerCase() == "textarea" || that.nodeName.toLowerCase() == "input" )
          prependContent = $this.val();
        else
          prependContent = $this.html();
      }

      var writeNextChar = function() {
        if ( $this.data('fakeHumanInputStop') === true ) {
          $this.removeData('fakeHumanInputStop');
          return;
        }

        var newVal = content.substr(0, i);

        i++;

        if ( that.nodeName.toLowerCase() == "textarea" || that.nodeName.toLowerCase() == "input" )
          $this.val( prependContent + newVal );
        else
          $this.html( prependContent +  newVal )

        if ( i <= charCount ) {
          var nextInterval = settings['speed'] * ( 1 + ( Math.random() * 2 - 1) );

          setTimeout( writeNextChar , nextInterval );
        }
        else
          $this.trigger( 'fakeHumanInputEnd' )
      };

      writeNextChar();

      return this;
    });
  },

  stop : function() {
    var $this = $(this);
    $this.data('fakeHumanInputStop', true);

    return this;
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