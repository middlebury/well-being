const anime = require('animejs');
const Swapper = require('./helpers/swapper');
const PageFetcher = require('./helpers/PageFetcher');

class App {
  constructor() {
    this.swapper = null;
    this.pageFetcher = null;
    this.init();
  }

  init() {
    var root = document.getElementById('root');

    this.initSwapper();

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
        this.initSwapper();
        anime({
          targets: root,
          duration: 500,
          opacity: 1,
          translateY: [-20, 0],
          easing: 'linear'
        });
      }
    });
  }

  initSwapper() {
    if(window.location.pathname.indexOf('overview') !== -1) {
      this.swapper = new Swapper({
        itemsContainer: '.topics-list',
        navItems: '.topics-nav__anchor',
        items: '.topic-article',
      });
    } else {
      if(this.swapper instanceof Swapper) {
        this.swapper.destroy();
      }
    }
  }
}

module.exports = App;
