import './ga-events';

import App from './App';

var html = document.documentElement;
html.classList.add('js');
html.classList.remove('no-js');

const WellBeingApp = new App();

WellBeingApp.init();
