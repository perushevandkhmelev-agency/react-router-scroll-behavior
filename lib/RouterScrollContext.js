'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _RouterContext = require('react-router/lib/RouterContext');

var _RouterContext2 = _interopRequireDefault(_RouterContext);

var _standard = require('./behaviors/standard');

var _standard2 = _interopRequireDefault(_standard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouterScrollContext = function (_Component) {
  _inherits(RouterScrollContext, _Component);

  function RouterScrollContext(props) {
    _classCallCheck(this, RouterScrollContext);

    var _this = _possibleConstructorReturn(this, (RouterScrollContext.__proto__ || Object.getPrototypeOf(RouterScrollContext)).call(this, props));

    _this.scrollBehavior = props.behavior();
    return _this;
  }

  _createClass(RouterScrollContext, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          shouldUpdateScroll = _props.shouldUpdateScroll,
          location = _props.location;
      // refresh?

      if (shouldUpdateScroll(null, location)) {
        this.scrollBehavior.updateScroll(location);
      }
      this.scrollBehavior.start();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.scrollBehavior.cancel();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          shouldUpdateScroll = _props2.shouldUpdateScroll,
          location = _props2.location;

      if (shouldUpdateScroll(prevProps.location, location)) {
        this.scrollBehavior.updateScroll(location);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.scrollBehavior.stop();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          render = _props3.render,
          passedProps = _objectWithoutProperties(_props3, ['render']);

      return render(passedProps);
    }
  }]);

  return RouterScrollContext;
}(_react.Component);

RouterScrollContext.propTypes = {
  behavior: _propTypes2.default.func,
  render: _propTypes2.default.func.isRequired
};
RouterScrollContext.defaultProps = {
  behavior: _standard2.default,
  shouldUpdateScroll: function shouldUpdateScroll() {
    return true;
  },
  render: function render(props) {
    return _react2.default.createElement(_RouterContext2.default, props);
  }
};
exports.default = RouterScrollContext;