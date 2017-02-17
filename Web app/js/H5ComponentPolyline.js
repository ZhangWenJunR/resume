/* 基本图文组件对象 */
/*折线图组件对象*/
var H5ComponentPolyline= function(name,cfg){
    var component = new H5ComponentBase(name,cfg);
    //绘制网格线
    var w = width;
    var h = height;

    //加入一个画布(网格线背景)
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;

    //水平网格线 100份 -->> 10份
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle='#aaa';
    window.width = width;
    for(i=0;i<step;i++){

    }

    component.append(cns);


    return component;
};
