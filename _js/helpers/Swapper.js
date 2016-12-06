const forEach = require('./forEach');

class Swapper {
  constructor({
    items,
    navItems,
    itemsContainer,
    beforeOpen = (id, isNext, cb) => cb(),
    afterOpen = () => null,
    activeNavItemClass = 'swapper-nav-item--is-active',
    activeItemClass = 'swapper-item--is-active',
    activeContainerClass = 'swapper-container--is-init',
    openContainerClass = 'swapper-container--is-open',
    closedContainerClass = 'swapper-container--is-closed',
    bodyClass = 'has-swapper',
    openBodyClass = 'swapper--is-open',
    closedBodyClass = 'swapper--is-closed',
  }) {
    this.navItems = document.querySelectorAll(navItems);
    this.items = document.querySelectorAll(items);
    this.container = document.querySelector(itemsContainer);

    // register open / close callbacks
    this.onOpen = onOpen;
    this.onClose = onClose;

    this.beforeOpen = beforeOpen;
    this.afterOpen = afterOpen;

    this.activeNavItemClass = activeNavItemClass;
    this.activeItemClass = activeItemClass;
    this.activeContainerClass = activeContainerClass;
    this.openContainerClass = openContainerClass;
    this.closedContainerClass = closedContainerClass;
    this.openBodyClass = openBodyClass;
    this.closedBodyClass = closedBodyClass;
    this.bodyClass = bodyClass;

    // register control buttons
    this.closeBtn = document.querySelector('.controls__btn--close');
    this.prevBtn = document.querySelector('.controls__btn--prev');
    this.nextBtn = document.querySelector('.controls__btn--next');

    // store the active id
    this.id = null;
    this.activeIdIndex = 0;

    // store a list of ids so we can check if an item is before another item
    this.ids = [];
    forEach(this.items, item => this.ids.push(item.id));

    // bind click listeners
    this.handleNavItemClick = this.handleNavItemClick.bind(this);
    this.handleCloseBtnClick = this.handleCloseBtnClick.bind(this);
    this.handleNextBtnClick = this.handleNextBtnClick.bind(this);
    this.handlePrevBtnClick = this.handlePrevBtnClick.bind(this);

    // initialize the swapper
    this.init();
  }

  init() {
    this.close();
    this.addListeners();
    this.container.classList.add(this.activeContainerClass);

    document.body.classList.add(this.bodyClass);
  }

  destroy() {
    this.removeListeners();
    this.close();

    document.body.classList.remove(this.bodyClass);
  }

  addListeners() {
    forEach(this.navItems, (elem) => {
      elem.addEventListener('click', this.handleNavItemClick);
    });

    this.closeBtn.addEventListener('click', this.handleCloseBtnClick);
    this.prevBtn.addEventListener('click', this.handlePrevBtnClick);
    this.nextBtn.addEventListener('click', this.handleNextBtnClick);
  }

  removeListeners() {
    forEach(this.navItems, (elem) => {
      elem.removeEventListener('click', this.handleNavItemClick);
    });

    this.closeBtn.removeEventListener('click', this.handleCloseBtnClick);
    this.prevBtn.removeEventListener('click', this.handlePrevBtnClick);
    this.nextBtn.removeEventListener('click', this.handleNextBtnClick);
  }

  handleCloseBtnClick() {
    this.close();
  }

  handlePrevBtnClick() {
    this.prev();
  }

  handleNextBtnClick() {
    this.next();
  }

  handleNavItemClick(e) {
    e.preventDefault();

    const elem = e.currentTarget;
    const href = elem.getAttribute('href');

    const id = href.replace('#', '');

    this.open(id);
  }

  open(id) {
    if(!id || id === this.id) return;

    const isNext = this.isIdNext(id);

    this.beforeOpen(id, isNext, () => {
      this.setActiveId(id);

      this.close();

      const elem = document.getElementById(id);

      elem.classList.add(this.activeItemClass);

      this.addActiveNavItemClass(id);

      this.container.classList.add(this.openContainerClass);
      this.container.classList.remove(this.closedContainerClass);

      document.body.classList.add(this.openBodyClass);

      this.afterOpen(id, isNext);
    });
  }

  getActiveNavItem() {
    return document.querySelector('.' + this.activeNavItemClass);
  }

  getActiveItem() {
    return this.container.querySelector('.' + this.activeItemClass);
  }

  close() {
    const elem = this.getActiveItem();

    if(elem) {
      elem.classList.remove(this.activeItemClass);
    }

    document.body.classList.remove(this.openBodyClass);

    this.removeActiveNavItemClass();

    // run onClose callback
    this.onClose();
  }

  addActiveNavItemClass(id) {
    const elem = document.querySelector(`[href="#${id}"]`);

    this.removeActiveNavItemClass();

    elem.classList.add(this.activeNavItemClass);
  }

  removeActiveNavItemClass() {
    const elem = this.getActiveNavItem();

    if(elem) {
      elem.classList.remove(this.activeNavItemClass);
    }
  }

  setActiveId(id) {
    this.activeIdIndex = this.ids.indexOf(id);
    this.id = id;
  }

  isIdNext(nextId) {
    const nextIdIndex = this.ids.indexOf(nextId);
    return nextIdIndex > this.activeIdIndex;
  }

  next() {
    const nextId = this.ids[this.activeIdIndex + 1];

    if(nextId) {
      return this.open(nextId);
    }

    const { id } = this.items[0];

    this.open(id);
  }

  prev() {
    const prevId = this.ids[this.activeIdIndex - 1];

    if(prevId) {
      return this.open(prevId);
    }

    const lastItem = this.items[this.items.length - 1];

    this.open(lastItem.id);
  }
}

module.exports = Swapper;
