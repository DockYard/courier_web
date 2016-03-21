import Ember from 'ember';

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({
  body: computed('message', function() {
    let message = get(this, 'message');

    if (get(message, 'body')) {
      return get(message, 'body');
    } else if (get(message, 'html')) {
      return get(message, 'html');
    } else {
      return get(message, 'text');
    }
  })
});
