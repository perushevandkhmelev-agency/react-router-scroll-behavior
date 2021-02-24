'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setScrollRestoration;
function setScrollRestoration(scrollRestoration) {
  /* istanbul ignore if: not supported by any browsers on Travis */
  if ('scrollRestoration' in window.history) {
    var oldScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = scrollRestoration;

    return function () {
      window.history.scrollRestoration = oldScrollRestoration;
    };
  }

  return null;
}