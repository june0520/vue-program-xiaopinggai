const mutations = {
    addToCar(state,goodsinfo){
        //判断购物车之前是否有相同的商品，有的话直接数量相加
        var flag = false
        state.car.some(item => {
            if(item.id === goodsinfo.id){
                item.count += goodsinfo.count
                flag = true
                return true
            }
        })
        if(!flag){
            state.car.push(goodsinfo)
        }
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateCount(state,obj){
        state.car.some(item => {
            if(item.id === obj.id){
                item.count = parseInt(obj.count)
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    delGoods(state,id){
        state.car.some((item,i) => {
            if(item.id === id){
                state.car.splice(i,1)
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    },
    updateSelect(state,obj){
        state.car.some(item => {
            if(item.id === obj.id){
                item.selected = obj.val
            }
        })
        localStorage.setItem('car',JSON.stringify(state.car))
    }
}
export default mutations