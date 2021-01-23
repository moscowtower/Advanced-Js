let add = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (!find) {
        cart.contents.push(req.body);
        return JSON.stringify(cart, null, 4);
    } else {
        change(car, req);
    }
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
};