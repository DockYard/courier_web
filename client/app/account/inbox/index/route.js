import Ember from 'ember';

const {
  get,
  Route
} = Ember;

export default Route.extend({
  model() {
    return get(this.modelFor('account'), 'receivedMessages');
  }
});
