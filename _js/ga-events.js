import forEach from './helpers/forEach';

var links = document.querySelectorAll('[data-ga-event]');

function handleLinkClick(event) {
  var target = event.currentTarget;
  var hitType = 'event';
  var eventCategory = 'Links';
  var eventAction = 'click';
  var eventLabel = target.dataset.gaEvent;

  var config = {
    hitType,
    eventCategory,
    eventAction,
    eventLabel
  };

  if (typeof window.ga !== 'undefined') {
    return window.ga('send', config);
  }
  console.log('logging GA event', config);
}

forEach(links, (link) => {
  link.addEventListener('click', handleLinkClick);
});
