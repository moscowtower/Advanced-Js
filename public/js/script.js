import products from './product-comp.js'
import basket from './basket-comp.js'
import problem from './problem-comp.js'
import search from './search-comp.js'

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
        API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
    },
    components: {
        basket,
        problem,
        search,
        products,
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
        postJson(url, data) {
            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        deleteJson(url) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct(item) {
            let getprod = this.basket.find(el => el.id_product === item.id_product);
            if (getprod) {
                this.putJson(`/api/cart/${getprod.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            getprod.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.basket.push(prod)
                        }
                    })
            }
        },
        removeProduct(item) {
            let getprod = this.basket.find(el => el.id_product === item.id_product);
            if (getprod) {
                if (getprod.quantity < 1) {
                    console.log('getprod quantity < 1');
                    this.deleteJson(`/api/cart/${getprod.id_product}`)
                        .then(data => {
                            if (data.result == 1) {
                                console.log('inside');
                                this.basket.splice(this.basket.indexOf(getprod), 1);
                            } else {
                                console.log(data.result)
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        })
                } else {
                    this.putJson(`/api/cart/${getprod.id_product}`, { quantity: -1 })
                        .then(data => {
                            if (data.result == 1) {
                                getprod.quantity--
                            }
                        })
                }
            }
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