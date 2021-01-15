Vue.component('basket', {
    props: ['basket'],
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
});

Vue.component('basket-item', {
    props: ['product'],
    template: `
    <div class='product-bio'>
        <img src="https://placehold.it/50x50">
        <li>{{product.product_name}}, ₽{{product.price}}, {{product.quantity}}</li>
            <div class="right-block">
                <button class="del-btn" :data-id='product.id_product' @click="$parent.$emit('remove-product', product)">&times;</button>
            </div>
        <hr>
    </div>
    `
})