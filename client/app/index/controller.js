import Ember from 'ember';

const {
  get,
  computed,
  Controller
} = Ember;

export default Controller.extend({
  account: computed('email', function() {
    let email = get(this, 'email');

    return this.store.peekAll('account').find(function(account) {
      return get(account, 'email') === email;
    });
  }),
  name: computed('email', function() {
    let email = get(this, 'email');
    let account = get(this, 'account');

    if (email && email.match(/\w+@\w+\.\w+/)) {
      if (account) {
        return get(account, 'tableName');
      } else {
        return 'Account not found.';
      }
    }
  })
});
