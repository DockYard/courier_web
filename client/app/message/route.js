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
        let account = this.modelFor('account');
        let newRoutePath = this.routeName.replace('.message', '');
        this.transitionTo(newRoutePath, account);
      });
    }
  }
});
