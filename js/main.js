require.config({
  baseUrl: '.',

  paths: {
    jquery: 'bower_components/jquery/jquery',
    underscore: 'bower_components/underscore/underscore',
    backbone: 'bower_components/backbone/backbone',
    yahweh: 'src/yahweh',
    'page-manager': 'src/page-manager'
  },

  shim: {
    'page-manager': {
      deps: ['backbone', 'yahweh'],
      exports: 'PageManager'
    },

    'yahweh': {
      deps: ['underscore', 'backbone'],
      exports: 'Yahweh'
    },

    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    'underscore': {
      exports: '_'
    }
  }
});

