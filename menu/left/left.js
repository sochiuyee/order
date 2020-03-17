;(function () {

    //请求数据
    function getLeftItemList() {
        $.get('../json/food.json', data => {
            //将请求到的数据存放到全局变量中以便联动
            window.food_spu_tags=data.data.food_spu_tags||[];

            //渲染左侧内容
            getLeftItemListContent(window.food_spu_tags);

            //在shopBar.js中定义的方法
            window.ShopBar.changeDistributionFee(data.data.poi_info.shipping_fee||0);
        });
    }

    //左侧具体内容
    function getItemContent(data) {
            if (data.icon) {
                return '<img class="item-icon" src='+data.icon+' />'+data.name;
            }else{
                return data.name;
            }
    }

    //渲染左侧内容
    function getLeftItemListContent(data) {
        data.forEach(item => {
            //左边选项字符串模板
            const leftItemStr=`<div class="left-item">
                                    <div class="item-text">${getItemContent(item)}</div>
                                </div>`;

            let $target=$(leftItemStr);

            $target.data('itemData',item); // 将左侧每一条导航的所有数据都挂载到每一个导航中

            $('.left-bar-inner').append($target); // 渲染左侧导航栏

            //没有手动点击都默认显示第一项
            $('.left-item').first().click();
        });
    }


    function addClick() {

        //事件代理 冒泡终止到left-bar-inner  事件绑定在left-item上
        $('.left-bar-inner').on('click','.left-item',e => {
            let $target=$(e.currentTarget); //指的是左侧导航 .left-item

            $target.addClass('active'); // 选中导航栏添加激活样式
            $target.siblings().removeClass('active');

            window.Right.refresh($target.data('itemData')); // 把选中的左侧导航数据传递给右侧内容
        });
    }

    //左右联动的思想：渲染左侧选项卡的时候，将每个选项卡对应的数据，通过data方法存储在对应的元素上。
    //  var $target=$(leftItemStr);
    //  $target.data('itemData',item);
    //  在点击对应的选项卡，获取选项卡上存储的数据， 传递给右侧列表渲染数据：
    //  window.Right.refresh($target.data('itemData'));


    function init() {
        getLeftItemList();
        addClick();
    }

    init();
})();
