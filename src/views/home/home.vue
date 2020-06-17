<template>
  <div id="home">
    <nav-bar class='home-nav'>     
      <div slot='center'>购物街</div>
    </nav-bar>
    <home-swiper :banners= 'banners'></home-swiper>
    <recommmend-view :recommends= ' recommends'></recommmend-view>
    <feature-vue></feature-vue>
    <tab-control :titles= "['流行','新款','精选']" class='tab-control'></tab-control>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>

</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommmendView from './childComps/RecommmendView'
import FeatureVue from './childComps/FeatureVue'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata} from 'network/home'


export default {
    name:'Home',
    components:{
      HomeSwiper,
      RecommmendView,
      FeatureVue,

      NavBar,
      TabControl
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'news':{page:0,list:[]},
          'sell':{page:0,list:[]},
        }
      }
    },
    created(){
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    }
}
</script>

<style>
    #home{
      padding-top: 44px;
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
      top: 44px;
    }
</style>