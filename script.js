class GoodsItem {
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }
  render(img = 'https://via.placeholder.com/150') {
    return `<div class="goods-item"><h3>${this.title}</h3><img src=${img}><p class='price-text'>$${this.price}</p></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50 },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }
  render() {
    let listHTML = '';
    this.goods.forEach(good => {
      const goodItem = new GoodsItem(good.title, good.price);
      listHTML += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = listHTML;
  }
  countTotal() {
    let total = 0;
    this.goods.forEach(good => {
      total += good.price;
    })
    return total;
  }
}

class Basket{
  constructor(){
    this.goods = [];
  }
  add(){
    // увеличение количества товара в корзине будет проходить через проверку наличия
  }
  remove(){
    // тоже сначала проверка наличия, а потом удаление (через splice чтобы не было дыр)
  }
  static info(){
  
  }
  render(){
    let basketHTML = '';
    this.goods.forEach(item =>{
      const basketItem = new BasketItem(item.title, item.price);
      basketHTML += basketItem.render()
    })
    document.querySelector('.basket').innerHTML = basketHTML;
  }
}

class BasketItem extends GoodsItem{
  constructor(amount){
    super(title, price);
    this.amount = amount
  }
  render(){

  }
}

// call me maybe
const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list.countTotal()); // 800
