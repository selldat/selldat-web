'use strict';

var should = require('should'),
  mongoose = require('mongoose'),
  Lead = mongoose.model('Lead');

var lead1, lead2, lead3;

describe('<Unit Test>', function () {
  describe('Model Lead:', function () {
    before(function (done) {
      lead1 = new Lead({
        email: 'wilson.balderrama@gmail.com'
      });

      lead2 = new Lead(lead1);

      lead3 = new Lead({
        email: 'none'
      });
      done();
    });

    describe('Method Save', function() {
      it('should be able to save without any problems', function (done) {
        lead1.save(done);
      });

      it('should fail to save an existing lead', function (done) {
        lead1.save();

        return lead2.save(function (err) {
          should.exist(err);
          done();
        });
      });

      it('should fail to save an invalid email', function (done) {
        lead3.save(function (err) {
          should.exist(err);
          done();
        });
      });
    });

    after(function (done) {
      lead1.remove();
      lead3.remove();
      done();
    });
  });
});