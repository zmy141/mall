export default {
    addCounter(state,payload){
      payload.count++
    },
    addCartTo(state,payload){
        payload.checked = true
      state.cartList.push(payload)
    },
    checkClick(state,payload){
      payload.checked = !payload.checked
    },
    clickAll(state,payload){
      if(payload){
        state.cartList.forEach(element => {
          element.checked = false
        })
      }else{
        state.cartList.forEach(element => {
          element.checked = true
        })
      }
    }
  }