const anime = require('animejs');
const PageFetcher = require('./helpers/PageFetcher');

// if previous state is overview, then the user is navigating home
const isUrlOverview = url => url.indexOf('overview') >= 0;

module.exports = function createPageFetcher({ afterChange }) {
  const root = document.getElementById('root');

  return new PageFetcher({
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
    afterChange: (url) => {

      // App needs to re-run initHelpers to re-instance the swapper or video background
      afterChange();

      anime({
        targets: root,
        duration: 500,
        delay: 100,
        opacity: 1,
        translateY: isUrlOverview(url) ? [-20, 0] : [20, 0],
        easing: 'linear',
        complete: () => {
          root.removeAttribute('style');
        }
      });
    }
  });
};
