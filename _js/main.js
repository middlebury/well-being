var optimizedResize = require('./optimizedResize');

// var img = document.querySelector('img[data-video-src]');
// var container = img.parentElement;
var videoId = 'swapped-video';
var isVideo = false;
var video = null;

function isTablet() {
  return !window.matchMedia('(min-width: 768px)').matches;
}

function swapImg() {
  console.log('test')
  // if(isTablet()) {
  //   return insertVideo()
  // }
  //
  // removeVideo();
}

function createVideo(options) {
  var video = document.createElement('video')
  video.poster = options.poster;
  video.id = videoId;

  var source = document.createElement('source')
  source.src = options.source;

  video.appendChild(source);

  return video;
}

function insertVideo() {
  var video = createVideo({
    poster: img.src,
    source: img.getAttribute('data-video-src')
  });

  if(img) {
    container.removeChild(img)
    container.appendChild(video)
  }
}

function removeVideo() {
  var video = document.getElementById(videoId)
  if(video) {
    var parent = video.parentNode;
    parent.removeChild(video);
    parent.appendChild(img)
  }
}

optimizedResize.add(swapImg)
