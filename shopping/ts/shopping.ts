import { ProductRepository } from "./product-repository";
import { Product } from "./product";
import { Cart } from "./cart";
import { Validate } from "./libs/validate";

namespace MElement {
    export const ELM_LIST_PRODUCT: string = '#list-product';
    export const ELM_NOTIFICATION: string = '#mnotification';
    export const ELM_CART_BODY: string = '#my-cart-body';
    export const ELM_CART_FOOTER: string = '#my-cart-footer';
}

namespace MNotification {
    export const NOTI_READY_TO_BUY: string = `<div class="alert alert-success" role="alert" id="mnotification">Ready to buy product</div>`;
    export const NOTI_GREATER_THAN_ONE = `<div class="alert alert-success" role="alert" id="mnotification">Quantity must equal or greater than 1</div>`;
}

let productRepository = new ProductRepository();
let cartObj = new Cart();
let products: Product[] = productRepository.getItems();


function showListProduct(): void {
    $(MElement.ELM_LIST_PRODUCT).html(productRepository.showItemsInHTML());
}

function showNofinication(str: string): void {
    $(MElement.ELM_NOTIFICATION).html(str);
}

function showCart(): void {
    $(MElement.ELM_CART_BODY).html(cartObj.showCartBodyInHTML());
    $(MElement.ELM_CART_FOOTER).html(cartObj.showCartFooterInHTML());
}

// Add product
function addProduct(id: number, quantity: number) {
    if (Validate.checkQuantity(quantity)) {
        let product: Product = productRepository.getItemById(id);
        cartObj.addProduct(product, quantity);
        showCart();
        showNofinication(`<div class="alert alert-success" role="alert" id="mnotification">Add <b>${product.name}</b></div>`);
    } else {
        showNofinication(MNotification.NOTI_GREATER_THAN_ONE);
    }
}

// Update product
function updateProduct(id: number, quantity: number) {
    if (Validate.checkQuantity(quantity)) {
        let product: Product = productRepository.getItemById(id);
        cartObj.updateProduct(product, quantity);
        showCart();
        showNofinication(`<div class="alert alert-success" role="alert" id="mnotification">Updated <b>${product.name}</b></div>`);
    } else {
        showNofinication(MNotification.NOTI_GREATER_THAN_ONE);
    }
}

// Delete product
function removeProduct(id: number) {
    let product: Product = productRepository.getItemById(id)
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
        let id: number = $(this).data("product");
        let quantity: number = Number($("input[name='quantity-product-" + id + "']").val());
        addProduct(id, quantity);
        $("input[name='quantity-product-" + id + "']").val(1);
    })

    // Update product
    $(document).on("click", "a#update-cart-item", function () {
        let id: number = $(this).data("product");
        let quantity: number = Number($("input[name='cart-item-quantity-" + id + "']").val());
        updateProduct(id, quantity);
    })

    // Delete product
    $(document).on("click", "a#delete-cart-item", function () {
        let id: number = $(this).data("product");
        removeProduct(id);
    })
})