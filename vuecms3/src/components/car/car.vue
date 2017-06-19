<template>
    <div class="tmpl">
        <ul class="goodslist">
            <li class="li" v-for="(item,i) in shopCarDatas">
                <div class="switch">
                 <mt-switch v-model="svalue[i]"></mt-switch>
                </div>
                <div class="img">
                    <img :src="item.thumb_path" width="75px" height="75px" alt="">
                </div>
                <div class="desc">
                    <p class="title" v-text="item.title"></p>
                    <div class="descrow">
                        <span class="price">￥{{item.sell_price}}</span>
                        <input-Number :options="{goodsid:item.id,initcount:getcount(item.id)}"
                                      ref="inputnumbercomp" v-on:val="getnum"
                                  class="inputnumber"></input-Number>
                        <a class="del" @click="del(item.id)">删除</a>
                    </div>
                </div>

            </li>
        </ul>
        <div class="settlement">
            <div class="left">
                <div class="row1">总计(不含运费):</div>
                <div class="row2">已经选择商品 {{settobj.count}} 件，总价 ￥{{settobj.price}} 元</div>
            </div>
            <div class="right">
                <mt-button size="large" type="danger" @click="settlementer">去结算</mt-button>
            </div>
        </div>
        {{this.svalue}}
    </div>

</template>
<style>
    .mint-switch{
        margin-top: 15px;
    }
    .goodslist{
        padding-left: 5px;
    }
    .goodslist .title{
        color:#0094ff;
    }
    .goodslist .li{
        display: flex;
        border-bottom: 1px solid rgba(92,92,92,0.2);
    }
    .goodslist .switch{
         flex: 0 0 55px;
     }
    .goodslist .img{
        flex: 0 0 75px;
    }
    .goodslist .desc{
        flex: 1;
    }
    .goodslist .descrow{
        display: flex;
    }
    .descrow .price{
        flex: 0 0 10px;
    }
    .descrow .inputnumber{
        flex: 0 0 140px;
    }
    .descrow .del{
        flex:  1;
        color: rgb(92,92,92);
        font-size: 12px;
        line-height: 30px;
    }
    .goodslist .price{
        color:red;
        line-height: 30px;
    }
    .descrow .inputnumber .outwarp{
        padding-left: 10px;
    }
    .goodslist li.li{
       list-style: none;
        padding: 5px;
    }

    .settlement{
        display: flex;
        background: rgba(92,92,92,0.1);
        padding: 10px;
    }
    .settlement  .left{
        flex: 0 0 260px;
        padding: 5px;
    }
    .settlement  .left .row1{
        font-weight: 700;
    }
    .settlement  .left .row2{
        margin-top: 10px;
        font-size: 12px;
    }
    .mint-button.mint-button--danger.mint-button--large{
        margin-top: 5px;
    }
    .settlement  .right{
        margin-right: 5px;
        flex: 1;
    }

</style>
<script>
    import shopcarkits from '../goods/shopcarkits.js'
    import common from '../../kits/common.js'
    import InputNumber from '../subcomp/inputnumber'
    import { Toast } from 'mint-ui';

    export default{
        data(){
            return {
                currenttype:'', //当前是增加数量还是减少数量的类型
                currentgoodsid:-1,  //增加数量和减少数量操作时的当前商品id
                newaddcount:0,  //增加的增量
                svalue:[],  //被选中商品的数组，只要选中了，里面的存储的就是true
                shopCarDatas:[]  //商品信息数组
            }
        },
        methods:{
            //1.0 获取inputnumber组件中的值
            getnum:function(count,options){
                let COUNT = 1;
                if(options.type === 'add'){
                    COUNT= 1;
                }else{
                    COUNT= -1;
                }
                this.$store.commit('goodsshopCardatas',{goodsid:options.goodsid,count:COUNT});
                //当值有改变的时候，只要是当前商品有选择，则通过改变向svalue数组中push一条数据后，在通过pop弹出
                //但是vue会监控到svalue的改变，从而触发计算属性settobj的调用
                this.svalue.push(1); //入栈
                this.svalue.pop();//出栈
            },
            //2.0 根据商品id从本地存储中获取count
            getcount:function(goodsid){
              return  shopcarkits.getCountByGoodsId(goodsid) || 0;
            },
            //3.0 结算
            settlementer(){
                if(this.settobj.count<=0){
                    Toast('请至少选择一个商品');
                    return;
                }

                //跳转
                Toast('跳转到订单页面');
            },
            //4.0 计算购物车总数和总金额
            settleCP(){
                let truearr = this.svalue.filter(c=>c===true);
                let count = truearr.length; //计算选择的商品总数
                let price =0;
                //根据true所在svalue中的索引值，从shopCarDatas中查找商品价格
                this.svalue.forEach((value,index)=>{
                    if(value===true){
                    let goodsitem = this.shopCarDatas[index];
                    price+= goodsitem.sell_price * this.getcount(goodsitem.id);
                }
            });
                return {
                    count,
                    price
                }
            }
        },
//        watch: {
//            'svalue': {
//                handler: function (newVal) {
//                    console.log(newVal);
//                },
//                deep: true
//            }
//        },
        computed:{
            settobj: function(){
                return this.settleCP();
            }
        },
        created(){
            // 1.0 获取购物车数据中多个商品id的字符串表示
           let ids =  shopcarkits.getGoodsIds();

            //2.0 请求服务器获取数据
            this.$http.get(common.dataApiDomain+'/api/goods/getshopcarlist/'+ids)
                    .then((res)=>{
                let datas = res.body.message;

                datas.forEach((item)=>{
                    item.thumb_path = common.imgDomain + item.thumb_path;
                })
                this.shopCarDatas =datas;

            //初始化svalue数组
            let count = datas.length;
            for(let i =0; i<count; i++){
                this.svalue.push(false);
            }
            });
        },
        components:{
            InputNumber
        }
    }

</script>
