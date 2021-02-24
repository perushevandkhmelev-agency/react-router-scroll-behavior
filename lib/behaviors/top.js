'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = top;

var _Actions = require('history/lib/Actions');

var _setScrollRestoration = require('../setScrollRestoration');

var _setScrollRestoration2 = _interopRequireDefault(_setScrollRestoration);

var _behavior = require('./behavior');

var _behavior2 = _interopRequireDefault(_behavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `top` behavior scrolls to the top of the page after any transition.
 *
 * This is not fully reliable for `POP` transitions.
 */
function top(createHistory) {
  var unsetScrollRestoration = void 0;

  function updateScroll(_ref) {
    var action = _ref.action;

    // If we didn't manage to disable the default scroll restoration, and it's
    // a pop transition for which the browser might restore scroll position,
    // then let the browser update to its remembered scroll position first,
    // before we set the actual correct scroll position.
    if (action === _Actions.POP && !unsetScrollRestoration) {
      setTimeout(function () {
        return window.scrollTo(0, 0);
      });
      return;
    }

    window.scrollTo(0, 0);
  }

  function start() {
    // This helps avoid some jankiness in fighting against the browser's
    // default scroll behavior on `POP` transitions.
    unsetScrollRestoration = (0, _setScrollRestoration2.default)('manual');
  }

  function stop() {
    /* istanbul ignore if: not supported by any browsers on Travis */
    if (unsetScrollRestoration) {
      unsetScrollRestoration();
    }
  }

  return _extends({}, _behavior2.default, {
    start: start,
    stop: stop,
    updateScroll: updateScroll
  });
}