;(function () {

    //渲染购物车商品
    function renderItems() {
        //清空内容 使同一样食物添加只是数量增长而不是重复添加一行相同食物
        $('.product-content').empty();

        const list = window.food_spu_tags || [];
        let totalPrice = 0;

        list.forEach(item => {
            //item代表list的每一项数据，item.spus包含需要的数据内容
            item.spus.forEach(_item => {
                if (_item.chooseCount > 0) {
                    //同一样食物总价=单价*数量
                    let price = _item.min_price * _item.chooseCount;

                    const tmpl = `<div class="choose-item">
                                        <div class="item-name">${_item.name}</div>
                                        <div class="price">￥<span class="item-total-price">${price}</span></div>
                                        <div class="select-content">
                                            <div class="reduce"></div>
                                            <div class="count">${_item.chooseCount}</div>
                                            <div class="plus"></div>
                                        </div>
                                </div>`;

                    totalPrice += price; //所有食物的总价

                    let $priceContent = $(tmpl);

                    $priceContent.data('itemData', _item); // 存储全局请求到的菜单数据到购物车的每一条数据

                    $('.product-content').append($priceContent); // 渲染购物车内容
                }

                changeDotNum(); //改变购物车图标红点数字

                changeTotalPrice(totalPrice);  // 改变所有菜品总价
            });
        });
    }

    //修改配送费
    function changeDistributionFee(str) {
        $('.distribution-fee').find('.fee').text(str);
    }

    function changeTotalPrice(str) {
        $('.total-price-text').text(str);
    }

    //修改总价
    function changeDotNum() {

        let $count = $('.product-content').find('.count'),
            total = 0;

        for (let i = 0; i < $count.text(); i++) {
            total += parseInt($($count[i]).text() || 0); // 将每一条购物车内容的数量相加获取总价
        }

        $('.dot-num').text(total);

        if (Number($('.dot-num').text()) === 0) { // 将红点的数量内容强制转成数字
            $('.dot-num').hide();
        } else {
            $('.dot-num').show();
        }
    }

    //显示隐藏，针对遮罩层和清空购物车的显示隐藏
    function showHide(ele, className) {
        if ($(ele).hasClass(className)) {
            $(ele).removeClass(className);
        } else {
            $(ele).addClass(className)
        }
    }


    function addClick() {

        //点击购物车图标显示隐藏遮罩和购物车具体内容
        $('.total-price').on('click', '.car-icon', () => {
            showHide($('.mask-cover'), 'hide');
            showHide($('.clear'), 'hide');
        });

        $('.product-content').on('click', '.plus', e => {
            let $count = $(e.currentTarget).parent().find('.count');

            $count.text(parseInt($count.text() || 0) + 1);

            let $item = $(e.currentTarget).parents('.choose-item').first(); //parents获取到的是数组，要取第一个元素

            let itemData = $item.data('itemData'); // 获取挂载在购物车每一条菜品列表的数据

            itemData.chooseCount++;

            renderItems(); //点击购物车商品加号，更新购物车菜品列表内容

            $('.left-item.active').click(); // 只触发选中选项卡的点击事件达到更新数据的目的。 提高程序的运行效率
        });

        $('.product-content').on('click', '.reduce', e => {

            let $count = $(e.currentTarget).parent().find('.count');

            if ($count.text() === 0) {
                return;
            }

            $count.text(parseInt($count.text() || 0) - 1);

            const $item = $(e.currentTarget).parents('.choose-item').first();

            let itemData = $item.data('itemData');

            itemData.chooseCount--;

            //点击购物车内容的加减号渲染购物车每一条内容
            renderItems();

            // 触发left.js中的addClick函数中，左侧点击.left-item绑定的事件里调用了window.Right.refresh(左侧绑定在元素上的数据)，进行左右侧的数据联动
            $('.left-item.active').click();

            if (itemData.chooseCount === 0) {
                showHide($('.mask-cover'), 'hide');
                showHide($('.clear'), 'hide');
            }

        });

    }

    //清空购物车
    function clearCar() {
        $('.clear-shop-bar').on('click', function (e) {

            let $item = $(e.currentTarget).siblings().find('.choose-item');

            $item.each(function () {
                let itemData = $(this).data('itemData'); // $(this)指的是.choose-item，不能使用箭头函数，使用箭头函数的$(this)是.clear-shop-bar
                itemData.chooseCount = 0; // 改变购物车每一条菜品列表绑定的chooseCount数据
            });

            //改写了chooseCount数据后，重新渲染购物车内容。虽然renderItems中如果chooseCount不是大于0就不渲染choose-item，但是仍然改变购物车红点和总价
            renderItems();

            //left.js中的addClick函数中，左侧点击.left-item绑定的事件里调用了window.Right.refresh(左侧绑定在元素上的数据)，进行左右侧的数据联动
            $('.left-item.active').click();

            //清空购物车内容
            $('.product-content').empty();

            //清空购物车后隐藏遮罩层和清空购物车图标
            showHide('.mask-cover', 'hide');
            showHide($('.clear'), 'hide');
        });
    }


    function init() {
        addClick();
        clearCar();
    }

    init();


    window.ShopBar = {
        renderItems: renderItems,
        changeDistributionFee: changeDistributionFee
    };

})();

//$('.left-item.active').click()的主要作用是为了触发左侧选项的点击事件，因为左侧选项卡点击事件中调用了右侧渲染列表的refresh方法，所以可以重新渲染右侧列表

// 1）右侧列表渲染的数据是从左侧传入进来的， 在购物车中点击加减号的时候，需要更新右侧列表的数据，所以每点击一次需要调用右侧的refresh这个函数重新渲染列表，实现联动效果。

// 2）这里只是为了触发左侧的点击事件，调用refresh方法， 所以也可以直接写成$('.left-item').click();触发点击事件。

// 3）这里写成$('.left-item.active')只触发选中选项卡的点击事件达到更新数据的目的。 提高程序的运行效率
