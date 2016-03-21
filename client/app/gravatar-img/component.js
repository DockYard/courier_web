import Ember from 'ember';
import md5 from 'md5';

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  classNames: ['circle', 'avatar'],
  src: computed('email', function() {
    let email = get(this, 'email');

    if (email && email.match(/\w+@\w+\.\w+/)) {
      return `https://www.gravatar.com/avatar/${md5(get(this, 'email'))}?d=retro`;
    } else {
      return 'images/person.png';
    }
  })
});
