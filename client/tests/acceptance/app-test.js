import { test } from 'qunit';
import moduleForAcceptance from 'client/tests/helpers/module-for-acceptance';
import data from 'client/tests/helpers/data-test-attribute';

moduleForAcceptance('Acceptance | app', {
  beforeEach() {
    $.ajax({url: '/test-start', async: false, headers: {Accept: 'application/vnd.api+json'}});
  }
});

// For PhantomJS (╯°□°)╯︵ ┻━┻
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

test('choosing an account that exists', function(assert) {
  visit('/');

  andThen(function() {
    fillIn('.sign-in input', 'from@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    assert.equal(currentURL(), '/from@example.com/inbox');
  });
});

test('choosing an account that doesn\'t exist', function(assert) {
  visit('/');

  andThen(function() {
    fillIn('.sign-in input', 'non-exist@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('Viewing the inbox when no messages', function(assert) {
  visit('/');

  andThen(function() {
    fillIn('.sign-in input', 'from@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    assert.equal(find('.box').text().trim(), 'No Messages!');
  });
});

test('Viewing the sent mail when no messages', function(assert) {
  visit('/');

  andThen(function() {
    fillIn('.sign-in input', 'to@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    click(data('sent'));
  });

  andThen(function() {
    assert.equal(find('.box').text().trim(), 'No Messages!');
  });
});

test('Viewing an inbox mesage and deleting it', function(assert) {
  visit('/');

  let messageCount;

  andThen(function() {
    fillIn('.sign-in input', 'to@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    messageCount = find('tbody.messages tr').length;
    click('tbody.messages tr:first-child');
  });

  andThen(function() {
    assert.ok(currentURL().match(/to@example.com\/inbox\/[\w|-]+/));
    assert.equal(find('.box .message .subject').text(), 'Welcome aboard!');
    assert.equal(find('.box .message .header.from').text(), 'Application');
    assert.equal(find('.box .message .header.to').text(), 'to User');
    assert.equal(find('.box .message .body').text().trim(), 'Thank you for signing up.');
    click(data('message-display'));
  });

  andThen(function() {
    assert.ok(find('.raw').text().includes('Subject: Welcome aboard!'));
    click(data('message-delete'));
  });

  andThen(function() {
    click(data('delete-cancel'));
  });

  andThen(function() {
    click(data('message-delete'));
  });

  andThen(function() {
    click(data('delete-confirm'));
  });

  andThen(function() {
    assert.equal(currentURL(), '/to@example.com/inbox');
    assert.equal(find('tbody.messages tr').length, messageCount - 1);
  });
});

test('Viewing an sent mesage and deleting it', function(assert) {
  visit('/');

  let messageCount;

  andThen(function() {
    fillIn('.sign-in input', 'from@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    click(data('sent'));
  });

  andThen(function() {
    messageCount = find('tbody.messages tr').length;
    click('tbody.messages tr:first-child');
  });

  andThen(function() {
    assert.ok(currentURL().match(/from@example.com\/sent\/[\w|-]+/));
    assert.equal(find('.box .message .subject').text(), 'Welcome aboard!');
    assert.equal(find('.box .message .header.from').text(), 'Application');
    assert.equal(find('.box .message .header.to').text(), 'to User');
    assert.equal(find('.box .message .body').text().trim(), 'Thank you for signing up.');
    click(data('message-display'));
  });

  andThen(function() {
    assert.ok(find('.raw').text().includes('Subject: Welcome aboard!'));
    click(data('message-delete'));
  });

  andThen(function() {
    click(data('delete-cancel'));
  });

  andThen(function() {
    click(data('message-delete'));
  });

  andThen(function() {
    click(data('delete-confirm'));
  });

  andThen(function() {
    assert.equal(currentURL(), '/from@example.com/sent');
    assert.equal(find('tbody.messages tr').length, messageCount - 1);
  });
});

test('switching accounts', function(assert) {
  visit('/');

  andThen(function() {
    fillIn('.sign-in input', 'from@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    assert.equal(currentURL(), '/from@example.com/inbox');
    click(find('a:contains("Application <from@example.com>")'));
  });

  andThen(function() {
    click(find('a:contains("User <to@example.com>")'));
  });

  andThen(function() {
    assert.equal(currentURL(), '/to@example.com/inbox');
  });
});

test('signing out', function(assert) {
  visit('/');

  andThen(function() {
    fillIn('.sign-in input', 'from@example.com');
  });

  andThen(function() {
    click('.sign-in button');
  });

  andThen(function() {
    assert.equal(currentURL(), '/from@example.com/inbox');
    click(find('a:contains("Application <from@example.com>")'));
  });

  andThen(function() {
    click(find('a:contains("Sign out")'));
  });

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});
