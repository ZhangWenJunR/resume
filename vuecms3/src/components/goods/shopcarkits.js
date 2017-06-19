/*
 手工刷新购物车件数 :reloadCount
 和刷新购物车商品列表:reloadShopCarList
 设置数据： addShopCarList
 删除数据: removeShopCarList
 合并相同goodsid的数据的count为一个:getGoodsIds()
 获取购物车中的商品id和count的对象：getGoodsModel()
* */
const key  = 'shopcardata';
//localStorage来存储购物车数据
const locstorage = window.localStorage;

function reloadCount(){
    let datas = locstorage.getItem(key);
    if(!datas){
        return 0;
    }
    let shopCardatas = JSON.parse(datas);
    let tmpcount = 0;
    shopCardatas.forEach((item)=>{
        tmpcount+=item.count;
    });
    return tmpcount;
}

function reloadShopCarList(){
    let datas = locstorage.getItem(key);
    if(!datas){
        return [];
    }
    let shopCardatas = JSON.parse(datas);
    return shopCardatas;
}

function setShopCarList(goodsid,count)
{
    let datas = reloadShopCarList();
    let goods =  datas.filter(c=>c.goodsid === goodsid);
    if(!goods || goods.length <= 0){
        // 添加数据
        datas.push({goodsid,count});
    }else{
        // 更新数据goodsid对于的count数
        for(let i=0;i<datas.length;i++){
            if(datas[i].goodsid === goodsid){
                datas[i].count = datas[i].count + count;
                break;
            }
        }
    }
    //重新设置回locstorage
    locstorage.setItem(key,JSON.stringify(datas))
}

function removeShopCarList(goodsid)
{
    let datas = reloadShopCarList();

    //查找goodsid在datas数组中的索引
    // var index = arr.findIndex(c=>c.goodsid===2);
    // document.write('index='+index);
    // if(index === -1){
    //     return; //没有查找到数据
    // }
    // //执行删除操作 splice(开始删除的索引,删除数量)
    // datas.splice(index,1);
    //
    // //保存到本地存储中
    // locstorage.setItem(key,JSON.stringify(datas))

    var index = 0;
    do{
        index = arr.findIndex(c=>c.goodsid===goodsid);
        if(index !==-1){
            datas.splice(index,1);
        }
    }while (index !==-1)

    //保存到本地存储中
    locstorage.setItem(key,JSON.stringify(datas))
}

/*获取购物车中的合并后的商品id和count的对象：
* 格式为:
* {
*   goodsid:count
* }
* 实例：
* {
*  88:12
* }
* */
function getGoodsModel(){
    let datas = reloadShopCarList();
    if(!datas)
    {
        return 0;
    }
    // 2.0 合并相同id的count作为goods的key
    let goods={};
    datas.forEach((item)=>{
        //item 的格式为-> {goodsid:1,count:1}
        if(goods[item.goodsid]){
            goods[item.goodsid] = goods[item.goodsid]+item.count;
        }else{
            goods[item.goodsid] = item.count;
        }
    });
    return goods;
}
// 获取购物车中的所有商品id字符串,以逗号隔开
function getGoodsIds(){
    let goods = getGoodsModel();

    // 3.0 遍历goods中所有key获取商品数据
    let keys = [];
    for(let key in goods){
        keys.push(key);
    }
    let keyStr = keys.join(',');

    return keyStr;
}

// 根据商品id获取数量
function getCountByGoodsId(goodsid){
   let goodsObject =  getGoodsModel();
    return goodsObject[goodsid];
}

export default {
    reloadCount,
    reloadShopCarList,
    removeShopCarList,
    setShopCarList,
    getGoodsIds,
    getGoodsModel,
    getCountByGoodsId  //根据商品id获取数量
}