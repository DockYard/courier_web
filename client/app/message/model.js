import Ember from 'ember';
import DS from 'ember-data';

const {
  get,
  computed,
  computed: { alias }
} = Ember;

const {
  attr,
  belongsTo,
  hasMany,
  Model
} = DS;

export default Model.extend({
  headers: attr(),
  parts: attr(),
  body: attr(),
  raw: attr(),

  from: belongsTo('account', {async: false}),
  recipients: hasMany('account', {async: false}),

  subject: alias('headers.subject'),
  date: alias('headers.date'),

  attachments: computed('parts', function() {
    return get(this, 'parts').filter(function(part) {
      return part.headers['content-disposition'] && part.headers['content-disposition'][0] === 'attachment';
    });
  }),

  html: computed(function() {
    let part = this.findByContentType([this], 'text/html');

    if (part) {
      return get(part, 'body');
    }
  }),

  text: computed(function() {
    let part = this.findByContentType([this], 'text/plain');

    if (part) {
      return get(part, 'body');
    }
  }),

  findByContentType(parts, contentType) {
    let found;

    for(let i = 0; i < parts.length; i++) {
      let part = parts[i];

      if (get(part, 'headers.content-type') === contentType) {
        found = part;
        break;
      } else if (!get(part, 'parts')) {
        continue;
      } else {
        let result = this.findByContentType(get(part, 'parts'), contentType);

        if (result) {
          found = result;
          break;
        } else {
          continue;
        }
      }
    }

    return found;
  }
});
