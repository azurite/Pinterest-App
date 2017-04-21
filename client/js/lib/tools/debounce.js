// https://davidwalsh.name/javascript-debounce-function

const debounce = function(fn, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate) {
        fn.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) {
      fn.apply(context, args);
    }
  };
};

module.exports = debounce;
