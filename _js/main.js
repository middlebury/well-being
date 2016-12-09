var html = document.documentElement;
html.classList.add('js');
html.classList.remove('no-js');

const App = require('./App');

const WellBeingApp = new App();

WellBeingApp.init();
