<template>
    <div>
        <ul class="outwarp">
            <li>
                <div class="left" @click="substrict">
                  <span> - </span>
                </div>
            </li>
            <li>
                <div class="center">
                    <span v-text="count"></span>
                </div>
            </li>
            <li>
                <div class="right" @click="add">
                    <span> + </span>
                </div>
            </li>
        </ul>
    </div>
</template>
<style>
    .outwarp {
        font-size: 0px;
    }
    .outwarp li{
        list-style: none;
        display: inline-block;
    }
    .outwarp .left,.outwarp .right,.outwarp .center{
        width:30px;
        height:30px;
        border: 1px solid #f3f3f3;
        margin: 0;
        text-align: center;
        font-size: 12px;
    }
    .outwarp .center{
        width:50px;
    }
    .outwarp .center span,.outwarp .left span,.outwarp .right span{
       position: relative;
        top:5px;
    }
</style>
<script>

    export default{
        data(){
            return{
                count:1
            }
        },
        props:['options'],
        created(){
            this.count = this.options.initcount>0?this.options.initcount:1;
        },
        methods:{
            add:function(){
                this.count ++;
                this.options.type="add";
                this.$emit('val',this.count,this.options);
            },
            substrict:function(){
                if(this.count <=1){
                    return;
                }
                this.count --;
                this.options.type="substract";
                this.$emit('val',this.count,this.options);
            }
        },
        components:{

        }
    }
</script>
