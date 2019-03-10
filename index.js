const fetch = require("node-fetch");
const readlineSync = require("readline-sync");
const friendList = require("./lib/getFriendList");
const lastActive = require("./lib/lasActive");
const unfriend = require("./lib/unfriend");
const colors = require("./lib/colors");

const token = readlineSync.question(
  colors.FgYellow + "token : " + colors.Reset
);
const years = readlineSync.question(
  colors.FgYellow + "years : " + colors.Reset
);

console.log("");
console.log("");
console.log("");
console.log("");
console.log(
  "waiting, progress for get list friend and remove inactive friend...."
);
console.log("");
console.log("");
console.log("");

friendList(token)
  .then(res => {
    res.forEach(data => {
      const id = data.id;
      const name = data.name;
      lastActive(id, token).then(log => {
        if (log < years) {
          unfriend(id, token).then(deleted => {
            console.log(
              colors.FgRed,
              "USER" +
                " " +
                name +
                " " +
                "[INACTIVE]" +
                "" +
                "UNFRIEND SUCCESS",
              colors.Reset
            );
          });
        } else {
          console.log(
            "USER" +
              " " +
              name +
              " " +
              colors.FgGreen +
              "[ACTIVE]" +
              colors.Reset
          );
        }
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
