// fetch polyfill
require('whatwg-fetch');

var anime = require('animejs');

var html = document.documentElement;
html.classList.add('js');
html.classList.remove('no-js');

var overview = require('./overview');

const init = () => {
  if(~window.location.pathname.indexOf('overview')) {
    overview();
  }

  bindLinks();
};

var appContainer = document.getElementById('root');

const loadPage = (url) => {
  return fetch(url)
    .then(res => res.text())
    .then(text => new window.DOMParser().parseFromString(text, 'text/html'))
    .then(html => {
      appContainer.innerHTML = html.getElementById('root').innerHTML;
    })
    .catch(err => {
      console.error(err);
      window.location = url;
    });
};

const fadeOut = (cb) => {
  anime({
    targets: appContainer,
    opacity: 0,
    duration: 500,
    // translateY: -20,
    easing: 'linear',
    complete: cb
  });
};

const fadeIn = (cb) => {
  anime({
    targets: appContainer,
    duration: 500,
    opacity: 1,
    // translateY: [-20, 0],
    easing: 'linear',
    complete: cb
  });
};

window.onpopstate = function(e) {
  fadeOut(() => {
    loadPage(e.state.page)
      .then(() => {
        fadeIn();
        init();
      });
  });
};

function handleFadeLinkClick(e) {
  e.preventDefault();
  var href = e.target.href;

  // do nothing if user is already on the page they clicked a link to
  if(href === window.location.href) {
    return;
  }

  fadeOut(() => {
    history.pushState({
      page: href || '/'
    }, href, href);

    loadPage(href).then(() => {
      fadeIn();
      init();
    });
  });
}

function bindLinks() {
  var fadeLinks = document.querySelectorAll('a[data-fade-link]');
  Array.from(fadeLinks).forEach(elem => elem.addEventListener('click', handleFadeLinkClick));
}

init();
