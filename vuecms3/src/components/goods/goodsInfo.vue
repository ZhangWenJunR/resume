<template>
    <div class="tmpl">
        <div class="back">
            <a @click="goback">返回</a>
        </div>
        <!--1.0 商品图片滚动区域-->
        <comp-swipe class="compswipe" :list="imglist"></comp-swipe>

        <!--2.0 商品购物区-->
        <div class="shopinfo">
            <div class="title">
                <h1 class="" v-text="goodsinfo.title"></h1>
            </div>
            <ul>
                <li>
                    <span>市场价：</span><s>￥{{ goodsinfo.market_price}}</s>
                    <label class="sellpricetitle">销售价：</label>
                    <span class="sellprice">￥{{ goodsinfo.sell_price}}</span>
                </li>
                <li class="sell">
                    <div class="sellcount">购买数量：</div>
                    <input-Number ref="inputnumbercomp" v-on:val="getnum"
                                  :options="{}"
                                  class="inputnumber"></input-Number>
                    <transition name="drop"
                                @before-enter="beforeEnter"
                                @enter="enter"
                                @after-enter="afterEnter">
                        <div v-show="isdrop" class="ball">
                        </div>
                    </transition>
                </li>
                <li>
                    <mt-button type="primary" size="small" @click="buy">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="intoShopCar">加入购物车</mt-button>

                </li>
            </ul>
        </div>

        <!--3.0 商品参数区-->
        <div class="goodsvalue">
            <div class="title">商品参数</div>
            <ul>
                <li>
                    <label>商品货号：</label>
                    <span v-text="goodsinfo.goods_no"></span>
                </li>
                <li>
                    <label>库存情况：</label>
                    <span>{{goodsinfo.stock_quantity}}件</span>
                </li>
                <li>
                    <label>上架时间：</label>
                    <span>{{goodsinfo.add_time | dateFmt('YYYY-MM;DD HH:mm:ss')}}</span>
                </li>
            </ul>

        </div>

        <!--4.0 图文介绍和评论区-->
        <div class="desc">
            <mt-button plain type="primary" size="large" @click="todesc">图文介绍</mt-button>
            <br />
            <mt-button plain type="danger" size="large" @click="tocomment">商品评论</mt-button>
        </div>

    </div>
</template>
<style scoped>
    .back{
        position: fixed;
        top: 10px;
        left:5px;
        z-index: 5;
    }
    .back a{
        font-size: 16px;
        font-weight: 700;
        color: white;
    }
    .tmpl{
        font-size: 12px;
    }
   /*商品图片滚动区begin*/
     .compswipe,.desc,.shopinfo,.goodsvalue{
        border: 1px solid #f3f3f3;
         margin: 5px;
         -webkit-box-shadow: 0 0 2px  #666;
         -moz-box-shadow: 0 0 2px  #666;
         box-shadow: 0 0 2px  #666;
         -webkit-border-radius:5px;
         -moz-border-radius:5px;
         border-radius:5px;
         padding: 10px;
         color: #53575e;
     }
   /*商品图片滚动区end*/


   /*2.0 商品购物区*/
  .shopinfo ul{
      padding-left: 5px;
  }
    .shopinfo > ul > li{
        margin: 10px;
    }
  .shopinfo .sell{
      display:flex;
  }
    .shopinfo .sellcount{
        flex: 0 0 60px;
        line-height: 30px;
    }
    .shopinfo .inputnumber{
        flex:1;
    }

  .shopinfo .title h1{
      color:#0088D1;
      font-size:18px;
  }
  .shopinfo .sellprice{
      color:red;
      font-size: 21px;
  }
  .shopinfo .sellpricetitle{
      margin-left: 20px;;
  }
  /*点击按钮小球飘入*/
  .ball{
      width: 20px;
      height: 20px;
      background: red;
      -webkit-border-radius:50%;
      -moz-border-radius:50%;
      border-radius:50%;
      position: relative;
      left:-50%;
      top:5px;
      opacity: 1;
      transition: all .5s cubic-bezier(.38,-0.38,.97,.68);
      /*transition: all .5s ease*/
  }
  /*小球动画css*/
    /*.drop-enter-active{*/
        /*transition: all 1s ease;*/
    /*}*/
    /*.drop-leave-active{*/
        /*transition: all 1s ease;*/
    /*}*/
    /*.drop-enter{*/
        /*opacity: 1;*/
        /*transform: translate(30px,400px);*/
    /*}*/
    /*.drop-leave-active{*/
        /*opacity: 1;*/
        /*transform: translate(30px,400px);*/
    /*}*/

   /*3.0 商品参数区*/
   .goodsvalue{

   }
   .goodsvalue li,.shopinfo li{
       list-style: none;
   }

   .goodsvalue .title,.shopinfo .title{
       padding-bottom: 10px;
       border-bottom: 1px solid rgba(92,92,92,0.3);
   }
    /*4.0 商品介绍和评论*/
    .desc{

    }

