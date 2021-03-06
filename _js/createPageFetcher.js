import anime from 'animejs';
import PageFetcher from './helpers/PageFetcher';

// if previous state is overview, then the user is navigating home
const isUrlOverview = (url) => url.indexOf('overview') >= 0;

const SPINNER_DURATION = 800;
const ROOT_DURATION = 800;

export default function createPageFetcher({ afterChange }) {
  const root = document.getElementById('root');
  const spinner = document.getElementById('spinner');

  return new PageFetcher({
    root,
    beforeChange: (url, cb) => {
      history.pushState(
        {
          page: url || '/'
        },
        url,
        url
      );

      // animate the root div out
      anime({
        targets: root,
        opacity: 0,
        duration: ROOT_DURATION,
        // translateY: isUrlOverview(url) ? 20 : -20,
        easing: 'linear',
        complete: () => {
          // show spinner
          spinner.style.display = 'block';

          // animate the spinner
          anime({
            targets: spinner,
            opacity: [0, 1],
            duration: SPINNER_DURATION,
            complete: cb
          });
        }
      });
    },
    afterChange: (url) => {
      // App needs to re-run initHelpers to re-instance the swapper or video background
      afterChange();

      // hide spinner
      anime({
        targets: spinner,
        duration: SPINNER_DURATION,
        opacity: 0,
        complete: () => {
          // show root container
          anime({
            targets: root,
            duration: ROOT_DURATION,
            opacity: 1,
            // translateY: isUrlOverview(url) ? [-20, 0] : [20, 0],
            easing: 'linear',
            complete: () => {
              root.removeAttribute('style');
            }
          });
        }
      });
    }
  });
}
