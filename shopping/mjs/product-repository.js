"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("./product");
const helpers_1 = require("./libs/helpers");
class ProductRepository {
    constructor() {
        this.products = [];
        this.addItem(new product_1.Product(100, "bulbasaur", "bulbasaur.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 2));
        this.addItem(new product_1.Product(101, "charmander", "charmander.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 3));
        this.addItem(new product_1.Product(102, "ivysaur", "ivysaur.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 4));
        this.addItem(new product_1.Product(103, "squirtle", "squirtle.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 5, false));
        this.addItem(new product_1.Product(104, "venusaur", "venusaur.png", "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s", 6));
    }
    addItem(product) {
        this.products[this.products.length] = product;
    }
    getItems() {
        return this.products;
    }
    getItemById(id) {
        let total = this.products.length;
        let i = 0;
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
    showItemsInHTML() {
        let total = this.products.length;
        let i = 0;
        let xhtmlResult = '';
        if (total > 0) {
            for (i; i < total; i++) {
                let currentItem = this.products[i];
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
        }
        else {
            xhtmlResult = 'Empty product in my shop';
        }
        return xhtmlResult;
    }
    showBuyItemInHTML(product) {
        let xhtmlResult = '';
        if (product.isBuy == true) {
            xhtmlResult = ` <input name="quantity-product-${product.id}" type="number" value="1" min="1">
            <a data-product="${product.id}" href="#" class="price"> ${helpers_1.Helpers.toCurrency(product.price, "$")}  </a>`;
        }
        else {
            xhtmlResult = `<span class="price"> ${helpers_1.Helpers.toCurrency(product.price, "$")} </span>`;
        }
        return xhtmlResult;
    }
}
exports.ProductRepository = ProductRepository;
