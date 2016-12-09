const forEach = require('./helpers/forEach');

/**
 * Takes a <video> element and changes its <source data-src /> children to <source src>
 * then plays the video. Intended displaying just a poster on a mobile device then downloading
 * the video files on a device with higher bandwidth.
 * @param  {element} video - the video DOM element
 */
module.exports = function(video) {
  var sources = video.querySelectorAll('source');

  forEach(sources, source => {
    if(source.dataset && source.dataset.src) {
      source.src = source.dataset.src;
    }
  });

  video.play();
};
