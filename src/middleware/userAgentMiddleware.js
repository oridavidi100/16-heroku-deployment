const uaParser = require('ua-parser-js');


const userAgentMiddleware = function(req, res, next) {
  req.uaData = uaParser(req.headers['user-agent']) || {};
  req.uaData.ip = req.socket.remoteAddress;
  next();
}

module.exports = userAgentMiddleware;
