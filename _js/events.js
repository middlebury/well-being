var EventFeed = require('./helpers/EventFeed');

module.exports = function() {
  var CALENDAR_URL =
    'https://clients6.google.com/calendar/v3/calendars/9n4uqmc3gbkgtfcgeecmpahjf5o3q4v8@import.calendar.google.com/events?calendarId=9n4uqmc3gbkgtfcgeecmpahjf5o3q4v8%40import.calendar.google.com&singleEvents=true&timeZone=America%2FNew_York&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=2018-01-28T00%3A00%3A00-05%3A00&timeMax=2018-03-04T00%3A00%3A00-05%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs';

  var feedContainer = document.getElementById('event-feed');

  var Feed = new EventFeed({
    url: CALENDAR_URL,
    container: feedContainer
  });
};
