import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('account', { path: '/:account_id' }, function() {
    this.route('inbox', function() {
      this.route('message', { path: '/:message_id' });
    });
    this.route('sent', function() {
      this.route('message', { path: '/:message_id' });
    });
  });
});

export default Router;
