import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['headers'],
  display: false,
  click() {
    this.toggleProperty('display');
  }
});
