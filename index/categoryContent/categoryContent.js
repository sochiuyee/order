(function() {
  function getData() {
    $.get("../json/head.json", function(data) {
      const list = data.data.primary_filter.splice(0, 8); //截取数据数组的0-8位数据

      let categoryContentStr = "";
      list.forEach(function(item, index) {
        //类目内容模板字符串
        categoryContentStr += `<div class="category-item">
                                    <img src="${item.url}" alt="" class="item-icon"/>
                                    <p class="item-text">${item.name}</p>
                              </div>`;
      });
      $(".category-content").append($(categoryContentStr));
    });
  }

  function addClick() {
    //采用事件代理方式绑定事件
    $(".category-content").on("click", ".category-item", function() {
      alert(1);
    });
  }

  function init() {
    getData();
    addClick();
  }

  init();
})();
