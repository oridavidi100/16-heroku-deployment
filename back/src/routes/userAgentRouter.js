const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/ip', function(req, res) {
  return res.json({
    message: `Your IP is: ${req.uaData.ip}`
  })
})

router.get('/device', function(req, res) {
  return res.json({
    message: `Your Device is: ${req.uaData.device?.vendor}`
  })
});

router.get('/os', function(req, res) {
  return res.json({
    message: `Your Operating System is: ${req.uaData.os?.name}`
  })
});

router.get('/browser', function(req, res) {
  return res.json({
    message: `Your Browser is: ${req.uaData.browser?.name}`
  })
});

module.exports = router;
