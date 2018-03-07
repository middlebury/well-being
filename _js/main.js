if (typeof Promise === 'undefined') {
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch polyfill for ie11
require('whatwg-fetch');

require('./ga-events');

var html = document.documentElement;
html.classList.add('js');
html.classList.remove('no-js');

const App = require('./App');

const WellBeingApp = new App();

WellBeingApp.init();
