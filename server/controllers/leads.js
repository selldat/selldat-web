'use strict';

var mongoose = require('mongoose'),
  Lead = mongoose.model('Lead'),
  config = require('../config/config'),
  sendgrid = require('sendgrid')(config.sendgrid_username, config.sendgrid_password);

exports.create = function (req, res, next) {
  var lead = new Lead(req.body),
    message = {
      to: '',
      from: 'Selldat <info@selldat.com>',
      replyto: 'info@selldat.com',
      subject: 'Welcome to Selldat',
      text: ' '
    },
    email = new sendgrid.Email(message);

  lead.save(function (err) {
    if(err) {
      if (err.code === 11000) {
        return res.status(400).json({error: 'Email already registered.'});
      } else if(err.errors.email.message === 'email field cannot be empty.' || err.errors.email.message === 'email field is not valid.') {
        return res.status(400).json({error: err.errors.email.message});
      }
    }
    email.to = lead.email;
    
    sendgrid.send(email, function (err, json) {
      console.log('err:');
      console.log(err);
    });

    res.status(200).json(lead);
  });
};