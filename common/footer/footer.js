(function() {
  function init() {
    const items = [
      {
        key: "index",
        text: "首页"
      },
      {
        key: "order",
        text: "订单"
      },
      {
        key: "my",
        text: "我的"
      }
    ];

    let footerStr = "";
    items.forEach(function(item) {
      footerStr += `<a class="footer-${item.key}" href="../${item.key}/${item.key}.html">
            <img alt="">
            <p href="#">${item.text}</p>
        </a>`;
    });

    $('.footer').append($(footerStr));

    //判断网站名改变当前页面底部激活图标
    const active = window.location.pathname.split("/");

    //获取当前页面的关键字：index、order、my
    const page = active[active.length - 1].replace(".html", "");

    //给对应的页面底部图标添加active的类
    $(".footer-" + page).addClass("active");
  }

  init();
})();
