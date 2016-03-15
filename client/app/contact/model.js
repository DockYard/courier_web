import Ember from 'ember';
import DS from 'ember-data';

const {
  get,
  computed
} = Ember;

const {
  attr,
  hasMany,
  Model
} = DS;

export default Model.extend({
  name: attr(),
  email: attr(),

  sentMessages: hasMany('message', {inverse: 'from', async: false}),
  receivedMessages: hasMany('message', {inverse: 'recipients', async: false}),

  displayName: computed('name', 'email', function() {
    let name = get(this, 'name');
    let email = get(this, 'email');

    if (name) {
      return `${name} <${email}>`;
    } else {
      return email;
    }
  })
});
