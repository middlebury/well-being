// fetch polyfill for ie11
require('whatwg-fetch');

const isFunction = (func) => typeof func === 'function';

/**
 * Fetches content from link urls and updates window history state and inserts fetched content into root div.
 * @type {class}
 */
class PageFetcher {
  constructor({
    root,
    fetchSelector = '#root',
    dataAttr = 'fetch-me',
    beforeChange,
    afterChange,
  }) {
    /**
     * The root element to insert fetched content into.
     * @type {element}
     */
    this.root = root;

    /**
     * Selector to be used when fetching content
     * @type {string}
     * @default '#root'
     */
    this.fetchSelector = fetchSelector;

    /**
     * Links with this data attribute will trigger fetches. Must be a link so the href attribute is present.
     * @type {string}
     * @default 'fetch-me'
     */
    this.dataAttr = dataAttr;

    /**
     * Function to called before fetch happens.
     * @type {func}
     */
    this.beforeChange = beforeChange;

    /**
     * Function to called after fetch happens.
     * @type {func}
     */
    this.afterChange = afterChange;

    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    // listen for popstate changes e.g. back button clicks
    window.addEventListener('popstate', this.handlePopState.bind(this));

    // dynamically listen for link clicks that have the data attribute
    document.body.addEventListener('click', e => {
      // check if the data- attribute is on the target
      if(e.target.getAttribute(`data-${this.dataAttr}`) !== null) {
        this.handleLinkClick(e);
      }
    });
  }

  loadPage(url) {
    return fetch(url)
      // turn the response into text
      .then(res => res.text())
      // parse the text response so we can only fetch content from the pages root div
      .then(text => new window.DOMParser().parseFromString(text, 'text/html'))
      // insert the fetched content into the root div
      .then(html => {
        this.root.innerHTML = html.querySelector(this.fetchSelector).innerHTML;
      })
      // listen for errors and "redirect" the user if fetching doesn't happen
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
        this.afterPageChange();
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
