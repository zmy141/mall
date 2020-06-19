<template>
  <div id="home">
    <nav-bar class='home-nav'>     
      <div slot='center'>购物街</div>
    </nav-bar>
    <scroll class="content" 
      ref="scroll" 
      :probe-type= '3' 
      @scroll= 'contentscroll' 
      :pullUpLoad= 'true'
      @pullingup= 'LoadMore'>
      <home-swiper :banners= 'banners'></home-swiper>
      <recommmend-view :recommends= ' recommends'></recommmend-view>
      <feature-vue></feature-vue>
      <tab-control :titles= "['流行','新款','精选']" class='tab-control' @TabClick= 'tabclick'></tab-control>
      <goods-list :goods= "showGoods"></goods-list>
    </scroll>
    <back-top class= 'back-top' @click.native= "backclick" v-show= 'isShowBackTop'></back-top>
    
  </div>

</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommmendView from './childComps/RecommmendView'
import FeatureVue from './childComps/FeatureVue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'


export default {
    name:'Home',
    components:{
      HomeSwiper,
      RecommmendView,
      FeatureVue,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new') 
      this.getHomeGoods('sell')      
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods:{
      //事件监听相关方法
        tabclick(index){
          switch(index){
            case 0:
              this.currentType = 'pop'
              break;
            case 1:
              this.currentType = 'new'
              break;
            case 2:
              this.currentType = 'sell'
              break;
          }
        },
        backclick(){
          //500ms之内回到顶部
          this.$refs.scroll.scroll.scrollTo(0,0,500)
        },
        contentscroll(position){
          this.isShowBackTop = -position.y>1000
        },
        LoadMore(){
          this.getHomeGoods(this.currentType)
        },
      //网络请求相关方法
        getHomeMultidata(){
          getHomeMultidata().then(res=>{
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
        getHomeGoods(type){
          const page = this.goods[type].page + 1
          getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list) 
            this.goods[type].page+=1

            this.$refs.scroll.scroll.finishPullUp()
      })
     }
    }
}
</script>

<style scoped>
/* scoped作用域，只作用在当前页面 */
    #home{
      padding-top: 44px;
      height: 100vh;
      position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;

        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 2;
    }
    .tab-control{
      position: sticky;
      top: 43px;
      z-index: 10;
    }
    /* .content{
      height: calc(100% - 93px);
      overflow: hidden;
      margin-top: 44px;
    } */
    .content{
      overflow: hidden;
      position: absolute;
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
    }
    .back-top{
      z-index: 2;
    }
</style>