const Swapper = require('./helpers/Swapper');
const createPageFetcher = require('./createPageFetcher');
const createSwapper = require('./createSwapper');
const videoInit = require('./video-init');
const isTablet = require('./helpers/isTablet');

const isLocation = (path) => window.location.pathname.indexOf(path) !== -1;

class App {
  constructor() {
    this.swapper = null;
    this.pageFetcher = null;
  }

  // must be called after creating new instance of App
  init() {
    this.addListeners();
    this.pageFetcher = createPageFetcher({
      afterChange: () => this.initHelpers()
    });
    this.initHelpers();
  }

  addListeners() {
    window.addEventListener('hashchange', () => {
      if(this.swapper) {
        this.swapper.open(window.location.hash.replace('#', ''));
      }
    });
  }

  initVideo() {
    if(isTablet()) {
      var video = document.getElementById('homepage-video');
      videoInit(video);
    }
  }

  initSwapper() {
    this.swapper = createSwapper();

    const { hash } = window.location;

    if(hash) {
      // open the hash id as we assume it's a topic
      this.swapper.open(hash.replace('#', ''));
    }
  }

  initHelpers() {
    if(isLocation('overview')) {
      this.initSwapper();
    } else {
      this.initVideo();

      if(this.swapper instanceof Swapper) {
        this.swapper.destroy();
      }
    }
  }
}

module.exports = App;
