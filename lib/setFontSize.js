;(function () {
    'use strict';

    var docEl=document.documentElement,
        viewPortEl=document.querySelector('meta[name="viewport"'),
        dpr=window.devicePixelRatio||1,
        maxWidth=1204,
        minWidth=320;

    dpr=dpr>=3?3:(dpr>=2?2:1);

    docEl.setAttribute('data-dpr',dpr);
    docEl.setAttribute('max-width', maxWidth);
    docEl.setAttribute('min-width', minWidth);

    var scale=1/dpr,
        content='width=device-width,initial-scale='+scale+',maximum-scale='+scale+',minimum-scale='+scale+',user-scalable=no';

    if (viewPortEl) {
        viewPortEl.setAttribute('content',content);
    } else {
        viewPortEl=document.createElement('meta');
        viewPortEl.setAttribute('name','viewport');
        viewPortEl.setAttribute('content',content);
        document.head.appendChild(viewPortEl);
    }
    
    setUnitRem();
    
    window.addEventListener('resize',setUnitRem);
    window.addEventListener('pageshow',function (e) {
        if (e.persisted) {
            setUnitRem();
        } 
    });
    
    function setUnitRem() {
        //以手机375px做标准,px2rem设置root font-size为37.5。所以ratio=375/37.5
        var ratio=10,
            viewWidth=docEl.getBoundingClientRect().width||window.innerWidth;

        console.log(viewWidth);
        //如果不设置最大最小宽度，viewWidth=viewWidth*dpr

        if (maxWidth&&(viewWidth/dpr>maxWidth)) {
            viewWidth=maxWidth*dpr;
        }else if (minWidth && (viewWidth / dpr < minWidth)) {
            viewWidth = minWidth * dpr;
        }

        docEl.style.fontSize=viewWidth/ratio +'px';
    }
})();

