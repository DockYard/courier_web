import Ember from 'ember';

const {
  set,
  Route
} = Ember;

export default Route.extend({
  model() {
    return this.store.findAll('message');
  },
  setupController(controller) {
    this._super(...arguments);
    set(controller, 'accounts', this.store.peekAll('account'));
  }
});
