import Ember from 'ember';

const {
  get,
  computed,
  Component
} = Ember;

export default Component.extend({
  dataURI: computed('attachment', function() {
    let attachment = get(this, 'attachment');
    let contentType = get(attachment, 'headers.content-type');
    let body = get(attachment, 'body');

    return `data:${contentType};base64,${body}`;
  }),
  fileName: computed('attachment', function() {
    return get(this, 'attachment.headers.content-disposition.lastObject.lastObject');
  }),
  bytes: computed('attachment', function() {
    let attachment = get(this, 'attachment');
    let type = get(attachment, 'headers.content-type');
    return new Blob([attachment.body], {type: type}).size;
  })
});
