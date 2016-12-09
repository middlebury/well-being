const anime = require('animejs');
const Swapper = require('./helpers/Swapper');
const isDesktop = require('./helpers/isDesktop');

module.exports = function createSwapper() {
  return new Swapper({
    itemsContainer: '.topics-list',
    navItems: '.topics-nav__anchor',
    items: '.topic-article',
    beforeOpen: (id, isNext, cb) => {
      if(!isDesktop()) {
        return cb();
      }

      anime({
        targets: '.topic-articles',
        opacity: 0,
        translateY: isNext ? 20 : -20,
        duration: 300,
        easing: 'linear',
        complete: cb
      });

      window.history.pushState({
        page: null,
        hash: id
      }, id, '#' + id);

    },
    afterOpen: (id, isNext) => {
      if(!isDesktop()) {
        return;
      }
      anime({
        targets: '.topic-articles',
        translateY: isNext ? [-20, 0] : [20, 0],
        duration: 300,
        easing: 'linear',
        opacity: 1
      });
    }
  });
};
