import { CartItem } from "./cart-Item";
import { Product } from "./product";
import { Helpers } from "./libs/helpers";

export class Cart {
    private cartItems: CartItem[] = [];
    private totalQuantity: number = 0;
    private totalPrice: number = 0;

    public addProduct(product: Product, quantity: number = 1): void {

        let position = this.getProductPosition(product);
        if (position > -1) {
            this.cartItems[position].quantity += quantity;
        } else {
            let cartItem = new CartItem(product, quantity);
            this.cartItems[this.cartItems.length] = cartItem;
        }
        this.totalQuantity += quantity;
        this.totalPrice += product.price * quantity;
    }

    private getProductPosition(product: Product): number {
        let total: number = this.cartItems.length;
        let i: number = 0;
        for (i; i < total; i++) {
            if (this.cartItems[i].product.id == product.id) {
                return i;
            }
        }
        return -1;
    }

    public updateProduct(product: Product, quantity: number = 1): void {
        let position = this.getProductPosition(product);
        if (position > -1) {

            this.totalQuantity = this.totalQuantity - this.cartItems[position].quantity + quantity;
            this.totalPrice = this.totalPrice - product.price * (this.cartItems[position].quantity - quantity);
            this.cartItems[position].quantity = quantity;
        }
    }

    public deleteProduct(product: Product): void {
        let position = this.getProductPosition(product);
        if (position > -1) {
            this.totalQuantity = this.totalQuantity - this.cartItems[position].quantity;
            this.totalPrice = this.totalPrice - (this.cartItems[position].quantity * product.price);
            this.cartItems.splice(position, 1);
        }
    }

    public isEmpty(): boolean {
        return (this.cartItems.length === 0);
    }

    public showCartBodyInHTML(): string {
        let xhtmlResult: string = '';
        if (!this.isEmpty()) {
            let total: number = this.cartItems.length;
            let i: number = 0;
            for (i; i < total; i++) {
                let currentProduct: CartItem = this.cartItems[i];
                xhtmlResult += currentProduct.showCartItemInHTML(i);
            }
        }
        return xhtmlResult;
    }

    public showCartFooterInHTML(): string {
        let xhtmlResult: string = '';
        if (!this.isEmpty()) {
            xhtmlResult = `<tr>
            <td colspan="4">There are <b>${this.totalQuantity}</b> items in your shopping cart.</td>
            <td colspan="2" class="total-price text-left"> ${Helpers.toCurrency(this.totalPrice, "USD")}  </td>
        </tr>`;
        } else {
            xhtmlResult = '<tr><th colspan="6">Empty product in your cart<th></tr>';
        }
        return xhtmlResult;
    }
}