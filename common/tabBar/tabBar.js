;(function () {

    function init() {
        const items=[{
            key:'menu',
            text:'点菜'
        },{
            key:'comment',
            text:'评论'
        },{
            key:'restaurant',
            text:'商家'
        }];

        items.forEach(function (item) {
            const headerTabStr=`<a class="$key tab-item" href="../$key/$key.html">
                                        ${item.text}
                                </a>`;

            $('.tab-bar').append($(headerTabStr));
        });

        const arr=window.location.pathname.split('/');
        const page=arr[arr.length-1].replace('.html','');

        $('a.'+page).addClass('active');
    }

    init();
})();
