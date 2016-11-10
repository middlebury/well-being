require('babel-polyfill');

const Swapper = require('./swapper');

const swapper = new Swapper({
  itemsContainer: '.topics-list',
  navItems: '.topics-nav__anchor',
  items: '.topic-article',
});

// var id = window.location.hash.replace('#', '');

// swapper.show(id);

var closeBtn = document.querySelector('.controls__btn--close');
var prevBtn = document.querySelector('.controls__btn--prev');
var nextBtn = document.querySelector('.controls__btn--next');

closeBtn.onclick = () => {
  swapper.closeAll();
};

prevBtn.onclick = () => {
  swapper.prev();
};

nextBtn.onclick = () => {
  swapper.next();
};

swapper.init();
