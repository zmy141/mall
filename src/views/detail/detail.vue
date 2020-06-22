<template>
    <div id='detail'>
        <detail-nav-bar class="detail-nav" @titleitemClick= 'titleitemClick' ref='detailnav'></detail-nav-bar>
        <scroll class="content" 
        ref='scroll' 
        @scroll= 'contentScroll' 
        :probe-type= '3'>
            <!-- 属性尽量用驼峰命名，事件不需要 -->
            <detail-swiper :top-images= 'topimages'></detail-swiper>
            <detail-base-info :goods= 'goods'></detail-base-info>
            <detail-shop-info :shop= 'shop'></detail-shop-info>
            <detail-goods-info :detail-info= 'detailInfo' @imgLoad = 'imgLoad'></detail-goods-info>
            <detail-param-info :paramInfo= 'paraInfo' ref='param'></detail-param-info>
            <detail-comment-info :commentInfo= 'commentInfo' ref= 'comment'></detail-comment-info>
            <goods-list :goods= 'recommends' ref= 'recommend'></goods-list>
        </scroll>
            <detail-bottom-bar @addToCart = 'addToCart'></detail-bottom-bar>
            <back-top class= 'back-top' @click.native= "backclick" v-show= 'isShowBackTop'></back-top>
    </div>
</template>

<script>
import DetailNavBar from './ChildComps/DetailNavBar'
import DetailSwiper from './ChildComps/DetailSwiper'
import DetailBaseInfo from './ChildComps/DetailBaseInfo'
import DetailShopInfo from './ChildComps/DetailShopInfo'
import DetailGoodsInfo from './ChildComps/DetailGoodsInfo'
import DetailParamInfo from './ChildComps/DetailParamInfo'
import DetailCommentInfo from './ChildComps/DetailCommentInfo'
import GoodsList from 'components/content/goods/GoodsList'
import DetailBottomBar from './ChildComps/DetailBottomBar'


import scroll from 'components/common/scroll/Scroll'

import {getdetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail'
import {itemListenerMixin,backTopMixin} from 'common/mixin/mixin'
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
       DetailCommentInfo,
       GoodsList,
       DetailBottomBar,
       scroll,
       
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return {
            iid:null,
            topimages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paraInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopsY:[],
            getThemeTopsY:null,
            currentindex1:0,
            
        }
    },
    created(){   
        //保存传入的iid
        this.iid = this.$route.params.iid
        //根据iid请求详情数据
        getdetail(this.iid).then(res=>{
            
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

            //取出评论信息
            if(data.rate.list !== undefined){
                this.commentInfo = data.rate.list[0]
            }
            /*
            //数据请求好了，但this.$refs.param.$el压根没有渲染
            this.themeTopsY=[]
            this.themeTopsY.push(0)
            this.themeTopsY.push(this.$refs.param.$el.offsetTop)
            this.themeTopsY.push(this.$refs.comment.$el.offsetTop)
            this.themeTopsY.push(this.$refs.recommend.$el.offsetTop)
            //等请求的数据都渲染好会回调nextTick函数
            //根据最新的数据，对应的DOM是已经被渲染出来，但是图片依然是没有加载完
            //offsetTop值不对的时候，都是因为图片的问题
            this.$nextTick(()=>{
            this.themeTopsY=[]
            this.themeTopsY.push(0)
            this.themeTopsY.push(this.$refs.param.$el.offsetTop)
            this.themeTopsY.push(this.$refs.comment.$el.offsetTop)
            this.themeTopsY.push(this.$refs.recommend.$el.offsetTop)
            console.log(this.themeTopsY)
        })
        */
        })
        getRecommend().then(res=>{
            // console.log(res)
            this.recommends = res.data.list
        })
        //对给this.themeTopsY赋值的操作进行防抖
        this.getThemeTopsY = debounce(()=>{
            this.themeTopsY=[]
            this.themeTopsY.push(0)
            this.themeTopsY.push(this.$refs.param.$el.offsetTop-44)
            this.themeTopsY.push(this.$refs.comment.$el.offsetTop-44)
            this.themeTopsY.push(this.$refs.recommend.$el.offsetTop-44)
            // console.log(this.themeTopsY)
        },100)
    },
    //不在keep-alive里面的组件无法监听到deactivated
    destroyed(){
        this.$bus.$off('itemImgload',this.itemImgListener)
    },
    methods:{
        imgLoad(){
            //直接写相当于重新赋值refresh，每次调用的不是同一个refresh
            //const refresh = debounce(this.$refs.scroll.refresh,200)
            // this.$bus.$on('itemImgload',()=>{refresh()})
            this.refresh()

            this.getThemeTopsY()
        },
        titleitemClick(index){
            //offsetTop相对于定位父元素detail计算，但是nav-bar不在scroll里，调用scrollTo方法时会有44px误差
            this.$refs.scroll.scrollTo(0,-this.themeTopsY[index],100)
        },
        contentScroll(position){
            const positionY = -position.y
            const length = this.themeTopsY.length
            for(var i = 0;i<this.themeTopsY.length;i++){
                if(this.currentindex1!==i && ((i<length-1&&positionY >= this.themeTopsY[i] && positionY < this.themeTopsY[i+1])
                ||(i==length-1 && positionY >= this.themeTopsY[i]))){
                    this.currentindex1 = i
                    this.$refs.detailnav.currentindex = this.currentindex1
                    // console.log(this.currentindex1)
                }
            }

            //判断backtop是否显示
            this.isShowBackTop = -position.y > 1000

        },
        addToCart(){
            //获取购物车需要展示的信息
            const product = {}
            product.image =  this.topimages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.nowPrice;
            product.iid = this.iid;

            //将商品添加到购物车里,使用vuex保存
            // this.$store.commit('addCart',product)
            this.$store.dispatch('addCart',product)
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
    .content{
      height: calc(100% - 102px);
      overflow: hidden;  
    }
</style>