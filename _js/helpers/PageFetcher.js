// fetch polyfill
require('whatwg-fetch');

const isFunction = (func) => typeof func === 'function';

class PageFetcher {
  constructor({
    root,
    dataAttr = 'fade-link',
    beforeChange,
    afterChange,
  }) {
    this.root = root;
    this.dataAttr = dataAttr;
    this.beforeChange = beforeChange;
    this.afterChange = afterChange;

    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    window.addEventListener('popstate', this.handlePopState.bind(this));

    document.body.addEventListener('click', e => {
      // check if the data- attribute is on the target
      if(e.target.getAttribute(`data-${this.dataAttr}`) !== null) {
        this.handleLinkClick(e);
      }
    });
  }

  loadPage(url) {
    return fetch(url)
      .then(res => res.text())
      .then(text => new window.DOMParser().parseFromString(text, 'text/html'))
      .then(html => {
        this.root.innerHTML = html.getElementById('root').innerHTML;
      })
      .catch(err => {
        console.error(err);
        window.location = url;
      });
  }

  afterPageChange(cb) {
    if(isFunction(this.afterChange)) {
      return this.afterChange(cb);
    }
    cb();
  }

  beforePageChange(cb) {
    if(isFunction(this.beforeChange)) {
      return this.beforeChange(cb);
    }
    cb();
  }

  handlePopState(e) {
    this.beforePageChange(() => {
      this.loadPage(e.state.page).then(() => {
        this.beforePageChange();
      });
    });
  }

  handleLinkClick(e) {
    e.preventDefault();
    var href = e.target.href;

    // do nothing if user is already on the page they clicked a link to
    if(href === window.location.href) {
      return;
    }

    this.beforePageChange(() => {
      history.pushState({
        page: href || '/'
      }, href, href);

      this.loadPage(href).then(() => {
        this.afterPageChange();
      });
    });
  }
}

module.exports = PageFetcher;
