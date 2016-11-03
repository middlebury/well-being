class Swapper {
  constructor({
    items,
    navItems,
    onOpen = () => null,
    onClose = () => null,
    activeClassName = 'active'
  }) {
    this.navItems = document.querySelectorAll(navItems);
    this.items = document.querySelectorAll(items);
    this.onOpen = onOpen;
    this.onClose = onClose;
    this.activeClassName = activeClassName;
    this.currIndex = 0;
    this.ids = [];
    Array.from(this.items).forEach(elem => this.ids.push(elem.id));
  }

  init() {
    this.closeAll();
    this.addListeners();
  }

  addListeners() {
    Array.from(this.navItems).forEach((elem) => {
      elem.onclick = this.handleNavItemClick.bind(this);
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

  setCurrIndex(id) {
    this.currIndex = this.ids.indexOf(id);
  }

  show(id) {
    if(!id) return;
    this.closeAll();
    this.onOpen(id);
    const elem = document.getElementById(id);
    elem.style.display = 'block';
    this.setCurrIndex(id);
    this.addActiveClass(id);
  }

  closeAll() {
    this.onClose();
    Array.from(this.items).forEach(elem => {
      elem.style.display = 'none';
    });
    this.removeActiveClasses();
  }

  addActiveClass(id) {
    const elem = document.querySelector(`[href="#${id}"]`);
    this.removeActiveClasses();
    elem.classList.add(this.activeClassName);
  }

  removeActiveClasses() {
    Array.from(this.navItems).forEach(elem => {
      elem.classList.remove(this.activeClassName);
    });
  }

  next() {
    const nextIndex = this.currIndex + 1;
    const index = nextIndex === this.ids.length ? 0 : nextIndex;
    const id = this.ids[index];
    this.show(id);
  }

  prev() {
    const prevIndex = this.currIndex - 1;
    const index = prevIndex < 0 ? this.ids.length - 1 : prevIndex;
    const id = this.ids[index];
    this.show(id);
  }
}

module.exports = exports = Swapper;
