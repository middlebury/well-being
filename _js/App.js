import Swapper from './helpers/Swapper';
import createPageFetcher from './createPageFetcher';
import createSwapper from './createSwapper';
import picVidSwap from './picture-video-swapper';
import isTablet from './helpers/isTablet';

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
      if (this.swapper) {
        this.swapper.open(window.location.hash.replace('#', ''));
      }
    });
  }

  initVideo() {
    if (isTablet()) {
      var picture = document.getElementById('homepage-picture');
      picVidSwap(picture);
    }
  }

  initSwapper() {
    this.swapper = createSwapper();

    const { hash } = window.location;

    if (hash) {
      // open the hash id as we assume it's a topic
      this.swapper.open(hash.replace('#', ''));
    }
  }

  initHelpers() {
    if (isLocation('overview')) {
      this.initSwapper();
    } else {
      this.initVideo();

      if (this.swapper instanceof Swapper) {
        this.swapper.destroy();
      }
    }
  }
}

export default App;
