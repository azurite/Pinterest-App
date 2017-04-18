const fs = require("fs");
const path = require("path");

const sortByNamePriority = function(priorities, assets) {

  for(var name in priorities) {
    if(priorities.hasOwnProperty(name)) {
      var arrcopy = assets[name].slice(0);
      const sorted = [];

      priorities[name].forEach((name) => {
        const tester = new RegExp(name);

        for(var i = 0; i < arrcopy.length; i++) {
          if(tester.test(arrcopy[i])) {
            Array.prototype.push.apply(sorted, arrcopy.splice(i, 1));
          }
        }
      });

      assets[name] = sorted;
    }
  }

  return assets;
};

const serveBundles = function(options) {
  const fullpath = options.path;
  const publicPath = options.publicPath || "";
  const assets = {
    styles: [],
    scripts: []
  };

  fs.readdirSync(fullpath)
    .filter((data) => {
      if(fs.statSync(path.join(fullpath, data)).isFile()) {
        return ~[".js", ".css"].indexOf(data.slice(data.lastIndexOf(".")));
      }
    })
    .forEach((file) => {
      if(file.slice(file.lastIndexOf(".")) === ".css") {
        assets.styles.push(publicPath + file);
      }
      if(file.slice(file.lastIndexOf(".")) === ".js") {
        assets.scripts.push(publicPath + file);
      }
    });

  if(options.sort) {
    return sortByNamePriority(options.sort , assets);
  }

  return assets;
};

module.exports = serveBundles;
