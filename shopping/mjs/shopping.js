"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = require("./product-repository");
const cart_1 = require("./cart");
const validate_1 = require("./libs/validate");
var MElement;
(function (MElement) {
    MElement.ELM_LIST_PRODUCT = '#list-product';
    MElement.ELM_NOTIFICATION = '#mnotification';
    MElement.ELM_CART_BODY = '#my-cart-body';
    MElement.ELM_CART_FOOTER = '#my-cart-footer';
})(MElement || (MElement = {}));
var MNotification;
(function (MNotification) {
    MNotification.NOTI_READY_TO_BUY = `<div class="alert alert-success" role="alert" id="mnotification">Ready to buy product</div>`;
    MNotification.NOTI_GREATER_THAN_ONE = `<div class="alert alert-success" role="alert" id="mnotification">Quantity must equal or greater than 1</div>`;
})(MNotification || (MNotification = {}));
let productRepository = new product_repository_1.ProductRepository();
let cartObj = new cart_1.Cart();
let products = productRepository.getItems();
function showListProduct() {
    $(MElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML());
}
function showNofinication(str) {
    $(MElement.ELM_NOTIFICATION).html(str);
}
function showCart() {
    $(MElement.ELM_CART_BODY).html(cartObj.showCartBodyInHTML());
    $(MElement.ELM_CART_FOOTER).html(cartObj.showCartFooterInHTML());
}
// Add product
function addProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        let product = productRepository.getItemById(id);
        cartObj.addProduct(product, quantity);
        showCart();
        showNofinication(`<div class="alert alert-success" role="alert" id="mnotification">Add <b>${product.name}</b></div>`);
    }
    else {
        showNofinication(MNotification.NOTI_GREATER_THAN_ONE);
    }
}
// Update product
function updateProduct(id, quantity) {
    if (validate_1.Validate.checkQuantity(quantity)) {
        let product = productRepository.getItemById(id);
        cartObj.updateProduct(product, quantity);
        showCart();
        showNofinication(`<div class="alert alert-success" role="alert" id="mnotification">Updated <b>${product.name}</b></div>`);
    }
    else {
        showNofinication(MNotification.NOTI_GREATER_THAN_ONE);
    }
}
// Delete product
function removeProduct(id) {
    let product = productRepository.getItemById(id);
    cartObj.deleteProduct(product);
    showCart();
    showNofinication(`<div class="alert alert-success" role="alert" id="mnotification">Delete <b>${product.name}</b></div>`);
}
$(document).ready(function () {
    // Hien thi danh sach san pham
    showListProduct();
    // Gio hang rong 
    showCart();
    // Update thong bao
    showNofinication(MNotification.NOTI_READY_TO_BUY);
    // Buy product
    $('a.price').click(function () {
        let id = $(this).data("product");
        let quantity = Number($("input[name='quantity-product-" + id + "']").val());
        addProduct(id, quantity);
        $("input[name='quantity-product-" + id + "']").val(1);
    });
    // Update product
    $(document).on("click", "a#update-cart-item", function () {
        let id = $(this).data("product");
        let quantity = Number($("input[name='cart-item-quantity-" + id + "']").val());
        updateProduct(id, quantity);
    });
    // Delete product
    $(document).on("click", "a#delete-cart-item", function () {
        let id = $(this).data("product");
        removeProduct(id);
    });
});
