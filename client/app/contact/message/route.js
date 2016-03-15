import Ember from 'ember';

const {
  get,
  Route
} = Ember;

export default Route.extend({
  model({message_id}) {
    return this.store.peekRecord('message', message_id);
  },
  actions: {
    deleteMessage() {
      let message = get(this, 'controller.model');

      message.destroyRecord().then(() => {
        let contact = this.modelFor('contact');
        this.transitionTo('contact', contact);
      });
    }
  }
});
