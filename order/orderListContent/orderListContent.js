;(function () {

    var page = 0,
        isLoading = false;

    //渲染菜品个数
    function getProduct(data) {
        const content = data.product_list || [];
        let productStr = '';
        content.forEach(function (item) {
            productStr += `<div class="product-item">
                                     ${item.product_name}
                                    <div class="p-count">x
                                         ${item.product_count}
                                    </div>
                                </div>`;
        });

        //将字符串结果返回，否则会undefined
        return productStr;
    }


    //渲染菜品价格
    function getTotalPrice(data) {
        let str = `<div class="product-item">
                      <span>...</span>
                      <div class="p-total-count">
                            总计${data.product_count}个菜，实付
                            <span class="total-price">
                                   ${data.total}
                            </span>
                      </div>
                </div>`;

        //将字符串结果返回，否则会undefined
        return str;
    }

    //渲染评价按钮内容
    function getComment(data) {
        const evaluation = data.is_comment;
        if (Number(evaluation) === 0) {
            return '评价';
        } else if (Number(evaluation) === 1) {
            return '再来一单';
        }
    }


    //请求数据
    function getOrderList() {
        page++;
        isLoading = true;

        $.get('../json/orders.json', function (data) {
            var content = data.data.digestlist || [];
            getOrderListContent(content);
            isLoading = false;
        });
    }

    //渲染内容
    function getOrderListContent(data) {
        let orderListStr = ''
        data.forEach(function (item) {
            orderListStr += `<div class="order-item">
                                    <div class="order-item-inner">
                                         <img class="item-img" src=${item.poi_pic} alt=""/>
                                         <div class="item-right">
                                              <div class="item-top">
                                                    <p class="shop-name">${item.poi_name}</p>
                                                    <i class="iconfont">&#xe64a;</i>
                                                    <span class="order-status">${item.status_description}</span>
                                              </div>
                                              <div class="item-bottom">
                                                    ${getProduct(item)}
                                                    ${getTotalPrice(item)}
                                              </div>
                                         </div>
                                    </div>
                                    <div class="order-evaluation clearfix">
                                         <button class="evaluation-btn">${getComment(item)}</button>
                                    </div>
                               </div>`;
        });
        $('.order-list').append($(orderListStr));
    }

    //滚动切换
    function addEvent() {
        window.addEventListener('scroll', function (e) {
            const clientHeight = document.documentElement.clientHeight,
                scrollTop = document.documentElement.scrollTop,
                scrollHeight = document.body.scrollHeight;

            const preDistance = 30;

            if (clientHeight + scrollTop >= scrollHeight - preDistance) {
                if (page < 3) {
                    if (isLoading) { //正在发起ajax请求不加载页面内容
                        return;
                    } else {
                        getOrderList(); //加载页面内容
                    }
                } else {
                    $('.loading').text('加载完成');
                }
            }
        });
    }

    function init() {
        getOrderList();
        addEvent();
    }

    init();

})();
