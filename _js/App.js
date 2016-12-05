const anime = require('animejs');
const Swapper = require('./helpers/swapper');
const PageFetcher = require('./helpers/PageFetcher');

class App {
  constructor() {
    var root = document.getElementById('root');

    this.swapper = null;

    this.pageFetcher = new PageFetcher({
      root,
      beforeChange: (cb) => {
        anime({
          targets: root,
          opacity: 0,
          duration: 500,
          translateY: -20,
          easing: 'linear',
          complete: cb
        });
      },
      afterChange: () => {
        this.init();
        anime({
          targets: root,
          duration: 500,
          opacity: 1,
          translateY: [-20, 0],
          easing: 'linear'
        });
      }
    });

    this.init();
  }

  init() {
    if(window.location.pathname.indexOf('overview') !== -1) {
      this.swapper = new Swapper({
        itemsContainer: '.topics-list',
        navItems: '.topics-nav__anchor',
        items: '.topic-article',
      });
    }
  }
}

module.exports = App;
