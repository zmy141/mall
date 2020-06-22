import {debounce} from 'common/utils/utils'
import BackTop from 'components/content/backTop/BackTop'

//组件共享代码
export const itemListenerMixin = {
    data(){
        return {
            itemImgListener:null,
            refresh:null
        }
    },
    mounted(){
       this.refresh = debounce(this.$refs.scroll.refresh,200)
       this.itemImgListener = () =>{
       this.refresh()
      }
      this.$bus.$on('itemImgload',this.itemImgListener)
    }
}

//生命周期里的函数可以抽取一部分放到mixin里，但methods里面不能只抽取某个函数的一部分
export const backTopMixin = {
    data(){
        return {
            isShowBackTop:false
        }
    },
    components:{
        BackTop
    },
    methods:{
        backclick(){
            //500ms之内回到顶部
            //避免调用scrollto方法时scroll还没有创建出来
            this.$refs.scroll.scrollTo(0,0,500)
          },
    }
}