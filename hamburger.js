class Hamburger {
    constructor(size, stuffing, ...toppings) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = toppings;
    }
    addTopping(topping){
        this.toppings.push(topping);
    }
    removeTopping(topping){
        this.toppings.splice(this.toppings.indexOf(topping), 1);
    }
    getToppings(){
    	let toppings = ''
        this.toppings.forEach(topping => 
        toppings+= topping.name + ', ')
        return toppings.replace(/, $/,"");
    }
    getSize(){
        return this.size.name;
    }
    getStuffing(){
        return this.stuffing.name;
    }
    calculatePrice(){
        let result = 0;
        this.toppings.forEach(topping =>
            result += topping.price)
        result += this.stuffing.price + this.size.price;
        return '\u20bd' + result;
    }
    calculateCalories(){
        let result = 0;
        this.toppings.forEach(topping =>
            result += topping.ccal)
        result += this.stuffing.ccal + this.size.ccal;
        return result + 'ккал';
    }
    info() {
        let infoText = `Размер: ${this.getSize()} \nНачинка: ${this.getStuffing()} \nДобавки: ${this.getToppings()} \nСтоимость: ${this.calculatePrice()} \nКалорийность: ${this.calculateCalories()}`
        alert(infoText);
    }
}

class BurgerElement {
    constructor(name, price, ccal){
        this.name = name;
        this.price = price;
        this.ccal = ccal;
    }
}

const smallSize = new BurgerElement('Большой', 50, 20);
const bigSize = new BurgerElement('Маленький', 100, 40);
const cheese = new BurgerElement('Сыр', 10, 20);
const salad = new BurgerElement('Салат', 20, 5);
const potato = new BurgerElement('Картофель', 15, 10);
const seasoning = new BurgerElement('Приправа', 15, 0);
const mayo = new BurgerElement('Майонез', 15, 10);

const burger = new Hamburger(smallSize, cheese, seasoning, mayo);
burger.info();