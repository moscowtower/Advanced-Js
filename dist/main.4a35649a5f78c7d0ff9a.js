/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/basket-comp.js":
/*!***************************!*\
  !*** ./js/basket-comp.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst basketitem = {\n    props: ['product'],\n    template: `\n    <div class='product-bio' v:if='!product.quantity'>\n        <img :src=\"'img/' + product.img\" alt=\"Some img\" style=\"width: 45px;\">\n        <li>{{product.product_name}}, ₽{{product.price}}, {{product.quantity}}</li>\n            <div class=\"right-block\">\n                <button class=\"del-btn\" :data-id='product.id_product' @click=\"$parent.$emit('remove-product', product)\">&times;</button>\n            </div>\n        <hr>\n    </div>\n    `\n};\n\nconst basket = {\n    props: ['basket'],\n    components: { 'basket-item': basketitem },\n    template: `\n    <div class='basket-popup invisible'>\n        <ul>\n            <h3>Корзина</h3>\n            <hr>\n            <li v-if='!basket.length'>Корзина пуста</li>\n            <basket-item v-for='product in basket' \n                :key='product.id_product' \n                :data-id='product.id_product'\n                :product='product'>\n            </basket-item>\n        </ul>\n    </div>\n    `,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (basket);\n\n//# sourceURL=webpack:///./js/basket-comp.js?");

/***/ }),

/***/ "./js/problem-comp.js":
/*!****************************!*\
  !*** ./js/problem-comp.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst problem = {\n    data() {\n        return {\n            errorMsg: 'Проблема подключения к серверу'\n        }\n    },\n    template: `<span>HOUSTON, WE HAVE A *CONNECTION* PROBLEM</span>`,\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (problem);\n\n//# sourceURL=webpack:///./js/problem-comp.js?");

/***/ }),

