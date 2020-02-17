import { Product } from "./product";
import { Helpers } from "./libs/helpers";

export class ProductRepository {
    private products: Product[] = [];

    constructor() {
        this.addItem(new Product(100, "bulbasaur", "bulbasaur.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 2));
        this.addItem(new Product(101, "charmander", "charmander.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 3));
        this.addItem(new Product(102, "ivysaur", "ivysaur.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 4));
        this.addItem(new Product(103, "squirtle", "squirtle.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 5, false));
        this.addItem(new Product(104, "venusaur", "venusaur.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 6));
    }

    public addItem(product: Product) {
        this.products[this.products.length] = product;
    }

    public getItems(): Product[] {
        return this.products;
    }

    public getItemById(id: number): Product {

        let total: number = this.products.length;
        let i: number = 0;
        for (i; i < total; i++) {
            if (id == this.products[i].id) {
                return this.products[i];
            }
        }
        return null;
        // case 2
        // let filter: Product[] = this.products.filter(
        //     product => product.id == id
        // );

        // if (filter.length > 0) return filter[0];
        // return null;
    }

    public showItemsInHTML(): string {
        let total: number = this.products.length;
        let i: number = 0;
        let xhtmlResult: string = '';

        if (total > 0) {
            for (i; i < total; i++) {
                let currentItem: Product = this.products[i];
                xhtmlResult += `<div class="media product">
                                    <div class="media-left">
                                        <a href="#"><img class="media-object" src="img/characters/${currentItem.image}"
                                        alt="${currentItem.name}"></a>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="media-heading">${currentItem.name}</h4>
                                        <p>${currentItem.summary}</p>   
                                       ${this.showBuyItemInHTML(currentItem)}
                                    </div>
                                </div>`;
            }
        } else {
            xhtmlResult = 'Empty product in my shop';
        }
        return xhtmlResult;
    }

    private showBuyItemInHTML(product: Product): string {
        let xhtmlResult: string = '';

        if (product.isBuy == true) {
            xhtmlResult = ` <input name="quantity-product-${product.id}" type="number" value="1" min="1">
            <a data-product="${product.id}" href="#" class="price"> ${Helpers.toCurrency(product.price, "$")}  </a>`;
        } else {
            xhtmlResult = `<span class="price"> ${Helpers.toCurrency(product.price, "$")} </span>`;
        }
        return xhtmlResult;
    }
}