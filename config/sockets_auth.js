var passportSocketIO = require("passport.socketio");

module.exports = function (io, session) {
  io.use(passportSocketIo.authorize({
      key:          'connect.sid',
      secret:       session.secret,
      store:        session.store
  }));
};