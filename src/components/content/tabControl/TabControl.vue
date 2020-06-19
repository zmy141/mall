<template>
    <div class="tab-control">
        <div v-for= '(item,index) in titles' :key= 'index' class='tab-control-item'
        :class= '{active:index===currentindex}' @click='itemclick(index)'>
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
            return []
            }    
        }
    },
    data(){
        return {
            currentindex:0
        }
    },
    methods:{
        itemclick(index){
            this.currentindex=index
            this.$emit('TabClick',index)
        }
    }      
}
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height:40px;
        background-color: #fff;
    }
    .tab-control-item{
        flex: 1;

    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        padding:6px ;
        border-bottom: 2px solid var(--color-tint);
    }
</style>