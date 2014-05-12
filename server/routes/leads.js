'use strict';

var leads = require('../controllers/leads');

module.exports = function (app) {
  app.route('/leads')
    .post(leads.create);
};