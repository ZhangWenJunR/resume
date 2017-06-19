<template>
    <div class="tmpl">
        <div class="back">
            <a @click="goback">返回</a>
        </div>
        <div class="title">
            <h1 v-text="desc.title">

            </h1>
        </div>
        <div class="gdesc" v-html="desc.content"></div>
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
 .title h1{
    color:#0088D1;
    font-size:18px;
     padding: 10px;
     border-bottom: 1px solid rgba(92,92,92,0.3);
}
    .gdesc{
        padding: 5px;
    }
    .gdesc img{
        /*max-width: 100%;*/
    }
</style>
<script>
    import common from '../../kits/common.js'

    export default{
        data(){
            return{
                desc:{}
            }
        },
        created(){
            this.getdesc();
        },
        methods:{
            getdesc:function(){
                var id = this.$route.params.id;
                this.$http.get(common.dataApiDomain+'/api/goods/getdesc/'+id)
                        .then((res)=>{
                        this.desc = res.body.message[0];
                });
            },
            //2.0 返回到前一页
            goback:function () {
                this.$router.go(-1);
            }
        }
    }
</script>
