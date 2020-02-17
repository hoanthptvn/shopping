"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helpers {
    //$ 20 - USD 20 - VND 20 - 20 USD 
    static toCurrency(value, currenUnit, position = "right") {
        if (position == "left") {
            return currenUnit + ' ' + value;
        }
        else if (position == "right") {
            return value + ' ' + currenUnit;
        }
    }
}
exports.Helpers = Helpers;
