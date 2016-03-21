define('client/tests/acceptance/app-test', ['exports', 'qunit', 'client/tests/helpers/module-for-acceptance', 'client/tests/helpers/data-test-attribute'], function (exports, _qunit, _clientTestsHelpersModuleForAcceptance, _clientTestsHelpersDataTestAttribute) {

  (0, _clientTestsHelpersModuleForAcceptance['default'])('Acceptance | app', {
    beforeEach: function beforeEach() {
      $.ajax({ url: '/test-start', async: false, headers: { Accept: 'application/vnd.api+json' } });
    }
  });

  (0, _qunit.test)('choosing an account that exists', function (assert) {
    visit('/');

    andThen(function () {
      fillIn('.sign-in input', 'from@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      assert.equal(currentURL(), '/from@example.com/inbox');
    });
  });

  (0, _qunit.test)('choosing an account that doesn\'t exist', function (assert) {
    visit('/');

    andThen(function () {
      fillIn('.sign-in input', 'non-exist@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      assert.equal(currentURL(), '/');
    });
  });

  (0, _qunit.test)('Viewing the inbox when no messages', function (assert) {
    visit('/');

    andThen(function () {
      fillIn('.sign-in input', 'from@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      assert.equal(find('.box').text().trim(), 'No Messages!');
    });
  });

  (0, _qunit.test)('Viewing the sent mail when no messages', function (assert) {
    visit('/');

    andThen(function () {
      fillIn('.sign-in input', 'to@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('sent'));
    });

    andThen(function () {
      assert.equal(find('.box').text().trim(), 'No Messages!');
    });
  });

  (0, _qunit.test)('Viewing an inbox mesage and deleting it', function (assert) {
    visit('/');

    var messageCount = undefined;

    andThen(function () {
      fillIn('.sign-in input', 'to@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      messageCount = find('tbody.messages tr').length;
      click('tbody.messages tr:first-child');
    });

    andThen(function () {
      assert.ok(currentURL().match(/to@example.com\/inbox\/[\w|-]+/));
      assert.equal(find('.box .message .subject').text(), 'Welcome aboard!');
      assert.equal(find('.box .message .header.from').text(), 'Application');
      assert.equal(find('.box .message .header.to').text(), 'to User');
      assert.equal(find('.box .message .body').text().trim(), 'Thank you for signing up.');
      click((0, _clientTestsHelpersDataTestAttribute['default'])('message-display'));
    });

    andThen(function () {
      assert.ok(find('.raw').text().includes('Subject: Welcome aboard!'));
      click((0, _clientTestsHelpersDataTestAttribute['default'])('message-delete'));
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('delete-cancel'));
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('message-delete'));
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('delete-confirm'));
    });

    andThen(function () {
      assert.equal(currentURL(), '/to@example.com/inbox');
      assert.equal(find('tbody.messages tr').length, messageCount - 1);
    });
  });

  (0, _qunit.test)('Viewing an sent mesage and deleting it', function (assert) {
    visit('/');

    var messageCount = undefined;

    andThen(function () {
      fillIn('.sign-in input', 'from@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('sent'));
    });

    andThen(function () {
      messageCount = find('tbody.messages tr').length;
      click('tbody.messages tr:first-child');
    });

    andThen(function () {
      assert.ok(currentURL().match(/from@example.com\/sent\/[\w|-]+/));
      assert.equal(find('.box .message .subject').text(), 'Welcome aboard!');
      assert.equal(find('.box .message .header.from').text(), 'Application');
      assert.equal(find('.box .message .header.to').text(), 'to User');
      assert.equal(find('.box .message .body').text().trim(), 'Thank you for signing up.');
      click((0, _clientTestsHelpersDataTestAttribute['default'])('message-display'));
    });

    andThen(function () {
      assert.ok(find('.raw').text().includes('Subject: Welcome aboard!'));
      click((0, _clientTestsHelpersDataTestAttribute['default'])('message-delete'));
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('delete-cancel'));
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('message-delete'));
    });

    andThen(function () {
      click((0, _clientTestsHelpersDataTestAttribute['default'])('delete-confirm'));
    });

    andThen(function () {
      assert.equal(currentURL(), '/from@example.com/sent');
      assert.equal(find('tbody.messages tr').length, messageCount - 1);
    });
  });

  (0, _qunit.test)('switching accounts', function (assert) {
    visit('/');

    andThen(function () {
      fillIn('.sign-in input', 'from@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      assert.equal(currentURL(), '/from@example.com/inbox');
      click(find('a:contains("Application <from@example.com>")'));
    });

    andThen(function () {
      click(find('a:contains("User <to@example.com>")'));
    });

    andThen(function () {
      assert.equal(currentURL(), '/to@example.com/inbox');
    });
  });

  (0, _qunit.test)('signing out', function (assert) {
    visit('/');

    andThen(function () {
      fillIn('.sign-in input', 'from@example.com');
    });

    andThen(function () {
      click('.sign-in button');
    });

    andThen(function () {
      assert.equal(currentURL(), '/from@example.com/inbox');
      click(find('a:contains("Application <from@example.com>")'));
    });

    andThen(function () {
      click(find('a:contains("Sign out")'));
    });

    andThen(function () {
      assert.equal(currentURL(), '/');
    });
  });
});
define('client/tests/acceptance/app-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/app-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/app-test.js should pass jshint.');
  });
});
define('client/tests/account/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/controller.js should pass jshint.');
  });
});
define('client/tests/account/inbox/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/inbox/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/inbox/index/route.js should pass jshint.');
  });
});
define('client/tests/account/inbox/message/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/inbox/message/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/inbox/message/route.js should pass jshint.');
  });
});
define('client/tests/account/inbox/message/template.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/inbox/message/template.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/inbox/message/template.js should pass jshint.');
  });
});
define('client/tests/account/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/model.js should pass jshint.');
  });
});
define('client/tests/account/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/route.js should pass jshint.');
  });
});
define('client/tests/account/sent/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/sent/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/sent/index/route.js should pass jshint.');
  });
});
define('client/tests/account/sent/message/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/sent/message/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/sent/message/route.js should pass jshint.');
  });
});
define('client/tests/account/sent/message/template.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - account/sent/message/template.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'account/sent/message/template.js should pass jshint.');
  });
});
define('client/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('client/tests/application/adapter.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - application/adapter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'application/adapter.js should pass jshint.');
  });
});
define('client/tests/application/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - application/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'application/route.js should pass jshint.');
  });
});
define('client/tests/gravatar-img/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - gravatar-img/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'gravatar-img/component.js should pass jshint.');
  });
});
define("client/tests/helpers/data-test-attribute", ["exports"], function (exports) {
  exports["default"] = function (value) {
    return find("[data-test=\"" + value + "\"]");
  };
});
define('client/tests/helpers/data-test-attribute.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/data-test-attribute.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/data-test-attribute.js should pass jshint.');
  });
});
define('client/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('client/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('client/tests/helpers/flash-message', ['exports', 'ember', 'ember-cli-flash/flash/object'], function (exports, _ember, _emberCliFlashFlashObject) {
  var K = _ember['default'].K;

  _emberCliFlashFlashObject['default'].reopen({ init: K });
});
define('client/tests/helpers/flash-message.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/flash-message.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/flash-message.js should pass jshint.');
  });
});
define('client/tests/helpers/message-recipients.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/message-recipients.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/message-recipients.js should pass jshint.');
  });
});
define('client/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'client/tests/helpers/start-app', 'client/tests/helpers/destroy-app'], function (exports, _qunit, _clientTestsHelpersStartApp, _clientTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _clientTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _clientTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('client/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('client/tests/helpers/resolver', ['exports', 'client/resolver', 'client/config/environment'], function (exports, _clientResolver, _clientConfigEnvironment) {

  var resolver = _clientResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _clientConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _clientConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('client/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('client/tests/helpers/start-app', ['exports', 'ember', 'client/app', 'client/config/environment'], function (exports, _ember, _clientApp, _clientConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _clientConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _clientApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('client/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('client/tests/index/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - index/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'index/controller.js should pass jshint.');
  });
});
define('client/tests/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'index/route.js should pass jshint.');
  });
});
define('client/tests/message/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - message/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'message/model.js should pass jshint.');
  });
});
define('client/tests/message/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - message/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'message/route.js should pass jshint.');
  });
});
define('client/tests/message-render/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - message-render/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'message-render/component.js should pass jshint.');
  });
});
define('client/tests/message-render/rich/attachment/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - message-render/rich/attachment/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'message-render/rich/attachment/component.js should pass jshint.');
  });
});
define('client/tests/message-render/rich/component.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - message-render/rich/component.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'message-render/rich/component.js should pass jshint.');
  });
});
define('client/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('client/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('client/tests/test-helper', ['exports', 'client/tests/helpers/resolver', 'client/tests/helpers/flash-message', 'ember-qunit'], function (exports, _clientTestsHelpersResolver, _clientTestsHelpersFlashMessage, _emberQunit) {

  (0, _emberQunit.setResolver)(_clientTestsHelpersResolver['default']);
});
define('client/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('client/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map