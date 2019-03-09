const fetch = require("node-fetch");
const readlineSync = require("readline-sync");

const username = readlineSync.question("username : ");
const password = readlineSync.question("password : ");

const getToken = () =>
  new Promise((resolve, reject) => {
    fetch(
      "https://api.facebook.com/restserver.php?api_key=3e7c78e35a76a9299309885393b02d97&credentials_type=password&email=" +
        username +
        "&format=JSON&generate_machine_id=1&generate_session_cookies=1&locale=id_ID&method=auth.login&password=" +
        password +
        "&return_ssl_resources=0&v=1.0&sig=0df3aedf1caf0367ee58f032aa3580d1"
    )
      .then(res => res.json())
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });

getToken()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  });
