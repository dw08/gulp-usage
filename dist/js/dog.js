"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dog = /*#__PURE__*/function () {
  function Dog(name, color) {
    _classCallCheck(this, Dog);

    this.name = name;
    this.color = color;
  }

  _createClass(Dog, [{
    key: "bark",
    value: function bark() {
      console.log("\u6211\u53EB".concat(this.name, ",\u6211\u662F").concat(this.color, "\u7684\u5C0F\u72D7"));
    }
  }]);

  return Dog;
}();