</style>
<script>
    import common from  '../../kits/common.js'
    import CompSwipe from '../subcomp/swipe'
    import InputNumber from '../subcomp/inputnumber'

    export default{
        data(){
            return{
                goodsinfo:{},
                isdrop:false,
                count:1, //购买数量
                imgdomain:common.imgDomain,     //图片的7牛域名
                imglist:[] //商品图片滚动区的图片数组
            }
        },
        created(){
            // 获取滚动图片
            this.getimgList();
            // 获取标题，参数区数据和价格
            this.getgoodsinfo();
        },
        methods:{
            //0.0 获取标题，参数区数据和价格
            getgoodsinfo(){
                let id=  this.$route.params.id;
                this.$http.get(common.dataApiDomain+'/api/goods/getinfo/'+id)
                        .then((res)=>{
                    this.goodsinfo = res.body.message[0];
                });
            },
            //1.0 获取滚动图片数组
            getimgList:function(){
                let id=  this.$route.params.id;
                this.$http.get(common.dataApiDomain+'/api/getthumimages/'+id)
                        .then((res)=>{
                    var imgs = res.body.message;
                for (var i = 0; i < imgs.length; i++) {
                    imgs[i].img=  this.imgdomain+imgs[i].src;
                    imgs[i].url = '#';
                    delete imgs[i].src;
                };
                this.imglist = imgs;
            })
            },
            //2.0 跳转到评论组件
            tocomment:function(){
                let id=  this.$route.params.id;
//                this.$route.push('/goods/comment/'+id);
                this.$router.push({ name: 'goodscomment',params: { id: id } })
            },
            //2.0.1 跳转到图文描述组件
            todesc:function () {
                let id = this.$route.params.id;
                this.$router.push({ name: 'goodsdesc',params:{ id: id } });
            },
            //3.0 加入购物车
            intoShopCar:function(){
                let id = this.$route.params.id;
                this.$store.commit('goodsshopCardatas',{goodsid:id,count:this.count});

                this.isdrop = !this.isdrop;
            },
            //4.0 立即购买
            buy:function () {
                
            },
            //5.0 获取购买数量值
            getnum:function(count){
                this.count = count;
            },
            //6.0 返回到前一页
            goback:function () {
                this.$router.go(-1);
            },
            //7.0 动画
            beforeEnter (el) {
                //计算出inputnumber空间的位置
//               let inputnumber =  this.$refs.inputnumbercomp;
//               let left =  inputnumber.$el.offsetLeft;
//               let top =  inputnumber.offsetTop;
                let left =  0;
                let top =  0;
                //使用translate3d会自动启用硬件加速
                el.style.webkitTransform = `translate3d(${left}px,${top}px,0)`;
                el.style.transform = `translate3d(${left}px,${top}px,0)`;
            },
            enter (el, done) {
                //重新渲染页面
                let refresh = el.offsetHeight;
                el.style.webkitTransform = 'translate3d(75px,400px,0)';
                el.style.transform = 'translate3d(75px,400px,0)';

                done();
            },
            afterEnter (el) {
                //控制小球显示和影藏的变量
                this.isdrop = !this.isdrop;
            }
    },
        components:{
            CompSwipe,
            InputNumber
        }
    }
</script>
