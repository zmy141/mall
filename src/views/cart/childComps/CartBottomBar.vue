<template>
  <div class="bottom-bar1">
      <div class="check-content">
            <checkButton class="check-button1" :ischecked= 'isSelectAll' @click.native= 'clickAll'></checkButton>
            <span>全选</span>
      </div> 
      <div class="totalprice">
          合计:{{totalPrice}}
      </div>
      <div class="calculate">
          去计算({{checklength}})
      </div>
  </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton'
export default {
    name:'CartBottomBar',
    components:{
        checkButton
    },
    computed:{
        //toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。
        totalPrice(){
            return '￥'+this.$store.state.cartList.filter(item=>item.checked)
            .reduce((pre,item)=>pre+item.price*item.count,0).toFixed(2)
        },
        checklength(){
            return this.$store.state.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
            if(this.$store.state.cartList.length!== 0){
                return (this.$store.state.cartList.filter(item=>item.checked).length==this.$store.state.cartList.length)
            }else{
                return false
            }   
        }
    },
    methods:{
        clickAll(){
            this.$store.commit('clickAll',this.isSelectAll)
        }
    }
}
</script>

<style>
    .bottom-bar1{
        height: 40px;
        background-color: #eee;
        position: relative;
        line-height: 40px; 
        display: flex;
    }
    .check-content{
        display: flex;
        align-items: center;
        margin-left: 10px;
        width: 40[x];
    }
    .check-button1{
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .totalprice{
        margin-left: 30px;
        flex: 1;
    }
    .calculate{
        width: 90px;
        background-color: var(--color-tint);
        text-align: center;
    }
</style>