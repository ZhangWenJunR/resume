<template>
    <div>
        <!--
         描述：轮播图片组件封装
         组件：mint-ui
         这个组件需要接收一个list的props属性，请从父组件中传入
         父组件用法：
         1、import CompSwipe from '父组件相对于这个组件的路径/subcomp/swipe.vue'
         2、在父组件的 export devault中注册 组件CompSwipe
         export devault{
            data(){
                return {
                    list:[]
                }
            }
            components:{CompSwipe}
         }
         3、在<template>中使用 <comp-swipe :list="list"></comp-swipe>
         注意 :list传入的list数组会被CompSwipe子组件中的 props中的list接收，所以两个名称一定要匹配
     -->
        <swipe class="my-swipe">
            <swipe-item class="slide1" v-for="item in list">
                <a :href="item.url">
                    <img :src="item.img">
                </a>
            </swipe-item>
        </swipe>
    </div>
</template>
<style scoped>
    .my-swipe {
        height: 250px;
        color: #fff;
        font-size: 30px;
        text-align: center;
    }

    .slide1 a,
    .slide1 img {
        display: block;
        width: 100%;
        height: 250px;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
    }
</style>
<script>
    import {Swipe,SwipeItem} from 'mint-ui';

    export default{
        data(){
                return{

                }
        },
        props:['list'],
        components:{
            Swipe,
            SwipeItem
        }
    }
</script>
