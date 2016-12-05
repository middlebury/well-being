class Swapper {
  constructor({
    items,
    navItems,
    itemsContainer,
    onOpen = () => null,
    onClose = () => null,
    activeNavItemClass = 'swapper-nav-item--is-active',
    activeItemClass = 'swapper-item--is-active',
    activeContainerClass = 'swapper-container--is-init',
    openContainerClass = 'swapper-container--is-open',
    closedContainerClass = 'swapper-container--is-closed',
    openBodyClass = 'swapper--is-open',
    closedBodyClass = 'swapper--is-closed',
  }) {
    this.navItems = document.querySelectorAll(navItems);
    this.items = document.querySelectorAll(items);
    this.container = document.querySelector(itemsContainer);
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.activeNavItemClass = activeNavItemClass;
    this.activeItemClass = activeItemClass;
    this.activeContainerClass = activeContainerClass;
    this.openContainerClass = openContainerClass;
    this.closedContainerClass = closedContainerClass;
    this.openBodyClass = openBodyClass;
    this.closedBodyClass = closedBodyClass;

    this.closeBtn = document.querySelector('.controls__btn--close');
    this.prevBtn = document.querySelector('.controls__btn--prev');
    this.nextBtn = document.querySelector('.controls__btn--next');

    this.init();
  }

  init() {
    this.closeAll();
    this.addListeners();
    this.container.classList.add(this.activeContainerClass);
    document.body.classList.add('has-swapper');
  }

  addListeners() {
    Array.from(this.navItems).forEach((elem) => {
      elem.addEventListener('click', this.handleNavItemClick.bind(this));
    });

    this.closeBtn.addEventListener('click', () => {
      this.closeAll();
    });

    this.prevBtn.addEventListener('click', () => {
      this.prev();
    });

    this.nextBtn.addEventListener('click', () => {
      this.next();
    });
  }

  removeListeners() {
    Array.from(this.navItems).forEach((elem) => {
      elem.removeEventListener('click', this.handleNavItemClick.bind(this));
    });

    this.closeBtn.removeEventListener('click', () => {
      this.closeAll();
    });

    this.prevBtn.removeEventListener('click', () => {
      this.prev();
    });

    this.nextBtn.removeEventListener('click', () => {
      this.next();
    });
  }

  handleNavItemClick(e) {
    e.preventDefault();
    const elem = e.currentTarget;
    const href = elem.getAttribute('href');

    if(href) {
      const id = href.replace('#', '');
      this.show(id);
    }
  }

  show(id) {
    if(!id) return;
    this.closeAll();
    this.onOpen(id);
    const elem = document.getElementById(id);
    elem.classList.add(this.activeItemClass);
    this.addActiveNavItemClass(id);
    this.container.classList.add(this.openContainerClass);
    this.container.classList.remove(this.closedContainerClass);
    document.body.classList.add(this.openBodyClass);
  }

  getActiveNavItem() {
    return document.querySelector('.' + this.activeNavItemClass);
  }

  getActiveItem() {
    return this.container.querySelector('.' + this.activeItemClass);
  }

  closeAll() {
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

  next() {
    const { nextElementSibling } = this.getActiveItem();
    if(nextElementSibling && nextElementSibling.id) {
      return this.show(nextElementSibling.id);
    }
    var id = this.items[0].getAttribute('id');
    this.show(id);
  }

  prev() {
    const { previousElementSibling } = this.getActiveItem();
    if(previousElementSibling && previousElementSibling.id) {
      return this.show(previousElementSibling.id);
    }
    const lastItem = this.items[this.items.length - 1];
    const id = lastItem.getAttribute('id');
    this.show(id);
  }

  destroy() {
    this.removeListeners();
  }
}

module.exports = Swapper;
