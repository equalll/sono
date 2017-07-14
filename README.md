# sono

> sono vue vuex vue-router

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

slove -webkit-overflow-scrolling: touch; bug

var wrapper = document.getElementById( 'wrapper' );
var touchstartY;

wrapper.addEventListener( 'touchstart', function (ev) {
    var events = ev.touches[ 0 ] || ev;
    touchstartY = events.clientY;
}, false );

wrapper.addEventListener( 'touchmove', function (ev) {
    var events = ev.touches[ 0 ] || ev;
    var scrollTop = wrapper.scrollTop;
    var	offsetHeight = wrapper.offsetHeight;
    var	scrollHeight = wrapper.scrollHeight;
    if ( events.clientY > touchstartY && (wrapper.scrollTop === 0) ) {
        // 下拉时并且页面已经到顶部时
        ev.preventDefault();
    } else if ( events.clientY < touchstartY && (scrollTop + offsetHeight >= scrollHeight) ) {
        // 上拉时并且页面已经到底部时
        ev.preventDefault();
    }
}, false );
