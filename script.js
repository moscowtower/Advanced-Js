const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
    constructor(url, container, list = list2) {
        this.container = container;
        this.list = list;
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this._init();
    }
    getJson(url) {
        return fetch(`${API + url}`)
            .then(result => result.json())

    }
    handleData(data) {
        this.goods = [...data];
        this.render();
    }
    countTotal() {
        let total = this.goods.reduce((sum, next) => sum + next.price, 0);
        return total;
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new this.list[this.constructor.name](product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    _init() {
        return false
    }
}

class ProductsList extends List {
    constructor(cart, container = '.products', url = '/catalogData.json') {
        super(url, container);
        this.cart = cart;
        this.getJson(url)
            .then(data => {
                this.handleData(data.contents)
            })
            .catch(error => { console.log(error); })
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                console.log(e.target)
                this.cart.add(e.target);
            }
        })
    }
}

class Item {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`
    }
}

class ProductItem extends Item {}

class Basket extends List {
    constructor(container = '.basket-popup', url = '/getBasket.json') {
        super(url, container)
        this.getJson(this.url)
            .then(data => {
                this.handleData(data.contents)
            })
            .catch(error => {
                console.log(error);
            });
    }
    add(element) {
        this.getJson(`/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let id = +element.dataset.id;
                    let getprod = this.goods.find(product => product.id_product === id);
                    if (getprod) {
                        getprod.quantity++;
                        this._updateCart(getprod);
                        console.log(1);
                    } else {
                        let product = {
                            id_product: id,
                            price: +element.dataset.price,
                            product_name: element.dataset.name,
                            quantity: 1
                        };
                        this.goods.push(product);
                        this.render();
                        console.log(2);
                    }
                } else {
                    alert('Error');
                }
            })
    }
    remove(element) {
        this.getJson(`/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let id = +element.dataset.id;
                    let getprod = this.goods.find(product => product.id_product === id);
                    if (getprod.quantity > 1) {
                        getprod.quantity--;
                        this._updateCart(getprod);
                    } else {
                        this.goods.splice(this.goods.indexOf(getprod), 1);
                        document.querySelector(`.cart-item[data-id='${id}']`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        if (block) {
            block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
            block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
        } else {
            this.add(product);
        }

    }

    _init() {
        document.querySelector('.cart-button').addEventListener('click', () => {
            document.querySelector('.basket-popup').classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.remove(e.target);
            }
        });
        let popUp = document.querySelector('.basket-popup');
        popUp.innerHTML = "";
        let headline = document.createElement('h3');
        headline.textContent = 'Состав корзины';
        popUp.appendChild(headline);
    }
}

class BasketItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
        <div class="product-bio">
        <img src="${this.img}" alt="Some image">
        <div class="product-desc">
        <p class="product-title">${this.product_name}</p>
        <p class="product-quantity">Quantity: ${this.quantity}</p>
    <p class="product-single-price">$${this.price} each</p>
    </div>
    </div>
    <div class="right-block">
        <p class="product-price">$${this.quantity*this.price}</p>
        <button class="del-btn" data-id="${this.id_product}">&times;</button>
    </div>
    </div>`
    }
}

// call me maybe
const list2 = {
    ProductsList: ProductItem,
    Basket: BasketItem
};

let basket = new Basket();
let list = new ProductsList(basket);
list.getJson(list.url).then(data => list.handleData(data))


/*
ES5 way of getting server response asynchronously

let xhr = new XMLHttpRequest();
xhr.open('GET', 'tel.json', true);
console.log(xhr.readyState);

xhr.onreadystatechange = () => {
    if (xhr.readyState != 4) {
        return 'Error';
    }
    if (xhr.status != 200) {
        return 'Error status not 200'
    } else {
        let data = JSON.parse(xhr.responseText);
        document.querySelector('div').insertAdjacentHTML('beforeend', `<p>${data.name} - ${data.telephone}</p>`)
    }
}
xhr.send();
*/

/*
ES6 way of fetching
fetch('tel.json')
    .then(text => text.json())
    .then(data => {
        document.querySelector('div').insertAdjacentHTML('beforeend', `<p>${data.name} - ${data.telephone}</p>`)
    })
*/