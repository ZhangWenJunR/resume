<template>
    <div>
        <!--

               描述：评论标题区域
           -->
        <div class="commenttitle">
            <h3>提交评论</h3>
            <span style="font-size: 16px;"><a @click="goback">返回</a></span>
        </div>
        <!--

                       描述：评论区域
                   -->
        <div class="comment">
            <textarea ref="commenttxt" placeholder="请输入评论内容..."  id="commenttxt">

            </textarea>
            <mt-button type="primary" size="large" @click="submitComment()">发表</mt-button>
        </div>

        <!--

                      描述：评论列表区域
                  -->
        <div class="commenttitle">
            <h3>评论列表</h3>
            <span>44条评论</span>
        </div>
        <div class="commentlist">

            <div class="outwarp" v-for="comment in commentlist">
                <div class="content" v-text="comment.content"></div>
                <div class="username" v-text="comment.user_name"></div>
                <div class="addtime">{{comment.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</div>
            </div>

        </div>
        <!--

             描述：加载更多
         -->
        <mt-button plain type="danger" size="large" @click="loadmore">加载更多</mt-button>
    </div>
</template>
<style>
    .commenttitle{
        height: 60px;
        clear:both;
        border-bottom: 1px solid #c8c8cd;
        padding:10px 0 10px 10px;
    }

    .commenttitle h3{
        width: 200px;
        float: left;
    }
    .commenttitle span{
        float: right;
        width:100px;
        line-height: 40px;
        font-size:12px;
        color:#5c5c5c;
    }
    #commenttxt{
        display: block;
        width:100%;
        height: 100px;
    }
    .comment{
        padding:10px;
        border-bottom: 1px solid #c8c8cd;
    }
    .commentlist{
        padding: 10px;

    }
    .commentlist .outwarp:nth-child(1n + 2){
        clear: both;
        padding-top: 10px;
        border-top: 1px solid #c8c8cd;
    }
    .commentlist .content{
        margin-bottom: 10px;
        color:#5c5c5c;
    }
    .commentlist .username{
        width: 50%;
        float: left;
        color:#0094ff;
        padding:10px 0 10px 0 ;
    }
    .commentlist .addtime{
        width: 50%;
        float: right;
        color:#5c5c5c;
        padding:10px 0 10px 0 ;
    }
</style>
<script>
    import common from  '../../kits/common.js'
    import { Toast } from 'mint-ui'
    export default{
        data(){
            return{
                pageindex:1,  //评论内容分页索引
                commentlist:[] //评论内容
            }
        },
        created(){
             this.getcomment(this.pageindex);
        },
        monuted(){
        },
        methods:{
            //获取图片的评论
            getcomment:function(pageindex){
                let id=  this.$route.params.id;
                this.$http.get(common.dataApiDomain+'/api/getcomments/'+id+'?pageindex='+pageindex).
                then((res)=>{
                    this.commentlist= this.commentlist.concat(res.body.message);
            });
            },
            //提交评论
            submitComment:function(){
                let id=  this.$route.params.id;
                //获取通过 ref="commenttxt"的dom对象的vlaue值（评论数据）
                let content = this.$refs.commenttxt.value;
                if(!content ||  content.trim() == '')
                {
                    return Toast({
                        message: '评论内容不能为空',
                        duration: 2000
                    });
                }

                //提交
                this.$http.post(common.dataApiDomain+'/api/postcomment/'+id,
                        {content:content}
                        ,{emulateJSON:true})
                        .then((res)=> {
                    // 刷新评论
                    this.getcomment(1)
                //清空评论框内容
                this.$refs.commenttxt.value = ''
                //提示成功
                Toast({
                    message: res.body.message,
                    duration: 2000
                });
            });
            },
            //加载更多
            loadmore:function(){
                this.pageindex ++;
                this.getcomment(this.pageindex);
            },
            //返回
            goback:function(){
                this.$router.go(-1);
            }
        }
    }
</script>
