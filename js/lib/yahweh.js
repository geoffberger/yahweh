(function(win) {
  'use strict';
  var Yahweh = {};

  function throwError(name, message) {
    throw {
      name: name,
      message: message
    };
  }

  Yahweh.Inject = function(obj) {
    if (obj.name) {
      return new obj.name(obj.args || {});
    } else {
      throwError('ObjectNotFound', 'Come on you idiot, pass in a qualified object.');
    }
  };

  Yahweh.ViewsManager = Backbone.View.extend({
    initialize: function(options) {
      this.options = options;
      this.views = this.createViews(options.views || []);
    },

    createViews: function(views) {
      var i, len, view, instance, instances = [];

      for (i = 0, len = views.length; i < len; i++) {
        view = views[i];
        view.args = this.determineArgs(view);
        instance = Yahweh.Inject(view);
        instances.push(instance);
      }

      return instances;
    },

    determineArgs: function(view) {
      view.args = view.args || {};
      view.args.el = this.el || {};
      return view.args;
    }
  });

  Yahweh.Builder = Backbone.View.extend({
    initialize: function(options) {
      this.preInit(options);
      this.sections = this.createSections(options.sections || {});
      this.postInit(options);
    },

    createSections: function(sections) {
      var instances = {};

      _.each(sections, function(obj, name) {
        instances[name] = this.createInstance(obj);
      }, this);

      return instances;
    },

    createInstance: function(obj) {
      obj.args = obj.args || {};
      obj.args = this.addToInstantiation(obj.args);
      return new Yahweh.Inject(obj);
    },

    addToInstantiation: function(obj) {
      return obj;
    },

    render: function() {
      this.preRender();

      _.each(this.sections, function(section, id) {
        this.appendSection(id, section);
      }, this);

      this.postRender();
      return this;
    },

    appendSection: function(id, section) {
      var el;

      if ((el = document.getElementById(id))) {
        el.appendChild(section.render().el);
      } else {
        throwError('NodeNotFound', 'Hey dummy! If you\'re going to define an id, use it, ok?');
      }
    },

    preInit: function(options) {},

    postInit: function(options) {},

    preRender: function() {},

    postRender: function() {}
  });

  win.Yahweh = Yahweh;
}(window));

