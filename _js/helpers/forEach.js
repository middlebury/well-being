const forEach = (items, cb) => {
  var i;
  var count = items.length;
  for (i = 0; i < count; i++) {
    cb(items[i]);
  }
};

export default forEach;
