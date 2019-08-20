const webpack = require("webpack");

module.exports = function(config, callback) {
  webpack(config).run((err, stats) => {
    if (err || stats.hasErrors()) {
      // Handle errors here
      console.log("error ==> ", stats);
      return;
    }
    // Done processing

    callback && callback(err, stats)
  });
};
