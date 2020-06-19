<template>
  <div class="wrapper" ref='wrapper'>
      <div class='content'>
          <slot></slot>
      </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    name:'Scroll',
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        //若多个地方都有wrapper属性，不知道拿的是哪一个，不建议用document.querySelector，用ref
        this.scroll = new Bscroll(this.$refs.wrapper,{
            //无论是否设置click，button都可以点击
            //必须设置clicl:true,div才能监听点击
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })

        //监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })

        //监听上拉事件
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingup')
        })
    }
}
</script>

<style>

</style>