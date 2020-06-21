<template>
    <div>
        <nav-bar>
            <div slot="left" class= 'back' @click= 'backClick'>
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot = 'center' class='title'>
                <div v-for= '(item,index) in titles' 
                :key = 'index' 
                class="title-item" 
                @click= "titleitemClick(index)"
                :class= '{isactive:currentindex===index}'>
                    {{item}}
                </div>
            </div> 
        </nav-bar>
    </div>         
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name:'DetailNavBar',
    components:{
        NavBar
    },
    data(){
        return {
            titles:['商品','参数','评论','推荐'],
            currentindex:0
        }
    },
    methods:{
        titleitemClick(index){
            this.currentindex=index
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style>
    .title{
        display: flex;
        font-size: 13px;
    }
    .title-item{
        flex: 1;
    }
    .isactive{
        color: var(--color-high-text)
    }
    .back img{
        margin-top: 12px;
    }
</style>