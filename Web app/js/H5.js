/**
 * Created by MBENBEN on 2016/11/1.
 */
var H5 = function(){
    this.id = ('h5_'+Math.random()).replace('.','_');
    this.page=[];
    this.el = $('<div class="h5" id="'+this.id+'">').hide();
    $('body').append(this.el);
    /**
    *����һ��ҳ
    * @param{string} name ��������� ����뵽className��
    * @param{string} text  ҳ�ڵ�Ĭ���ı�
    * @return{H5} H5����,�����ظ�ʹ��H5����֧�ֵķ���
     */
    this.addPage = function(name,text){
        var page=$('<div class="h5_page section">');
        if(name != undefined){
            page.addClass('h5_page_'+name);
        }
        if(text != undefined){
            page.text(text)
        }
        this.el.append(page);
        this.page.push(page);
        return this;
    };
    /*����һ�����*/
    this.addComponent = function(name,cfg){
        var cfg = cfg || {};
        cfg = $.extend({
            type:'base'
        },cfg);//���cfg��ʲô��û�д��Ļ������ߴ����cfg��û��type�Ļ������һ��type��ֵΪbase

        var component;//����һ������ �洢���Ԫ��
        var page = this.page.slice(-1)[0];
        switch(cfg.type){
            case 'base':
                component = new H5ComponentBase(name,cfg);

                break;

                default:
        }
        page.append(component);
        return this;

    };
    /*H5�����ʼ������*/
    this.loader = function(){
        this.el.fullpage({
            onLeave: function(index,nextIndex,direction){
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink,index){
                $(this).find('.h5_component').trigger('onLoad');

            }
        });
        this.page[0].find('.h5_component').trigger('onLoad');
        this.el.show();
    };
    return this;
};
