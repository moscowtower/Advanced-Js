const basketitem = {
    props: ['product'],
    template: `
    <div class='product-bio' v:if='!product.quantity'>
        <img :src="'img/' + product.img" alt="Some img" style="width: 45px;">
        <li>{{product.product_name}}, ₽{{product.price}}, {{product.quantity}}</li>
            <div class="right-block">
                <button class="del-btn" :data-id='product.id_product' @click="$parent.$emit('remove-product', product)">&times;</button>
            </div>
        <hr>
    </div>
    `
};

const basket = {
    props: ['basket'],
    components: { 'basket-item': basketitem },
    template: `
    <div class='basket-popup invisible'>
        <ul>
            <h3>Корзина</h3>
            <hr>
            <li v-if='!basket.length'>Корзина пуста</li>
            <basket-item v-for='product in basket' 
                :key='product.id_product' 
                :data-id='product.id_product'
                :product='product'>
            </basket-item>
        </ul>
    </div>
    `,
};

export default basket;