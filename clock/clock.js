/**
 * Created by MBENBEN on 2016/10/27.
 */
var dom=document.getElementById("clock");
var ctx=dom.getContext("2d");
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r = width/2;
var rem=width/200;

function drawBackground(){
    ctx.save();
    ctx.translate(r,r);//将画布的原点移动到中心
    ctx.beginPath();
    ctx.lineWidth=10*rem;//框的宽度
    ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);//arc函数的六个参数：圆心坐标x,y,半径，开始弧度，结束弧度，是否逆时针
    ctx.stroke();
    var hoursNumber=[3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font=18*rem+'px Arail';//字体大小
    ctx.textAlign='center';
    ctx.textBaseline='middle';//设置以
    hoursNumber.forEach(function(num,i){//参考https://msdn.microsoft.com/zh-cn/library/ff679980(v=vs.94).aspx
        var rad= 2*Math.PI/12*i;
        var x = Math.cos(rad)*(r-30*rem);
        var y= Math.sin(rad)*(r-30*rem);
        ctx.fillText(num,x,y);
    });
    for (var i=0;i<60;i++){
        var rad=2*Math.PI/60*i;
        var x=Math.cos(rad)*(r-18*rem);
        var y=Math.sin(rad)*(r-18*rem);
        ctx.beginPath();
        if(i%5 == 0){
            ctx.fillStyle='#000';//必须加这句，否则只有3点那是黑点
            ctx.arc(x,y,2*rem,0,2*Math.PI);
        }else {
            ctx.fillStyle='#ccc';
            ctx.arc(x,y,2*rem,0,2*Math.PI);
        }
        ctx.fill();
    }

}//drawBackground结束
    function drawHour(hour,minute){
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth=6*rem;
        ctx.lineCap='round';//设置线帽
        var rad=2*Math.PI/12*hour;
        var mrad=2*Math.PI/12/60*minute;
        ctx.rotate(rad+mrad);//分钟对时针还有影响
        ctx.moveTo(0,10*rem);
        ctx.lineTo(0,-r/2);
        ctx.stroke();//绘制
        ctx.restore();
}
    function drawMinute(minute){
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth=3*rem;
        ctx.lineCap='round';
        var rad=2*Math.PI/60*minute;
        ctx.rotate(rad);
        ctx.moveTo(0,10*rem);
        ctx.lineTo(0,-r+30*rem);
        ctx.stroke();
        ctx.restore();//ctx.save()与ctx.restore()保存和移除之前的画布环境，否则分针将在时针的基础上移动；
}
    function drawSecond(second){
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle='#c14543';
        var rad=2*Math.PI/60*second;
        ctx.rotate(rad);
        ctx.moveTo(-2*rem,20*rem);
        ctx.lineTo(2*rem,20*rem);
        ctx.lineTo(1,-r+18*rem);
        ctx.lineTo(-1,-r+18*rem);
        ctx.fill();
        ctx.restore();
}
    function drawDot(){

        ctx.beginPath();
        ctx.fillStyle='#fff';
        ctx.arc(0,0,3*rem,0,2*Math.PI,false);
        ctx.fill();

}

    function draw(){
            ctx.clearRect(0,0,width,height);
            var now=new Date();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            drawBackground();
            drawHour(hour,minute);
            drawMinute(minute);
            drawSecond(second);
            drawDot();
            ctx.restore();

        }
    draw();
    setInterval(draw,1000);