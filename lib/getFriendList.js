const fetch = require("node-fetch");

module.exports = token => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://graph.facebook.com/me/friends?access_token=" + token)
        .then(res => res.json())
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    }, 10000);
  });
};
