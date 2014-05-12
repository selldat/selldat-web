'use strict';

var mongoose = require('mongoose'),
  Lead = mongoose.model('Lead');


exports.create = function (req, res, next) {
  var lead = new Lead(req.body);

  lead.save(function (err) {
    if(err) {
      if (err.code === 11000) {
        return res.status(400).json({error: 'Email already registered.'});
      } else if(err.errors.email.message === 'email field cannot be empty.' || err.errors.email.message === 'email field is not valid.') {
        return res.status(400).json({error: err.errors.email.message});
      }
    }
    res.status(200).json(lead);
  });
};