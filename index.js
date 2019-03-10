const fetch = require("node-fetch");
const friendList = require("./lib/getFriendList");
const lastActive = require("./lib/lasActive");
const unfriend = require("./lib/unfriend");

const token =
  "EAAAAAYsX7TsBANGnESOdezLjLGSWhHndaS2HBqXitvrHzZB0MF87wmc1ssXYM1IORC1KaUjvrHExlCLQkiOn4ZAFvuZCVU4gN27TLNZBQSRHb19aROyckRDqPN8Ob1PFKnL3b3RetgFB27Lwe3oM3cpIJea1iBM3qJIerbNZCz0uY1uVeWITKYIaHCO6HMpW0ZAuZCDkM9OlxyItl0dJR2ZA";

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
