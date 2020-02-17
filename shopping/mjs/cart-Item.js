"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("./libs/helpers");
class CartItem {
    constructor(product, quantity = 1) {
        this._product = product;
        this._quantity = quantity;
    }
    get product() {
        return this._product;
    }
    set product(v) {
        this._product = v;
    }
    get quantity() {
        return this._quantity;
    }
    set quantity(v) {
        this._quantity = v;
    }
    showCartItemInHTML(index) {
        return `<tr>
                <th scope="row">${index + 1}</th>
                <td>${this.product.name}</td>
                <td> ${helpers_1.Helpers.toCurrency(this.product.price, "$")} </td>
                <td><input name="cart-item-quantity-${this.product.id}" type="number" value="${this.quantity}" min="1"></td>
                <td > <strong>${helpers_1.Helpers.toCurrency(this.getSubtotal(), "USD")} </strong></td>
                <td><a id="update-cart-item" href = "#" class="label label-info"
        data-product="${this.product.id}"> Update </a>
                <a id = "delete-cart-item" href = "#" class="label label-danger"
        data-product="${this.product.id}" > Delete </a>
                </td>
                 </tr>`;
    }
    getSubtotal() {
        return this.product.price * this.quantity;
    }
}
exports.CartItem = CartItem;
