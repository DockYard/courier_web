(function() {
  function vendorModule() {
    'use strict';

    return { 'default': self['md5'] };
  }

  define('md5', [], vendorModule);
})();
