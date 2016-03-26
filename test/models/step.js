var assert = require('assert')
  , tests
  , Step = geddy.model.Step;

tests = {

  'after': function (next) {
    // cleanup DB
    Step.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var step = Step.create({});
    step.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
