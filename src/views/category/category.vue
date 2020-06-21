<template>
      <div class='wrapper'>
          <ul class="content">
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
              <li>111</li>
          </ul>    
      </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:'Category',
    data(){
        return{
            scroll:null
        }
    },
    mounted(){
        this.scroll=new BScroll(document.querySelector('.wrapper'),{
            probeType: 3,
            pullUpLoad: true
        })
        this.scroll.on('scroll', (position) => {
            // console.log(position)
        })
        this.scroll.on('pullingUp', () => {
            console.log('position')
            this.scroll.finishPullUp()
        })
    }
}
</script>
    
<style>
    /* .wrapper{
        height: 100px;
        background-color: brown;
        overflow: hidden;
    } */
</style>