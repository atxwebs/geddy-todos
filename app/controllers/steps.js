var Steps = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Step.all(function(err, steps) {
      if (err) {
        throw err;
      }
      self.respondWith(steps, {type:'Step'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , step = geddy.model.Step.create(params);

    if (!step.isValid()) {
      this.respondWith(step);
    }
    else {
      step.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(step, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Step.first(params.id, function(err, step) {
      if (err) {
        throw err;
      }
      if (!step) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(step);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Step.first(params.id, function(err, step) {
      if (err) {
        throw err;
      }
      if (!step) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(step);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Step.first(params.id, function(err, step) {
      if (err) {
        throw err;
      }
      step.updateProperties(params);

      if (!step.isValid()) {
        self.respondWith(step);
      }
      else {
        step.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(step, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Step.first(params.id, function(err, step) {
      if (err) {
        throw err;
      }
      if (!step) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Step.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(step);
        });
      }
    });
  };

};

exports.Steps = Steps;
