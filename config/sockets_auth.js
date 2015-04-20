var passportSocketIO = require("passport.socketio");

module.exports = function (io, session) {
  io.use(passportSocketIO.authorize({
      key:    'connect.sid',
      secret: session.secret,
      store:  session.store
  }));
};