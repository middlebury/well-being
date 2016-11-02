const Swapper = require('./swapper');

const intro = document.querySelector('.topics__intro');
const controls = document.querySelector('.controls');

const show = elem => elem.style.display = 'block';
const hide = elem => elem.style.display = 'none';

const swapper = new Swapper({
  navItems: '.js-topics-nav-item',
  items: '.js-topic-article',
  onOpen() {
    hide(intro);
    show(controls);
  },
  onClose() {
    show(intro);
    hide(controls);
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
