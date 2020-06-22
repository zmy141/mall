<template>
    <div class="cart">
        <nav-bar class="cart-nav-bar">
            <div slot= 'center'>购物车({{length}})</div>
        </nav-bar>
        <scroll class="cart-content" ref= 'scroll'>
            <cart-list></cart-list>
        </scroll>
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import cartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import Scroll from 'components/common/scroll/Scroll'

// 仅仅将store中的getter映射到局部计算属性
import {mapGetters} from 'vuex'

export default {
    name:'Cart',
    components:{
        NavBar,
        cartList,
        CartBottomBar,
        Scroll
    },
    computed:{
        //两种语法
        // 数组写法 ...mapGetters(['cartlength','cartList'])
        //对象写法 如果想给getter属性另取一个名字
        ...mapGetters({
            length: 'cartlength'
        })

    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
    .cart{
        height: 100vh;
    }
    .cart-nav-bar{
        background-color: var(--color-tint);
        color: #fff;
        
    }
    .cart-content{
        height: calc(100% - 44px - 49px - 40px);
        overflow: hidden;
    }
</style>