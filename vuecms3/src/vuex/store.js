/**
 * Created by ivanyb on 2016/12/29.
 */
//引入相关文件
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let key  = 'shopcardata';
//localStorage来存储购物车数据
let locstorage = window.localStorage;

//定义初始化变量
const state = {
    /*
    * 用来存储商品信息对象
    * {
    * goodsid:, //商品id
    * count:  //商品数量
    * }
    * 注意点：如果将shopCardatas定义为对象，通过shopCardatas[goodsid] = count来赋值是不能自动触发
    * app.vue中的计算属性计算的，必须为数组，并且调用push方法，vue才会检测到数据的变化
    * */
    shopCardatas:[]
}
// Vue.set(state,'shopCardatas',{});

//定义动作(将新数据添加到shopCardatas中，如果goodsid对应的值已经存在key,则更新)
const mutations = {//模仿ajax获取新数据后 动态更新data

    //当在goodsInfo.vue中点击加入购物车按钮时触发
    //触发语句为：this.$store.commit('goodsshopCardatas',{goodsid:id,count:this.count});
    ["goodsshopCardatas"](state,{goodsid,count}){

        state.shopCardatas = JSON.parse(locstorage.getItem(key));

        if(state.shopCardatas ===null) {
            state.shopCardatas = [{goodsid,count}];
        }else{
            state.shopCardatas.push({goodsid,count});
        }
        locstorage.setItem(key, JSON.stringify(state.shopCardatas));
    }
}

/*
 定义getters，在app.vue中,可以通过计算属性获取到
 computed:{
     goodscount: function(){
     return this.$store.getters.shopCarCount;  //获取到shopCarCount的值
     }
 }
* */
const getters = {
    shopCarCount:(s)=>{
        let totalcount =0;
        state.shopCardatas.forEach((item)=>{
            totalcount+=item.count;
        });
        return totalcount;
    },
    shopCardatas: state => {
        return JSON.parse(locstorage.getItem(key));
    }
};

//actions (通知订阅者)
const actions = {
    "goodsshopCardatas":function({commit},{goodsid,count}){
        commit('goodsshopCardatas', {goodsid,count});//触发上面mutations中的方法
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})