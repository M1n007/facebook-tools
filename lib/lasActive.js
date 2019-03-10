const fetch = require("node-fetch");
const moment = require("moment");

module.exports = (data, token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(
        "https://graph.facebook.com/" +
          data +
          "/feed?access_token=" +
          token +
          "&limit=1"
      )
        .then(res => res.json())
        .then(lastactive => {
          const newDate = moment(lastactive.data[0].created_time).format("Y");
          resolve(newDate);
        })
        .catch(err => {
          reject(err);
        });
    }, 1000);
  });
};
