;(function () {

    let page=0,
        isLoading=false; //设置标志位


    //渲染others内容
    function getOthers(data) {
        let arr=data.discounts2,
            str='';

        arr.forEach(function (item,index) {
            const _str=`<div class="other-info clearfix">
                            <img class="info-tag" src="${item.icon_url}"/>
                            <p class="info-message">${item.info}</p>
                        </div>`;

            str+=_str;
        });
        //将拼接好的字符串返回，否则局部变量str获取不到就是undefined
        return str;
    }

    function getBrand(data) {
        if(data.brand_type) {
            return '<div class="brand">品牌</div>';
        }else {
            return '<div class="new">新到</div>';
        }
    }

    function getMonthNum(data) {
        let num=data.month_sale_num;
        num=num>999?999+'+':num;
        return num;
    }

    //获取商家列表数据，渲染内容
    function getList() {
        page++;
        isLoading=true;

        //发起ajax请求获取数据
        $.get('../json/homelist.json',function (data) {
            var list=data.data.poilist||[];

            //获取商家列表内容
            getListContent(list);

            isLoading=false; //完成ajax请求，标志位设为false
        });
    }

    //将获取到的数据替换列表内容模板字符串
    function getListContent(list) {
        let listContentStr = ''
        list.forEach(function (item,index) {
            //附近商家列表内容模板字符串
            listContentStr += `<div class="item-content">
                                <img class="item-img" src=${item.pic_url} alt=""/>
                                <div class="item-brand">${getBrand(item)}</div>
                                <div class="item-info-content">
                                    <div class="item-title">${item.name}</div>
                                    <div class="item-description">
                                        <div class="item-score">${new Score(item.wm_poi_score)._Score()}</div>
                                        <div class="item-monthCount">月售${getMonthNum(item)}</div>
                                        <div class="item-time">${item.mt_delivery_time}&nbsp;|</div>
                                        <div class="item-distance">&nbsp;${item.distance}</div>
                                    </div>
                                    <div class="item-limit-price">${item.min_price_tip}</div>
                                    <div class="item-others">${getOthers(item)}</div>
                                </div>
                            </div>`;
        });

        // 月售的渲染是调用全局下的构造函数Score中所拥有的Score方法才获得评分，写在getScore.js中
        $('.list-wrap').append($(listContentStr));
    }

    function addEvent() {
        window.addEventListener('scroll',function () {

           const scrollTop=document.documentElement.scrollTop, //页面滚动距离视窗顶部的距离

               clientHeight=document.documentElement.clientHeight, //视窗高度

               scrollHeight=document.body.scrollHeight; //整个可滚动区域的高度

            const preDis=30; //设置一个提前量，当底部距离还有30就加载

            if(scrollTop+clientHeight>=scrollHeight-preDis){

                //最多滚动加载3页
                if(page<3){
                    //在发送ajax请求时，避免触达多次滚动加载
                    if(isLoading){ //正在加载中，并且上一次ajax请求没有完成，不触发下一次滚动加载
                        return;
                    }
                    getList();
                }else {
                    $('.loading').text('加载完成');
                }
            }

        });

    }

    function init() {
        getList();
        addEvent();
    }

    init();
})();
