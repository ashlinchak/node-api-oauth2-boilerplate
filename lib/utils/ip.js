'use strict';

module.exports = {
  getRequestIP: function (req) {
    var ip;
    ip = req.headers['x-forwarded-for'] ||
         req.connection.remoteAddress ||
         req.socket.remoteAddress ||
         req.connection.socket.remoteAddress;
    return ip;
  },
};
