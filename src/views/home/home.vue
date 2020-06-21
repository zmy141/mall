<template>
  <div id="home">
    <nav-bar class='home-nav'>     
      <div slot='center'>购物街</div>
    </nav-bar>

    <tab-control 
      :titles= "['流行','新款','精选']" 
      class='tab-contro2' 
      @TabClick= 'tabclick'
      ref= 'tabcontrol2'
      v-show = isTabFixed> 
    </tab-control>

    <scroll class="content" 
      ref="scroll" 
      :probe-type= '3' 
      @scroll= 'contentscroll' 
      :pullUpLoad= 'true'
      @pullingup= 'LoadMore'>
      <home-swiper :banners= 'banners' @swiperImageLoad= 'swiperImageLoad'></home-swiper>
      <recommmend-view :recommends= ' recommends'></recommmend-view>
      <feature-vue></feature-vue>
      <tab-control 
      :titles= "['流行','新款','精选']" 
      class='tab-control' 
      @TabClick= 'tabclick'
      ref= 'tabcontrol1'> 
      </tab-control>
      <goods-list :goods= "showGoods"></goods-list>
    </scroll>
    <!-- 组件事件的监听要用.native -->
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
import {debounce} from 'common/utils/utils'


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
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      }
    },
    created(){
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new') 
      this.getHomeGoods('sell')           
    },
    mounted(){
      //监听item中图片加载完成
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$bus.$on('itemImgload',()=>{
        refresh()
      })
      
    },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)    
    },
    deactivated(){
      this.saveY=this.$refs.scroll.scroll.y
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
        this.$refs.tabcontrol1.currentindex = index
        this.$refs.tabcontrol2.currentindex = index
        },
        backclick(){
          //500ms之内回到顶部
          //避免调用scrollto方法时scroll还没有创建出来
          this.$refs.scroll.scrollTo(0,0,500)
        },
        contentscroll(position){
          //判断backtop是否显示
          this.isShowBackTop = -position.y > 1000
          //决定tabcontrol是否吸顶
          this.isTabFixed = -position.y >= this.tabOffsetTop
        },
        LoadMore(){
          this.getHomeGoods(this.currentType)
        },
        swiperImageLoad(){
          //this.$refs.tabcontrol拿到的只是组件，this.$refs.tabcontrol.$el拿到的是dom元素
          this.tabOffsetTop = this.$refs.tabcontrol1.$el.offsetTop
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
            //scroll只能默认加载一次，因此完成加载更多之后调用finishPullUp
            this.$refs.scroll.finishPullUp()
      })
     }
    }
}
</script>

<style scoped>
/* scoped作用域，只作用在当前页面 */
    #home{
      height: 100vh;
      position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
      /* 不用原生滚动条就不用设置定位 */
        /* position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 2; */
    }
    /* 使用better-scroll后设置的定位就不起作用了 */
    /* .tab-control{
      position: sticky;
      top: 43px;
      z-index: 10;
    } */
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
    .tab-contro2{
      position: relative;
      z-index: 10;
    }
    
</style>