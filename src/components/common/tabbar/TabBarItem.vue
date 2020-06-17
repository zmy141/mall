<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemclick">
      <div v-if='!isactive'><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div :style='colorstyle'><slot name="item-text"></slot></div>
      
      <!--<img src="../../assets/img/tabbar/home.svg" alt="">-->
      <!--<div>首页</div>-->
    </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props:{
      path:String,
      //自己传入想要的字体颜色，默认值为红色
      activecolor:{
        type:String,
        default:'red'
      }
    },
    data(){
      return{
        
      }  
    },
    computed:{
      isactive(){
        return this.$route.path.indexOf(this.path)!==-1
      },
      //自定义激活路由的字体颜色
      colorstyle(){
        return this.isactive?{color:this.activecolor}:{}
      }
    },
    methods:{
      itemclick(){
        //解决连续点击路由报错问题
        this.$route.path!=this.path&&this.$router.replace(this.path)                    
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
