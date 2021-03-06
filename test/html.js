// modules
const assert        = require('assert');
const _             = require('underscore');
const passmarked        = require('passmarked');
const fs            = require('fs');
const testFunc      = require('../lib/rules/html');

// checks warnings that we check for
describe('html', function() {

  // handle the error output
  it('Should just run if page content was null', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, null);

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // done
      done();

    });

  });

  // handle the error output
  it('Should just run if page content was blank', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, '');

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // done
      done();

    });

  });

  // handle the error output
  it('Should return a error if not minified', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync('./samples/html.bad.html').toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'minify.html'; });

      if(!rule) assert.fail('Should have returned a error as the HTML was not minified');

      // done
      done();

    });

  });

  // handle the error output
  it('Should not return a error if already minified', function(done) {

    payload = passmarked.createPayload({

        url: 'http://example.com'

      }, {}, fs.readFileSync('./samples/html.good.html').toString());

    // execute the items
    testFunc(payload, function(err) {

      // check the error
      if(err) assert.fail('Got a error from the function');

      // get the rules
      var rules = payload.getRules();

      // should have one rule
      var rule = _.find(rules || [], function(item) { return item.key === 'minify.html'; });

      if(rule) assert.fail('Was not expecting a error');

      // done
      done();

    });

  });

});
