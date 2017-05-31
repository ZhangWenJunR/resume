/**
 * Created by MBENBEN on 2017/5/31.
 */
function progress() {
    var $progress = $('.circleProgress_wrapper .progress');
    $progress.on('click',function () {
        var $this = $(this);
        var text =$this.parents('.circleProgress_wrapper').find('.progressText').text();
        var cur = $this.parents('.circleProgress_wrapper').find('.progressText');
        var parents = $this.parents('.circleProgress_wrapper');
        console.log(text);
        var num = parseInt(text);
        var x,y;
        var a=0;
        var clock = setInterval(function () {
            a++;
            x = 45-3.6*(100-a);
            y = 45-3.6*(50-a);
            if (a>=50){
                parents.find($('.leftcircle')).css("transform","rotate("+x+"deg)");
                parents.find($('.rightcircle')).css("transform","rotate(45deg)");
            }
            else if (50>a>=0){
                parents.find(('.leftcircle')).css("transform","rotate(225deg)");
                parents.find(('.rightcircle')).css("transform","rotate("+y+"deg)");
            }
            cur.text(a+'%');
            if(a===num){
                clearInterval(clock);
            }
        },50);
    });
    $progress.click();
}
progress();