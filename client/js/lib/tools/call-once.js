module.exports = function callOnce(fn) {
  var called = false;

  return function() {
    if(!called) {
      called = true;
      return fn.apply(this, arguments);
    }
  };
};
