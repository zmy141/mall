export default {
    addCart(context,payload){
      //find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
      // find() 方法为数组中的每个元素都调用一次函数执行：
      // 当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
      // 如果没有符合条件的元素返回 undefined
      // 注意: find() 对于空数组，函数是不会执行的。
      // 注意: find() 并没有改变数组的原始值。

      //通过promise告诉外面添加成功
      return new Promise((resolve,reject)=>{
          //查找当前数组中是否有该商品
          let oldproduct = context.state.cartList.find(item=>item.iid===payload.iid)
          if(oldproduct){
            context.commit('addCounter',oldproduct)
            resolve('当前商品数量+1')
          }else{
            payload.count = 1
            context.commit('addCartTo',payload)
            resolve('添加新的商品')
          }
        }
      )  
    }
  }