import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

if (config.environment !== 'production') {
  Ember.Component.reopen({
    attributeBindings: ['data-test']
  });
}

loadInitializers(App, config.modulePrefix);

export default App;
