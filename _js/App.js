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
    this.addListeners();

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

  addListeners() {
    window.addEventListener('hashchange', () => {
      if(this.swapper instanceof Swapper) {
        this.swapper.open(window.location.hash.replace('#', ''));
      }
    });
  }

  initSwapper() {
    if(window.location.pathname.indexOf('overview') !== -1) {
      this.swapper = new Swapper({
        itemsContainer: '.topics-list',
        navItems: '.topics-nav__anchor',
        items: '.topic-article',
        beforeOpen: (id, isNext, cb) => {
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
          anime({
            targets: '.topic-articles',
            translateY: isNext ? [-20, 0] : [20, 0],
            duration: 300,
            easing: 'linear',
            opacity: 1
          });
        }
      });

      const { hash } = window.location;

      if(hash) {
        this.swapper.open(hash.replace('#', ''));
      }

    } else {
      if(this.swapper instanceof Swapper) {
        this.swapper.destroy();
      }
    }
  }
}

module.exports = App;
