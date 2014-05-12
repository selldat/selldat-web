'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LeadSchema = new Schema({
  email: {type: String, unique: true}
});

LeadSchema.path('email').validate(function (email) {
  return (typeof email === 'string' && email.length > 0);
}, 'email field cannot be empty.');

LeadSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'email field is not valid.');

mongoose.model('Lead', LeadSchema);