/*global describe:false, it:false, before:false, after:false, afterEach:false*/

'use strict';

var app = require('../index'),
  kraken = require('kraken-js'),
  request = require('supertest');

describe('/', function () {

  var mock;

  beforeEach(function (done) {
    kraken.create(app).listen(function (err, server) {
      mock = server;
      done(err);
    });
  });

  afterEach(function (done) {
    mock.close(done);
  });

  it('should have title about Conway', function (done) {
    request(mock)
      .get('')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(/Conway.*/)
      .end(function (err, res) {
        done(err);
      });
  });

});