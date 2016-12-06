const anime = require('animejs');
const Swapper = require('./helpers/swapper');
const PageFetcher = require('./helpers/PageFetcher');

// if previous state is overview, then the user is navigating home
const isUrlOverview = url => url.indexOf('overview') >= 0;

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
      beforeChange: (url, cb) => {
        anime({
          targets: root,
          opacity: 0,
          duration: 500,
          translateY: isUrlOverview(url) ? 20 : -20,
          easing: 'linear',
          complete: cb
        });
      },
      afterChange: (url, cb) => {
        this.initSwapper();
        anime({
          targets: root,
          duration: 500,
          opacity: 1,
          translateY: isUrlOverview(url) ? [-20, 0] : [20, 0],
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
