const parseQuery = function(q) {
  let query = {};
  if(q.charAt(0) === "?") {
    q = q.substr(1);
  }
  q.split("&").map((s) => {
    let [key, value] = s.split("=");
    value = value === "true" ? true : value === "false" ? false : value;
    query[key] = value;
  });
  return query;
};

module.exports = parseQuery;
