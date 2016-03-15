import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contact', { path: '/:contact_id' }, function() {
    this.route('inbox');
    this.route('sent');
    this.route('message', { path: '/messsages/:message_id' });
  });
});

export default Router;
