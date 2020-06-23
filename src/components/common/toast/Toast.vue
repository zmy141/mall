<template>
  <div class="toast" v-show= 'isshow'>
      <div >{{message}}</div>
  </div>
</template>

<script>
export default {
    name:'Toast',
    props:{
        // message:{
        //     type:String,
        //     default:''
        // },
        // show:{
        //     type:Boolean,
        //     default:false
        // }
    },
    data(){
        return{
            message:'',
            isshow:false
        }
    },
    methods:{
        show(message,duration=1000){
           this.message = message
           this.isshow = true
           setTimeout(()=>{
               this.isshow = false
               this.message = ''
           },duration)
        }
    }
}
</script>

<style>
    .toast{
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        color: #fff;
        padding: 8px 10px;
        background-color: rgb(0,0,0,.8);
        z-index: 999;
    }
</style>