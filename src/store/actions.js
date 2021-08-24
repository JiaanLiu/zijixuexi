import { ADD_COUNTER, ADD_TO_CART } from "./mutation-types"

export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            //find 返回数组里第一个满足 条件的数值
            let oldProduce = context.state.cartList.find(item => item.iid === payload.iid)

            if (oldProduce) {
                context.commit(ADD_COUNTER, oldProduce);
                resolve('该商品数量+1')
            } else {
                payload.count = 1;
                // state.cartList.push(payload)
                context.commit(ADD_TO_CART, payload);
                resolve('添加商品成功')
            }
        })
    }
}