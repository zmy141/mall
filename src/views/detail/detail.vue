<template>
    <div id='detail'>
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref='scroll'>
            <detail-swiper :top-images= 'topimages'></detail-swiper>
            <detail-base-info :goods= 'goods'></detail-base-info>
            <detail-shop-info :shop= 'shop'></detail-shop-info>
            <detail-goods-info :detail-info= 'detailInfo' @imgLoad = 'imgLoad'></detail-goods-info>
            <detail-param-info :paramInfo= 'paraInfo'></detail-param-info>
        </scroll>
    </div>
</template>

<script>
import DetailNavBar from './ChildComps/DetailNavBar'
import DetailSwiper from './ChildComps/DetailSwiper'
import DetailBaseInfo from './ChildComps/DetailBaseInfo'
import DetailShopInfo from './ChildComps/DetailShopInfo'
import DetailGoodsInfo from './ChildComps/DetailGoodsInfo'
import DetailParamInfo from './ChildComps/DetailParamInfo'

import scroll from 'components/common/scroll/Scroll'

import {getdetail,Goods,Shop,GoodsParam} from 'network/detail'
import {debounce} from 'common/utils/utils'

export default {
    //组件要加name不然exculde不起作用
    name:'Detail',
    components:{
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       DetailGoodsInfo,
       DetailParamInfo,
       scroll
    },
    data(){
        return {
            iid:null,
            topimages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paraInfo:{}
        }
    },
    created(){   
        //保存传入的iid
        this.iid = this.$route.params.iid
        //根据iid请求详情数据
        getdetail(this.iid).then(res=>{
            console.log(res)
            const data= res.result

            //获取顶部的图片轮播数据
            this.topimages = data.itemInfo.topImages
            // this.topimages.push(...res.result.itemInfo.topImages)

            //获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

            //创建店铺信息的对象
            this.shop = new Shop(data.shopInfo)

            //获取商品详细信息
            this.detailInfo = data.detailInfo

            //获取参数信息
            this.paraInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        })
        
    },
    methods:{
        imgLoad(){
            debounce(this.$refs.scroll.refresh,200)()
            
            // this.$refs.scroll.refresh()
        }
    }
}
</script>

<style scoped>
    #detail{
        position: relative;
        height: 100vh;
        z-index: 9;
        background-color: #fff;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
      height: calc(100% - 44px);
      overflow: hidden;  
    }
</style>