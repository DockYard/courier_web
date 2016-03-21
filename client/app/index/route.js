import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model() {
    return this.store.peekAll('account');
  },
  actions: {
    go(account) {
      if (account) {
        this.transitionTo('account.inbox', account);
      }
    }
  }
});
