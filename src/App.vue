<template>
    <div id="app">
        <!-- 默认路由离开的时候，路由管理的对象会被销毁，再进去会重新加载 -->
      <keep-alive exclude="Detail">
          <router-view></router-view>
      </keep-alive>     
      <main-tabbar></main-tabbar>
    </div> 
</template>

<script>
import MainTabbar from 'components/content/maintabbar/MainTabbar'
export default {
    name:'app',
    components:{
        MainTabbar
    }
}
</script>

<style>
   @import 'assets/css/base.css'; 
</style>
