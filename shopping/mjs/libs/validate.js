"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validate {
    static isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }
    static checkQuantity(value) {
        if (value < 1 || Validate.isNumber(value) == false) {
            return false;
        }
        return true;
    }
}
exports.Validate = Validate;
