'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = standard;

var _off = require('dom-helpers/events/off');

var _off2 = _interopRequireDefault(_off);

var _on = require('dom-helpers/events/on');

var _on2 = _interopRequireDefault(_on);

var _scrollLeft = require('dom-helpers/query/scrollLeft');

var _scrollLeft2 = _interopRequireDefault(_scrollLeft);

var _scrollTop = require('dom-helpers/query/scrollTop');

var _scrollTop2 = _interopRequireDefault(_scrollTop);

var _requestAnimationFrame = require('dom-helpers/util/requestAnimationFrame');

var _requestAnimationFrame2 = _interopRequireDefault(_requestAnimationFrame);

var _DOMStateStorage = require('history/lib/DOMStateStorage');

var _setScrollRestoration = require('../setScrollRestoration');

var _setScrollRestoration2 = _interopRequireDefault(_setScrollRestoration);

var _behavior = require('./behavior');

var _behavior2 = _interopRequireDefault(_behavior);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * `standard` behavior attempts to imitate native browser scroll behavior by
 * recording updates to the window scroll position, then restoring the previous
 * scroll position upon a `POP` transition.
 */
function standard() {
  var savePositionHandle = null;
  var currentKey = void 0;

  function getScrollPosition() {
    var state = (0, _DOMStateStorage.readState)(currentKey);
    if (!state) {
      return null;
    }

    return state.scrollPosition;
  }

  function updateScroll(_ref) {
    var key = _ref.key;

    currentKey = key;

    var _ref2 = getScrollPosition() || [0, 0],
        _ref3 = _slicedToArray(_ref2, 2),
        x = _ref3[0],
        y = _ref3[1];

    window.scrollTo(x, y);
  }

  var unsetScrollRestoration = void 0,
      unlistenScroll = void 0;

  function start() {
    // This helps avoid some jankiness in fighting against the browser's
    // default scroll behavior on `POP` transitions.
    unsetScrollRestoration = (0, _setScrollRestoration2.default)('manual');

    // We have to listen to each scroll update rather than to just location
    // updates, because some browsers will update scroll position before
    // emitting the location change.
    function onScroll() {
      if (savePositionHandle !== null) {
        return;
      }

      // It's possible that this scroll operation was triggered by what will be
      // a `POP` transition. Instead of updating the saved location
      // immediately, we have to enqueue the update, then potentially cancel it
      // if we observe a location update.
      savePositionHandle = (0, _requestAnimationFrame2.default)(function () {
        savePositionHandle = null;

        var state = (0, _DOMStateStorage.readState)(currentKey);
        var scrollPosition = [(0, _scrollLeft2.default)(window), (0, _scrollTop2.default)(window)];

        // We have to directly update `DOMStateStorage`, because actually
        // updating the location could cause e.g. React Router to re-render the
        // entire page, which would lead to observably bad scroll performance.
        (0, _DOMStateStorage.saveState)(currentKey, _extends({}, state, { scrollPosition: scrollPosition }));
      });
    }

    (0, _on2.default)(window, 'scroll', onScroll);
    unlistenScroll = function unlistenScroll() {
      return (0, _off2.default)(window, 'scroll', onScroll);
    };
  }

  function cancel() {
    if (savePositionHandle !== null) {
      _requestAnimationFrame2.default.cancel(savePositionHandle);
      savePositionHandle = null;
    }
  }

  function stop() {
    /* istanbul ignore if: not supported by any browsers on Travis */
    if (unsetScrollRestoration) {
      unsetScrollRestoration();
    }

    unlistenScroll();
  }

  return _extends({}, _behavior2.default, {
    start: start,
    cancel: cancel,
    stop: stop,
    updateScroll: updateScroll
  });
}