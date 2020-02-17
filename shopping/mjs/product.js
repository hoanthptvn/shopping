"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, name, image, summary, price, isBuy = true) {
        this._id = id;
        this._name = name;
        this._image = image;
        this._summary = summary;
        this._price = price;
        this._isBuy = isBuy;
    }
    get id() {
        return this._id;
    }
    set id(v) {
        this.id = v;
    }
    get name() {
        return this._name;
    }
    set name(v) {
        this._name = v;
    }
    get image() {
        return this._image;
    }
    set image(v) {
        this._image = v;
    }
    get summary() {
        return this._summary;
    }
    set summary(v) {
        this._summary = v;
    }
    get price() {
        return this._price;
    }
    set price(v) {
        this._price = v;
    }
    get isBuy() {
        return this._isBuy;
    }
    set isBuy(v) {
        this._isBuy = v;
    }
}
exports.Product = Product;
