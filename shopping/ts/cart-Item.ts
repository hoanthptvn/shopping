import { Product } from "./product";
import { Helpers } from "./libs/helpers";

export class CartItem {
    private _product: Product;
    private _quantity: number;

    constructor(product: Product, quantity: number = 1) {
        this._product = product;
        this._quantity = quantity;
    }

    public get product(): Product {
        return this._product;
    }

    public set product(v: Product) {
        this._product = v;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(v: number) {
        this._quantity = v;
    }

    public showCartItemInHTML(index: number): string {
        return `<tr>
                <th scope="row">${index + 1}</th>
                <td>${this.product.name}</td>
                <td> ${Helpers.toCurrency(this.product.price, "$")} </td>
                <td><input name="cart-item-quantity-${this.product.id}" type="number" value="${this.quantity}" min="1"></td>
                <td > <strong>${Helpers.toCurrency(this.getSubtotal(), "USD")} </strong></td>
                <td><a id="update-cart-item" href = "#" class="label label-info"
        data-product="${this.product.id}"> Update </a>
                <a id = "delete-cart-item" href = "#" class="label label-danger"
        data-product="${this.product.id}" > Delete </a>
                </td>
                 </tr>`;
    }
    public getSubtotal(): number {
        return this.product.price * this.quantity;
    }
}