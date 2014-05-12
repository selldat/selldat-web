'use strict';

var should = require('should'),
  request = require('supertest'),
  server = require('../../../server.js'),
  mongoose = require('mongoose');

describe('Unit Test', function () {
  describe('Route Lead:', function () {
    before(function (done) {
      removeAllLeads(done);
    });

    describe('POST /leads', function () {
      it('should respond with the new lead created', function (done) {
        request(server)
          .post('/leads')
          .send({
            email: 'wilson.balderrama@gmail.com'
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }

            done();
          });
      });

      it('should get an error because email is valid', function (done) {
        request(server)
          .post('/leads')
          .send({
            email: 'notvalidemail'
          })
          .expect(400)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var response = JSON.parse(res.text);
            response.error.should.equal('email field is not valid.');
            done();
          });
      });

      it('should get an error because email is empty', function (done) {
        request(server)
          .post('/leads')
          .send({
            email: ''
          })
          .expect(400)
          .end(function (err, res) {
            if (err) {
              return done(err);
            }
            var response = JSON.parse(res.text);
            response.error.should.equal('email field cannot be empty.');
            done();
          });
      });

    });

    after(function (done) {
      removeAllLeads(done);
    });
  });
});

function removeAllLeads(done) {
  mongoose.connections[0].collections['leads'].remove(function() {
    done();
  });
}