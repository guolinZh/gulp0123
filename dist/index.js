"use strict";function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}$.ajax("htttp://localhost:8080/proxydouban/v2/movie/top250").then(function(e){console.log(e)});var Foo=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"construtor",value:function(){this.a=10}}]),e}();new Foo;