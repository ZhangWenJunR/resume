<template>
    <div>
        <mt-header id="hd" fixed title="Vue.js"></mt-header>
        <div id="content" class="routerview">

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" to="/Home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/car">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span v-show="goodscount>0" class="mui-badge" v-text="goodscount"></span>
                    <span v-show="goodscount<=0" class="mui-badge" v-text="locdscount"></span>
				</span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import shopcarkits from './components/goods/shopcarkits.js'

    export default {
        name: 'app',
        data () {
            return {
                locdscount:0
            }
        },
        methods:{

        },
        created (){
//            let key  = 'shopcardata';
//                //localStorage来存储购物车数据
//            let locstorage = window.localStorage;
//            let datas = locstorage.getItem(key);
//            if(!datas){
//                return;
//            }
//            let shopCardatas = JSON.parse(datas);
//            let tmpcount = 0;
//            shopCardatas.forEach((item)=>{
//                tmpcount+=item.count;
//        });
//            this.locdscount = tmpcount;
            this.locdscount = shopcarkits.reloadCount();
        },
        computed:{
            goodscount: function(){
//                console.log(this.$store.getters.shopCardatas);
                return this.$store.getters.shopCarCount;
            }
        }
    }
</script>

<style>
    @import '../statics/css/muihead.css';

    body {
        background-color: white;
    }

    .mint-tab-item-icon {
        width: 48px;
        height: 48px;
        margin: 0 auto 5px
    }

    .routerview {
        margin-top: 45px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

</style>
