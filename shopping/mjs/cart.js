"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cart_Item_1 = require("./cart-Item");
const helpers_1 = require("./libs/helpers");
class Cart {
    constructor() {
        this.cartItems = [];
        this.totalQuantity = 0;
        this.totalPrice = 0;
    }
    addProduct(product, quantity = 1) {
        let position = this.getProductPosition(product);
        if (position > -1) {
            this.cartItems[position].quantity += quantity;
        }
        else {
            let cartItem = new cart_Item_1.CartItem(product, quantity);
            this.cartItems[this.cartItems.length] = cartItem;
        }
        this.totalQuantity += quantity;
        this.totalPrice += product.price * quantity;
    }
    getProductPosition(product) {
        let total = this.cartItems.length;
        let i = 0;
        for (i; i < total; i++) {
            if (this.cartItems[i].product.id == product.id) {
                return i;
            }
        }
        return -1;
    }
    updateProduct(product, quantity = 1) {
        let position = this.getProductPosition(product);
        if (position > -1) {
            this.totalQuantity = this.totalQuantity - this.cartItems[position].quantity + quantity;
            this.totalPrice = this.totalPrice - product.price * (this.cartItems[position].quantity - quantity);
            this.cartItems[position].quantity = quantity;
        }
    }
    deleteProduct(product) {
        let position = this.getProductPosition(product);
        if (position > -1) {
            this.totalQuantity = this.totalQuantity - this.cartItems[position].quantity;
            this.totalPrice = this.totalPrice - (this.cartItems[position].quantity * product.price);
            this.cartItems.splice(position, 1);
        }
    }
    isEmpty() {
        return (this.cartItems.length === 0);
    }
    showCartBodyInHTML() {
        let xhtmlResult = '';
        if (!this.isEmpty()) {
            let total = this.cartItems.length;
            let i = 0;
            for (i; i < total; i++) {
                let currentProduct = this.cartItems[i];
                xhtmlResult += currentProduct.showCartItemInHTML(i);
            }
        }
        return xhtmlResult;
    }
    showCartFooterInHTML() {
        let xhtmlResult = '';
        if (!this.isEmpty()) {
            xhtmlResult = `<tr>
            <td colspan="4">There are <b>${this.totalQuantity}</b> items in your shopping cart.</td>
            <td colspan="2" class="total-price text-left"> ${helpers_1.Helpers.toCurrency(this.totalPrice, "USD")}  </td>
        </tr>`;
        }
        else {
            xhtmlResult = '<tr><th colspan="6">Empty product in your cart<th></tr>';
        }
        return xhtmlResult;
    }
}
exports.Cart = Cart;
