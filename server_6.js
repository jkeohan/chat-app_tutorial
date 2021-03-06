var WebSocketServer = require("ws").Server;
var server = new WebSocketServer({port: 3000});

var userDb = [];

server.on("connection", function(obj){

  var user = {userName: "", userObj: obj};
  userDb.push(user);

  user.userObj.send("Please type in your username and press enter") // ask for a username

  user.userObj.on("message", function(message) {

    if (user.userName === "") {
      user.userName = message.trim();
    }

    else {

      var msg = message.trim("\n");

      userDb.forEach(function(object) {
        if (object.userObj !== obj) {
          object.userObj.send(user.userName + ": " + msg); // send msg with your username

        }
      });

    }
    console.log(user.userName + ": " + msg);//print message from client to server
  });

  user.userObj.on("close", function() {
    var x = userDb.indexOf(user.userObj);
    userDb.splice(x,1);
    user.userObj.close();
  });

});
