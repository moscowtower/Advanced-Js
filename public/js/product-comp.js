const productitem = {
    props: ['product'],
    template: `
    <div class="product-item">
                    <img :src="'img/' + product.img" alt="Some img" class='product-img'>
                    <div class="desc">
                        <h3>{{product.product_name}}</h3>
                        <p>{{product.price}} $</p>
                        <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                    </div>
                </div>
    `
};

const products = {
    props: ['products'],
    components: { 'product-item': productitem },
    template: `
    <div>
        <product-item class="product-item" v-for="product of products" :key="product.id_product"
        :data-id="product.id_product" :product="product"></product-item>
    </div>
    `
};


export default products;