/***/ "./js/product-comp.js":
/*!****************************!*\
  !*** ./js/product-comp.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst productitem = {\n    props: ['product'],\n    template: `\n    <div class=\"product-item\">\n                    <img :src=\"'img/' + product.img\" alt=\"Some img\" class='product-img'>\n                    <div class=\"desc\">\n                        <h3>{{product.product_name}}</h3>\n                        <p>{{product.price}} $</p>\n                        <button class=\"buy-btn\" @click=\"$parent.$emit('add-product', product)\">Купить</button>\n                    </div>\n                </div>\n    `\n};\n\nconst products = {\n    props: ['products'],\n    components: { 'product-item': productitem },\n    template: `\n    <div>\n        <product-item class=\"product-item\" v-for=\"product of products\" :key=\"product.id_product\"\n        :data-id=\"product.id_product\" :product=\"product\"></product-item>\n    </div>\n    `\n};\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (products);\n\n//# sourceURL=webpack:///./js/product-comp.js?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _product_comp_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product-comp.js */ \"./js/product-comp.js\");\n/* harmony import */ var _basket_comp_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basket-comp.js */ \"./js/basket-comp.js\");\n/* harmony import */ var _problem_comp_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./problem-comp.js */ \"./js/problem-comp.js\");\n/* harmony import */ var _search_comp_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search-comp.js */ \"./js/search-comp.js\");\n\n\n\n\n\nconst app = new Vue({\n    el: '#app',\n    data: {\n        basketURL: '/getBasket.json',\n        catalogURL: '/catalogData.json',\n        products: [],\n        filteredProducts: [],\n        basket: [],\n        itemIMG: 'https://placehold.it/50x100',\n        problem: false,\n        API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',\n    },\n    components: {\n        basket: _basket_comp_js__WEBPACK_IMPORTED_MODULE_1__.default,\n        problem: _problem_comp_js__WEBPACK_IMPORTED_MODULE_2__.default,\n        search: _search_comp_js__WEBPACK_IMPORTED_MODULE_3__.default,\n        products: _product_comp_js__WEBPACK_IMPORTED_MODULE_0__.default,\n    },\n    methods: {\n        getJson(url) {\n            return fetch(`${url}`)\n                .then(result => result.json())\n                .catch(error => {\n                    console.log(error)\n                    this.problem = true;\n                })\n        },\n        postJson(url, data) {\n            return fetch(url, {\n                    method: 'POST',\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    },\n                    body: JSON.stringify(data)\n                })\n                .then(result => result.json())\n                .catch(error => {\n                    console.log(error)\n                })\n        },\n        putJson(url, data) {\n            return fetch(url, {\n                    method: 'PUT',\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    },\n                    body: JSON.stringify(data)\n                })\n                .then(result => result.json())\n                .catch(error => {\n                    console.log(error)\n                })\n        },\n        deleteJson(url) {\n            return fetch(url, {\n                    method: 'DELETE',\n                    headers: {\n                        \"Content-Type\": \"application/json\"\n                    },\n                })\n                .then(response => response.json())\n                .then(data => console.log(data))\n                .catch(error => {\n                    console.log(error)\n                })\n        },\n        addProduct(item) {\n            let getprod = this.basket.find(el => el.id_product === item.id_product);\n            if (getprod) {\n                this.putJson(`/api/cart/${getprod.id_product}`, { quantity: 1 })\n                    .then(data => {\n                        if (data.result === 1) {\n                            getprod.quantity++\n                        }\n                    })\n            } else {\n                const prod = Object.assign({ quantity: 1 }, item);\n                this.postJson(`/api/cart`, prod)\n                    .then(data => {\n                        if (data.result === 1) {\n                            this.basket.push(prod)\n                        }\n                    })\n            }\n        },\n        removeProduct(item) {\n            let getprod = this.basket.find(el => el.id_product === item.id_product);\n            if (getprod) {\n                if (getprod.quantity < 1) {\n                    console.log('getprod quantity < 1');\n                    this.deleteJson(`/api/cart/${getprod.id_product}`)\n                        .then(data => {\n                            if (data.result == 1) {\n                                console.log('inside');\n                                this.basket.splice(this.basket.indexOf(getprod), 1);\n                            } else {\n                                console.log(data.result)\n                            }\n                        })\n                        .catch(error => {\n                            console.log(error);\n                        })\n                } else {\n                    this.putJson(`/api/cart/${getprod.id_product}`, { quantity: -1 })\n                        .then(data => {\n                            if (data.result == 1) {\n                                getprod.quantity--\n                            }\n                        })\n                }\n            }\n        },\n        filterProducts(searchLine) {\n            const regexp = new RegExp(searchLine, 'i');\n            this.filteredProducts = this.products.filter(product => regexp.test(product.product_name));\n            this.products.forEach(product => {\n                const item = document.querySelector(`.product-item[data-id='${product.id_product}']`);\n                if (this.filteredProducts.includes(product)) {\n                    item.classList.remove('invisible');\n                } else {\n                    item.classList.add('invisible');\n                }\n            })\n        },\n        showBasket() {\n            const basket = document.querySelector('.basket-popup');\n            basket.classList.toggle('invisible');\n        }\n    },\n    mounted() {\n        this.getJson(`/api/products`)\n            .then(data => {\n                for (let el of data) {\n                    this.products.push(el);\n                }\n            });\n\n        this.getJson(`/api/cart`)\n            .then(data => {\n                for (let el of data.contents) {\n                    this.basket.push(el);\n                }\n            });\n    }\n});\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ }),

/***/ "./js/search-comp.js":
/*!***************************!*\
  !*** ./js/search-comp.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nconst search = {\n    data() {\n        return {\n            searchLine: ''\n        }\n    },\n    template: `\n    <form action='#' class=\"goods-search\" @submit.prevent='$parent.filterProducts(searchLine)'>\n        <input type=\"text\" v-model='searchLine'/>\n        <button class=\"search-button\" type='submit'><slot></slot></button>\n    </form>\n    `\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);\n\n//# sourceURL=webpack:///./js/search-comp.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;