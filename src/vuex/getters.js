const getters = {
    getCount(state){
        var count = 0;
        state.car.forEach(item => {
            if(item.selected){
                count += item.count
            }
        })
        return count
    },
    getId(state){
        var list = []
        state.car.forEach(item => {
            list.push(item.id)
        })
        return list
    },
    getIdAndCount(state){
        var o = {}
        state.car.forEach(item => {
            o[item.id] = item.count
        })
        return o
    },
    getSum(state){
        var o = {
            count: 0,
            sum: 0
        }
        state.car.forEach(item => {
            if(item.selected){
                o.count += item.count
                o.sum += item.count * item.price
            }
        })
        return o
    },
    getSelect(state){
        var o = {}
        state.car.forEach(item => {
            o[item.id] = item.selected
        })
        return o

    }
}
export default getters