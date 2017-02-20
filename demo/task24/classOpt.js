var classOpt={
    // ����һ��Ԫ���Ƿ�����������
    hasClass:function(elem,str){
        var reg=new RegExp('(\\s|^)'+str+'(\\s|$)','g');
        return reg.test(elem.className);
    },
    // �Ƴ�һ��Ԫ�ص�����
    singleRemoveClass: function (elem, str) {
        var reg=new RegExp('(\\s|^)'+str+'(\\s|$)','g');
        elem.className=(elem.className).replace(reg,"");
    },
    // �Ƴ����Ԫ�ص�����
    removeClass: function (elems, str) {
        if (elems.length && elems.length > 0) {
            for (var i = 0; i < elems.length; i++) {
                classOpt.singleRemoveClass(elems[i], str);
            }
        }else{
            classOpt.singleRemoveClass(elems, str);
        }
    },
    // ��һ��Ԫ�ص�class���һ������
    singleAddClass: function (elem, str) {
        if(!classOpt.hasClass(elem,str)){
            elem.className=elem.className+" "+str;
        }
    },
    // �����Ԫ�ص�class���һ������
    addClass: function (elems, str) {
        if (elems.length && elems.length > 0) {
            for (var i = 0; i < elems.length; i++) {
                classOpt.singleAddClass(elems[i], str);
            }
        }else{
            classOpt.singleAddClass(elems, str);
        }
    }
}