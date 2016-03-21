import DS from 'ember-data';

const {
  JSONAPIAdapter
} = DS;

function getNamespace() {
  let a = document.createElement('a');
  a.href = document.getElementsByTagName('base')[0].href;

  if (a.pathname === "/") {
    return undefined;
  } else {
    return a.pathname;
  }
}

export default JSONAPIAdapter.extend({
  namespace: getNamespace()
});
