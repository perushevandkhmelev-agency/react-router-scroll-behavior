'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = simple;

var _Actions = require('history/lib/Actions');

var _behavior = require('./behavior');

var _behavior2 = _interopRequireDefault(_behavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `simple` behavior scrolls to the top of the page on `PUSH` and `REPLACE`
 * transitions, while allowing the browser to manage scroll position for `POP`
 * transitions.
 *
 * This can give pretty good results with synchronous transitions on browsers
 * like Chrome that don't update the scroll position until after they've
 * notified `history` of the location change. It will not work as well when
 * using asynchronous transitions or with browsers like Firefox that update
 * the scroll position before emitting the location change.
 */
function simple(createHistory) {
  // Don't override the browser's scroll behavior here - we actively want the
  // the browser to take care of scrolling on `POP` transitions.

  function updateScroll(_ref) {
    var action = _ref.action;

    if (action === _Actions.POP) {
      return;
    }

    window.scrollTo(0, 0);
  }

  return _extends({}, _behavior2.default, {
    updateScroll: updateScroll
  });
}