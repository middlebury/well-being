(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var optimizedResize = require('./optimizedResize');

var img = document.querySelector('img[data-video-src]');
var container = img.parentElement;
var videoId = 'swapped-video';
var isVideo = false;
var video = null;

function isTablet() {
  return !window.matchMedia('(min-width: 768px)').matches;
}

function swapImg() {
  if(isTablet()) {
    return insertVideo()
  }

  removeVideo();
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

// optimizedResize.add(swapImg)

},{"./optimizedResize":2}],2:[function(require,module,exports){
// https://developer.mozilla.org/en-US/docs/Web/Events/resize

var optimizedResize = (function() {

  var callbacks = [],
      running = false;

  // fired on resize event
  function resize() {

    if (!running) {
      running = true;

      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(runCallbacks);
      } else {
        setTimeout(runCallbacks, 66);
      }
    }

  }

  // run the actual callbacks
  function runCallbacks() {

    callbacks.forEach(function(callback) {
      callback();
    });

    running = false;
  }

  // adds callback to loop
  function addCallback(callback) {

    if (callback) {
      callbacks.push(callback);
    }

  }

  return {
    // public method to add additional callback
    add: function(callback) {
      if (!callbacks.length) {
        window.addEventListener('resize', resize);
      }
      addCallback(callback);
    }
  }
}());

module.exports = exports = optimizedResize;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tYWluLmpzIiwianMvb3B0aW1pemVkUmVzaXplLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBvcHRpbWl6ZWRSZXNpemUgPSByZXF1aXJlKCcuL29wdGltaXplZFJlc2l6ZScpO1xuXG52YXIgaW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW1nW2RhdGEtdmlkZW8tc3JjXScpO1xudmFyIGNvbnRhaW5lciA9IGltZy5wYXJlbnRFbGVtZW50O1xudmFyIHZpZGVvSWQgPSAnc3dhcHBlZC12aWRlbyc7XG52YXIgaXNWaWRlbyA9IGZhbHNlO1xudmFyIHZpZGVvID0gbnVsbDtcblxuZnVuY3Rpb24gaXNUYWJsZXQoKSB7XG4gIHJldHVybiAhd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4td2lkdGg6IDc2OHB4KScpLm1hdGNoZXM7XG59XG5cbmZ1bmN0aW9uIHN3YXBJbWcoKSB7XG4gIGlmKGlzVGFibGV0KCkpIHtcbiAgICByZXR1cm4gaW5zZXJ0VmlkZW8oKVxuICB9XG5cbiAgcmVtb3ZlVmlkZW8oKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlkZW8ob3B0aW9ucykge1xuICB2YXIgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gIHZpZGVvLnBvc3RlciA9IG9wdGlvbnMucG9zdGVyO1xuICB2aWRlby5pZCA9IHZpZGVvSWQ7XG5cbiAgdmFyIHNvdXJjZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpXG4gIHNvdXJjZS5zcmMgPSBvcHRpb25zLnNvdXJjZTtcblxuICB2aWRlby5hcHBlbmRDaGlsZChzb3VyY2UpO1xuXG4gIHJldHVybiB2aWRlbztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0VmlkZW8oKSB7XG4gIHZhciB2aWRlbyA9IGNyZWF0ZVZpZGVvKHtcbiAgICBwb3N0ZXI6IGltZy5zcmMsXG4gICAgc291cmNlOiBpbWcuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZGVvLXNyYycpXG4gIH0pO1xuXG4gIGlmKGltZykge1xuICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChpbWcpXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHZpZGVvKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVZpZGVvKCkge1xuICB2YXIgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWRlb0lkKVxuICBpZih2aWRlbykge1xuICAgIHZhciBwYXJlbnQgPSB2aWRlby5wYXJlbnROb2RlO1xuICAgIHBhcmVudC5yZW1vdmVDaGlsZCh2aWRlbyk7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGltZylcbiAgfVxufVxuXG4vLyBvcHRpbWl6ZWRSZXNpemUuYWRkKHN3YXBJbWcpXG4iLCIvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9FdmVudHMvcmVzaXplXG5cbnZhciBvcHRpbWl6ZWRSZXNpemUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIGNhbGxiYWNrcyA9IFtdLFxuICAgICAgcnVubmluZyA9IGZhbHNlO1xuXG4gIC8vIGZpcmVkIG9uIHJlc2l6ZSBldmVudFxuICBmdW5jdGlvbiByZXNpemUoKSB7XG5cbiAgICBpZiAoIXJ1bm5pbmcpIHtcbiAgICAgIHJ1bm5pbmcgPSB0cnVlO1xuXG4gICAgICBpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJ1bkNhbGxiYWNrcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KHJ1bkNhbGxiYWNrcywgNjYpO1xuICAgICAgfVxuICAgIH1cblxuICB9XG5cbiAgLy8gcnVuIHRoZSBhY3R1YWwgY2FsbGJhY2tzXG4gIGZ1bmN0aW9uIHJ1bkNhbGxiYWNrcygpIHtcblxuICAgIGNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gICAgcnVubmluZyA9IGZhbHNlO1xuICB9XG5cbiAgLy8gYWRkcyBjYWxsYmFjayB0byBsb29wXG4gIGZ1bmN0aW9uIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLy8gcHVibGljIG1ldGhvZCB0byBhZGQgYWRkaXRpb25hbCBjYWxsYmFja1xuICAgIGFkZDogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgIGlmICghY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcbiAgICAgIH1cbiAgICAgIGFkZENhbGxiYWNrKGNhbGxiYWNrKTtcbiAgICB9XG4gIH1cbn0oKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IG9wdGltaXplZFJlc2l6ZTtcbiJdfQ==
