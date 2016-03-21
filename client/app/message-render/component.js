import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  raw: false,
  actions: {
    toggleDisplay() {
      this.toggleProperty('raw');
    }
  }
});
