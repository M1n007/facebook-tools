const fetch = require("node-fetch");
const moment = require("moment");

const token = "";

function friendList() {
  return new Promise((resolve, reject) => {
    fetch("https://graph.facebook.com/me/friends?access_token=" + token)
      .then(res => res.json())
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function lastActive(data) {
  return new Promise((resolve, reject) => {
    fetch(
      "https://graph.facebook.com/" +
        data +
        "/feed?access_token=" +
        token +
        "&limit=1"
    )
      .then(res => res.json())
      .then(lastactive => {
        resolve(lastactive);
      })
      .catch(err => {
        reject(err);
      });
  });
}

async function unfriend() {
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
}

(async () => {
  const getFriendList = await friendList();
  getFriendList
    .forEach(data => {
      const id = data.id;
      const name = data.name;
      lastActive(id)
        .then(res => {
          const date = res.data[0].created_time;

          const newDate = moment(date).format("Y");
          console.log(name);
          if (newDate < 2017) {
            console.log("User" + " " + name + " " + [INACTIVE]);
          } else {
            console.log("User" + " " + name + " " + [ACTIVE]);
          }
        })
        .catch(err => {
          console.log("failed. try again");
        });
    })
    .catch(err => {
      console.log("failed. request limit");
    });
})();
