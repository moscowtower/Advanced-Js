const search = {
    data() {
        return {
            searchLine: ''
        }
    },
    template: `
    <form action='#' class="goods-search" @submit.prevent='$parent.filterProducts(searchLine)'>
        <input type="text" v-model='searchLine'/>
        <button class="search-button" type='submit'><slot></slot></button>
    </form>
    `
};

export default search;