import Ember from 'ember';

const {
  get,
  computed,
  Controller
} = Ember;

export default Controller.extend({
  filteredAccounts: computed('model', function() {
    return this.store.peekAll('account')
      .filter((account) => {
        return account !== get(this, 'model');
      });
  })
});
