<template>
    <div class="tmpl">
        <!--图片列表区域bengin-->
        <ul class="mui-table-view mui-grid-view">
            <!--<li class="mui-table-view-cell mui-media mui-col-xs-6">-->
                <!--<a href="#">-->
                    <!--<img class="mui-media-object" src="../../../statics/images/menu3.png">-->
                    <!--<div class="mui-media-body">-->
                        <!--<p>幸福就是可以美美的睡一觉，静静的喝一杯咖啡静静的喝一杯咖啡</p>-->
                        <!--<div class="price">-->
                            <!--<span>￥1299</span>-->
                            <!--<s>￥3299</s>-->
                        <!--</div>-->
                        <!--<div class="tips">-->
                            <!--<div class="tip_left">热卖中</div>-->
                            <!--<div class="tip_right">400件已售</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</a>-->

            <!--</li>-->
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in list">
                <router-link v-bind="{to:'/goods/info/'+item.id}">
                    <div class="itemwarp">
                        <img class="mui-media-object" v-lazy="item.img_url" :key="item.img_url">
                        <div class="mui-media-body">
                            <p v-text="item.title"></p>
                            <div class="price">
                                <span>￥{{item.sell_price}}</span>
                                <s>￥{{item.market_price}}</s>
                            </div>
                            <div class="tips">
                                <div class="tip_left">热卖中</div>
                                <div class="tip_right">剩{{item.stock_quantity}}件</div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        <!--图片列表区域end-->
    </div>
</template>
<style scoped>
    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
        height: 100px;
    }
    .mui-media-body p {
        color: #000;
        font-size: 12px;
        text-align: left;
        /*以下4句是实现文字显示两行，超出的在第二行用...替代关键代码*/
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .itemwarp{
        border:1px solid rgba(92,92,92,0.1);
        padding: 3px;
        box-shadow: 0px 0px 4px #666;
    }
    .mui-table-view-cell a{
        padding: 5px;
    }

    .tmpl ul{
        padding-right: 0px;
    }

    .mui-table-view-cell > a:not(.mui-btn) {
        white-space: inherit;
    }

    .price{
        text-align: left;
        padding: 10px 0 10px 0px;
        margin-top: 5px;
        border-bottom: 1px solid #f0f0f0;
        border-top: 1px solid #f0f0f0;
        background: #f0f0f0;
    }
    .price span{
        color: red;
    }
    .price s{
        color: #5c5c5c;
        font-size:12px;
        margin-left: 10px;
    }
    .tips{
        height: 50px;
        font-size: 12px;
        display: flex;
    }
    .tips .tip_left{
        padding: 10px 0 10px 0;
        flex: 0 0 45px;
        background: #f0f0f0;
        color: #5c5c5c;
    }
    .tips .tip_right{
        padding: 10px 10px 10px 0;
        flex:1;
        text-align: right;
        background: #f0f0f0;
        color: #5c5c5c;
    }
</style>
<script>
    import common from  '../../kits/common.js'
    import { Indicator } from 'mint-ui';

    export default{
        data(){
            return {
                list:[]
            }
        },
        created(){
            this.getlist(1);
        },
        methods:{
            getlist:function(pageindex){
                Indicator.open('努力加载中');
                this.$http.get(common.dataApiDomain+'/api/getgoods?pageindex='+pageindex)
                        .then((res)=>{
                    this.list = res.body.message;
                //关闭
                Indicator.close();
            });
            }
        }
    }
</script>
