const fetch = require("node-fetch");

module.exports = (id, token) => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://graph.facebook.com/me/friends?uid=" +
        id +
        "&access_token=" +
        token,
      { method: "DELETE" }
    )
      .then(res => res.json())
      .then(respon => {
        resolve(respon);
      })
      .catch(err => {
        reject(err);
      });
  });
};
