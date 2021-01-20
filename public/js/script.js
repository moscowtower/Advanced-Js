const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        basketURL: '/getBasket.json',
        catalogURL: '/catalogData.json',
        products: [],
        filteredProducts: [],
        basket: [],
        itemIMG: 'https://placehold.it/50x100',
        problem: false,
    },
    methods: {
        getJson(url) {
            return fetch(`${url}`)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                    this.problem = true;
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let id = product.id_product;
                        let getprod = this.basket.find(product => product.id_product === id);
                        if (getprod) {
                            getprod.quantity++;
                        } else {
                            let newProduct = {
                                id_product: id,
                                price: product.price,
                                product_name: product.product_name,
                                quantity: 1,
                                img: product.img
                            };
                            this.basket.push(newProduct)
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        removeProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let id = product.id_product;
                        let getprod = this.basket.find(product => product.id_product === id);
                        if (getprod.quantity > 1) {
                            getprod.quantity--;
                        } else {
                            this.basket.splice(this.basket.indexOf(getprod), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        filterProducts(searchLine) {
            const regexp = new RegExp(searchLine, 'i');
            this.filteredProducts = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(product => {
                const item = document.querySelector(`.product-item[data-id='${product.id_product}']`);
                if (this.filteredProducts.includes(product)) {
                    item.classList.remove('invisible');
                } else {
                    item.classList.add('invisible');
                }
            })
        },
        showBasket() {
            const basket = document.querySelector('.basket-popup');
            basket.classList.toggle('invisible');
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.basket.push(el);
                }
            });
    }
});