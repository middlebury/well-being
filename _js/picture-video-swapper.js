/**
 * Swaps a <picture> element for a <video> based on the picture data-video-* attributes.
 * @param  {Element} picture - the picture DOM element
 */
module.exports = function(picture) {
  // set the parent container of the picture element so we can change its children
  var container = picture.parentElement;

  // expects a comma separated list of src urls
  var pictureVideoSources = picture.dataset.videoSources;

  // splits the comma separated list into an actual array
  var sources = pictureVideoSources.split(',');

  // create a video element
  var video = document.createElement('video');

  // init a config var which will be populated by JSON.parse
  var config = {};

  // append <source> elements to the video tag
  sources.forEach(src => {
    // create a source element
    var source = document.createElement('source');

    // set the src attribuet
    source.src = src;

    // set the type attribute based on the source url filetype
    source.type = 'video/' + src.split('.')[1]; // filetype of source

    // add the source to the video element
    video.appendChild(source);
  });

  // wrapped in try/catch because this can throw an error if string is invalid format
  try {
    var dataConfig = picture.getAttribute('data-video-config');
    var config = JSON.parse(dataConfig);
  } catch(e) {
    console.log(e);
  }

  // loop through the config object which was hopefully populated by JSON.parse
  for(var key in config) {
    // set each attribute on the video tag
    video[key] = config[key];
  }

  // remove the picture element
  container.removeChild(picture);

  // insert the new video element into the original picture element's parent element
  container.appendChild(video);
};
