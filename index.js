const fetch = require("node-fetch");
const friendList = require("./lib/getFriendList");
const lastActive = require("./lib/lasActive");
const unfriend = require("./lib/unfriend");

const token = "";

friendList(token)
  .then(res => {
    res.forEach(data => {
      const id = data.id;
      const name = data.name;
      lastActive(id, token).then(log => {
        if (log < 2018) {
          unfriend(id, token).then(deleted => {
            console.log(
              "USER" + " " + name + " " + "[INACTIVE]" + "" + "UNFRIEND SUCCESS"
            );
          });
        } else {
          console.log("USER" + " " + name + " " + "[ACTIVE]");
        }
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
