import Ember from 'ember';

const {
  get,
  Helper: { helper }
} = Ember;

export function messageRecipients([message]) {
  return get(message, 'recipients').map(function(recipient) {
    return get(recipient, 'tableName');
  }).join(', ');
}

export default helper(messageRecipients);
