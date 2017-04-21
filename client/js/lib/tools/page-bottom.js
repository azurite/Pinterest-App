// http://stackoverflow.com/a/22394544

const pageBottom = function() {
  var de = document.documentElement;
  var scrollTop = (de && de.scrollTop) || document.body.scrollTop;
  var scrollHeight = (de && de.scrollHeight) || document.body.scrollHeight;
  var scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight;

  return scrolledToBottom;
};

module.exports = pageBottom;
