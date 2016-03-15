import Ember from 'ember';

const {
  Route
} = Ember;

export default Route.extend({
  model({contact_id}) {
    return this.store.peekRecord('contact', contact_id);
  }
});
