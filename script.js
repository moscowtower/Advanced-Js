const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
  ];
  
  const renderGoodsItem = (title, price, img='https://via.placeholder.com/150') => {
    return `<div class="goods-item"><h3>${title}</h3><img src=${img}><p class='price-text'>$${price}</p></div>`;
  };
  
  const renderGoodsList = list => {
    document.querySelector('.goods-list').innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).toString().replace(/,/g, ' ');
  }
  
  renderGoodsList(goods);