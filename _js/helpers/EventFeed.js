class EventFeed {
  constructor({
    url,
    container
  }) {
    this.feedUrl = url;
    this.container = container;

    this.init();
  }

  init() {
    this.fetchFeed().then(() => {
      var data = this.data;
      console.log(data);

      var events = data.items.sort((a, b) => new Date(a.start.dateTime) - new Date(b.start.dateTime));

      var list = this.createItemList(events);

      this.container.innerHTML = '';

      this.container.appendChild(list);
    });
  }

  fetchFeed() {
    if(!this.feedUrl) {
      throw new Error('Must provide a feed url');
    }
    return window.fetch(this.feedUrl)
      .then(res => res.json())
      .then(data => {
        this.data = data;
      }).catch(err => {
        this.error = err;
        console.log(err);
      });
  }

  createItem({
    title,
    date,
    description,
    location,
    link
  }) {
    var div = document.createElement('div');

    var h1 = document.createElement('h1');
    var anchor = document.createElement('a');
    anchor.setAttribute('href', link);
    anchor.appendChild(document.createTextNode(title));
    h1.appendChild(anchor);

    var text = document.createElement('p');
    text.appendChild(document.createTextNode(description));

    var loc = document.createElement('p');
    loc.appendChild(document.createTextNode(location));

    var meta = document.createElement('p');
    var timestamp = new Date(date);
    meta.appendChild(document.createTextNode(timestamp.toLocaleString()));

    div.appendChild(h1);
    div.appendChild(meta);
    div.appendChild(loc);
    div.appendChild(text);

    return div;
  }

  createItemList(items) {
    var list = document.createElement('div');

    items.forEach(({ summary, htmlLink, description, start, location }) => {
      var itemDiv = this.createItem({
        title: summary,
        date: start.dateTime,
        link: htmlLink,
        description,
        location
      });

      list.appendChild(itemDiv);
    });

    return list;
  }
}

module.exports = EventFeed;
