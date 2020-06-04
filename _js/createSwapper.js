import anime from 'animejs';
import Swapper from './helpers/Swapper';
import isDesktop from './helpers/isDesktop';

export default function createSwapper() {
  return new Swapper({
    itemsContainer: '.topics-list',
    navItems: '.topics-nav__anchor',
    items: '.topic-article',
    beforeOpen: (id, isNext, cb) => {
      window.history.pushState(
        {
          page: null,
          hash: id
        },
        id,
        '#' + id
      );

      if (!isDesktop()) {
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
    },
    afterOpen: (id, isNext) => {
      if (isDesktop()) {
        return anime({
          targets: '.topic-articles',
          translateY: isNext ? [-20, 0] : [20, 0],
          duration: 300,
          easing: 'linear',
          opacity: 1
        });
      }

      document.getElementById('root').scrollIntoView();
    }
  });
}
