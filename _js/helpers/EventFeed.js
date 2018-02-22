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

    var content = `
      <h1><a href="${link}">${title}</a></h1>
      <p>${new Date(date).toLocaleDateString()}</p>
      <p>${location}</p>
      <p>${description}</p>
    `;

    div.innerHTML = content;

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
