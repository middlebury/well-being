const Swapper = require('./swapper');

class Toggler {
  constructor(selector) {
    this.elem = document.querySelector(selector);
    this.display = this.getStyle();
  }

  hide() {
    this.elem.style.display = 'none';
  }

  show() {
    this.elem.style.display = null;
  }

  getStyle() {
    var element = this.elem;
    return element.currentStyle
      ? element.currentStyle.display
      : getComputedStyle(element, null).display;
  }
}

const intro = new Toggler('.topics__intro');
const controls = new Toggler('.controls');
const listBubble = new Toggler('.topics-list .bubble');

const swapper = new Swapper({
  navItems: '.topics-nav__anchor',
  items: '.topic-article',
  onOpen(id) {
    intro.hide();
    controls.show();

    // window.history.pushState({
    //   title: id,
    // }, id, `/topics/#${id}`);
  },
  onClose() {
    intro.show();
    // show(intro);
    controls.hide();
  }
});

var closeBtn = document.querySelector('.controls__btn--close');
var prevBtn = document.querySelector('.controls__btn--prev');
var nextBtn = document.querySelector('.controls__btn--next');

closeBtn.onclick = () => {
  swapper.closeAll();
};

prevBtn.onclick = () => {
  swapper.prev();
};

nextBtn.onclick = () => {
  swapper.next();
};

swapper.init();
