;(function () {

    //渲染右侧内容
    function getMenuList(data) {

        //清空原有的内容
        $('.right-list-inner').html('');

        data.forEach(item => {
            if (!item.chooseCount) {
                item.chooseCount = 0;
            }

            //把获取到的数据遍历，将每一条数据内容挂到每一个menu-item上
            const rightItemStr = `<div class="menu-item">
                                    <img class="menu-icon" src=${item.picture} />
                                    <div class="menu-bord">
                                        <p class="menu-title">${item.name}</p>
                                        <p class="menu-dishes">${item.description}</p>
                                        <p class="menu-like">${item.praise_content}</p>
                                        <p class="menu-price">￥${item.min_price}<span class="unit">/${item.unit}</span></p>
                                    </div>
                                    <div class="select-content">
                                        <div class="reduce"></div>
                                        <div class="count">${item.chooseCount}</div>
                                        <div class="plus"></div>
                                    </div>`;

            let $target = $(rightItemStr);

            $target.data('itemData', item); // 将右侧每一条数据内容都挂载到右侧每一件菜品中

            $('.right-list-inner').append($target); // 渲染菜品到右侧
        });
    }

    function initRightTitile(str) {
        $('.right-title').text(str);
    }

    function addClick() {
        $('.menu-item').on('click', '.plus', e => {

            let $count = $(e.currentTarget).parent().find('.count'); //找到被点击加号元素对应的数量元素

            $count.text(parseInt($count.text() || 0) + 1); // 点击加号，渲染的菜品数量+1

            $item = $(e.currentTarget).parents('.menu-item').first();

            //将右侧点击加号对应的菜品，获取其在左侧导航栏中绑定的数据
            var itemData = $item.data('itemData');

            // 添加菜品数量，对应左侧导航栏传递过来的数据也要+1
            itemData.chooseCount++;

            //联动购物车渲染内容函数
            window.ShopBar.renderItems();
        });

        $('.menu-item').on('click', '.reduce', e => {
            let $count = $(e.currentTarget).parent().find('.count'); // 找到被点击减号元素对应的数量元素

            if ($count.text() == 0) return;
            $count.text(parseInt($count.text() || 0) - 1); // 点击减号，渲染的菜品数量-1

            var $item = $(e.currentTarget).parents('.menu-item').first();

            var itemData = $item.data('itemData'); // 获取对应的左侧导航项绑定的数据

            //点击减号，改变数据中的chooseCount
            itemData.chooseCount --;

            //选择右侧菜品联动购物车菜品内容
            window.ShopBar.renderItems();
        });
    }

    function init(data) { // data接收左侧每一条挂载在itemData的数据内容
        getMenuList(data.spus || []);
        initRightTitile(data.name);
        addClick();
    }

    //在left.js中引用refresh的方法，将左侧的left-item数据传递给右侧
    window.Right = {
        refresh: init
    }


})();

//问题：1.为什么在addClick()中，$item=$(e.currentTarget).parents('.menu-item').first();为什么要加上first()?不是通过e.currentTarget获取到的.plus对应的menu-item只有一个，为什么还要加上first()?

//这里可以直接使用$(e.currentTarget).parents('.menu-item')表示获取到得对应的menu-item， 为了代码的严谨性可以可扩展性（后续可能会增加其他元素， 此时代码也不会报错）
