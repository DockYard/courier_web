import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model({account_id}) {
    return this.store.peekRecord('account', account_id);
  }
});
