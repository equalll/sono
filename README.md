vue项目实战-sono

> vue vuex vue-router vuerify axios vue-infinite-scroll exif-js qs less

--------------------

关于sono是一个什么东西，可以扫描下面二维码了解关于更多sono。
![sono](readme-images/1.jpg "sono")

### vue之我见

[vue](https://cn.vuejs.org/)是一个构建数据驱动的 web界面的渐进式框架。那这是官方给的解释，我自己的理解的就是一个mvvm框架，一个数据模型和数据双向绑定的前端框架。虽然我是一个前端菜鸟，但是其实对这种mvvm双向绑定的模式接触的比较早。应该是两年前我在北京实习的时候，去听过一个关于meteor的技术沙龙，当时的知识层面还很浅，只是简单的感受了全栈开发魅力，并尝试了下，后来也是由于知识深度不够的原因放弃了meteor的学习，好吧，后面学习react也是因为学习曲线太陡也没有接着学习。

相信很多前端开发者会和我一样有一个困惑，前端涉猎的东西这么多，如何知道自己该学什么，如何去判断这个东西该不该学。作为一个前端菜鸟，这里我说下我的观点。对于新的东西，抱着谦虚的态度去学习，不要抵触，就先试试看，学学看，当你花了两周甚至两个月，还发现很难或者不喜欢或者觉得不好，这个时候可以试着放弃的，暂时的放弃，其实不用太在乎你学的东西有没有用，你学了，它就是有用的。其实很多东西我也是这么学的，比如前面说的 meteor 还有react、webgl、php、PWA等。

(/捂脸)原谅我，我是一个容易扯远的人。这里来说vue，sono的[第一个版本](https://github.com/yuwanli/sono-1.0)是用的单页面的形式，具体的大家可以看[https://github.com/yuwanli/sono-1.0](https://github.com/yuwanli/sono-1.0)，会发现，项目会比较大（零散），很碎片化，其实这个后期的维护也很麻烦，特别是又一段时间没去看过代码，然后得修改代码的时候，就想把自己打一顿（写的什么鬼）。所以之后我就开始去了解各种框架，立志把这个项目重写。直到遇到vue，完全投入学了一个都星期之后，就打算重写了，也就有了现在大家看到的这个版本。

### sono项目结构

可扫描下面二维码直接查看该项目-[sono](http://www.sono.mobi/)

![sono](readme-images/3.png "sono")

![sono](readme-images/4.jpg "sono")![sono](readme-images/5.jpg "sono")![sono](readme-images/6.jpg "sono")

#### assets
放公用的素材文件，如`reset.css`，重置样式，屏蔽差异性；`resize.js`，这里大家可以参考下[网易和淘宝移动WEB适配方案再分析](https://zhuanlan.zhihu.com/p/25216275)，这个项目用的就是同网易的那种做法，这里`win.rem = domWidth/6.4;`这里设置6.4的话，相当于640的设计稿（750的设计稿改成7.5即可），100px为1rem，这样可以方便开发；然后其余的是公用的图片文件。

#### components
这个不用太解释，这个是这种框架的精髓-组件化。组件化会使项目结构和逻辑更加清晰，方便前期的团队协作，后期项目维护。这个相对于之前的[sono1.0](https://github.com/yuwanli/sono-1.0)我是有很深刻的体会的。

#### page
这个最能说明项目结构，这里罗列了项目中会有的页面，这个当然和路由[相对应](/src/router/index.js)。结构的原则就是一个页面一个文件夹，资源就近维护。

#### router

```
export default new Router({
  mode:"history",
  linkActiveClass:"active",
  routes: [
    {
      path: '/index', component: index
    },
    // {
    //   path: '/select', component: select
    // },
    {
      path: '/free', component: free
    },
    {
      path: '/cart', component: cart
    },
    {
      path: '/edit', component: edit
    },
    {
      path: '/all', component: all
    },
    {
      path: '/logistics', component: logistics
    },
    {
      path: '/user', component: user, redirect: '/user/goods_order',
      children:[
        {
          path: '/user/goods_order', component: goods_order
        },
        {
          path: '/user/try_order', component: try_order
        }
      ]
    },
    {
      path: '/detail', component: detail
    },
    {
      path: '/addressList', component: addressList
    },
    {
      path: '/tryList', component: tryList
    },
    {
      path: '/comment', component: comment
    },
    {
      path: '/discuss', component: discuss
    },
    {
      path: '/pay', component: pay,
      children:[
        {
          path: '/pay/success', component: success
        }
      ]
    },
    {
      path: '/info', component: info,
    },
    {
      path: '/desc', component: desc,
    },
    {
      path: '/reserve', component: reserve,
    },
    {
      path: '*', redirect: '/index'
    },
  ]
})
```

这里要说的就是，该项目用的[history](https://router.vuejs.org/zh-cn/essentia这ls/history-mode.html)模式，这个需要服务器端进行路由配置；`path: '/user', component: user, redirect: '/user/goods_order',`然后这里的redirect，因为打开个人中心页面

![个人中心](readme-images/2.png "个人中心")

的时候，这个下面有两个子路由，这边需要做一个默认跳转的处理，之前没用这种方式的时候，尝试了很多方法，效果都不好，这里可以mark一下；` path: '*', redirect: '/index'`这个也是做了一个默认路由跳转的处理。

#### service
[api.js](/src/service/api.js)，这个是一个项目的配置文件，这个算是一个个人的习惯了吧，所有请求接口，以及所有的有关全局的配置（baseUrl），还有公用的处理接口回调方法。

[index.js](/src/service/index.js)，这个是项目的所有接口的集合，原则其实就是为了业务分离，页面里面不做请求的具体函数，页面里面只关注正确取到数据该做什么，这样做是方便维护。这里数据请求用的是[axios](https://github.com/mzabriskie/axios)，这个应该也是vue开发的标配(vue vuex axios vue-router)之一了吧。

还会注意到这个文件夹下有很多 mock的js文件，这个是为了项目开发初期前端模拟模拟数据请求用的，设置定时返回js数据即可，后期换成接口请求方式即可，这样可以就避免了前端等待后台接口的情况，快速高效开发。

#### store

这个的话，就要说下[vuex](http://vuex.vuejs.org/zh-cn/intro.html)，就是状态管理器。vue中父子页面之间传值和事件传递可能还容易点，兄弟页面呢，当然是有方法解决的（增加一个中间的空vue实例）。但是业务复杂度高的时候，维护和代码可读性就会变差。所以这里就有了vuex(官方推荐)。


#### utils

[main.js](/src/utils/main.js)，主要是放公共的处理函数，有关storage的处理函数，还有有关授权的处理函数等。

### 我碰到的那些坑

#### overflow-scrolling引起的bug

这个属性主要是为了h5页面有快速滚动和回弹效果，看上去像原生app，这里实现的方式，我大致描述下，是在视图层的最高层开了一层UIScrollView，这个原生层才有的，也就是上拉的时候触碰到的是原生层，所以才会有我说的那些效果，也是因为这样，这个效果是会消耗内存的。

下面说下我遇到的问题：当上拉到底的时候，很快的速度，再次拉，连续拉几下，然后再下拉，你会发现页面卡住拉不动了。这里就不展开说我试了多少种方法了，总之花了好长的时间，也因为这个问题郁闷了很久。后来通过下面这段代码解决了

```
this.$nextTick(function () {
  let wrapper = _this.$refs.scroll;
  let touchstartY;
  wrapper.addEventListener( 'touchstart', function (ev) {
	let events = ev.touches[ 0 ] || ev;
	touchstartY = events.clientY;
  }, false );

  wrapper.addEventListener( 'touchmove', function (ev) {
	let events = ev.touches[ 0 ] || ev;
	let scrollTop = wrapper.scrollTop;
	let	offsetHeight = wrapper.offsetHeight;
	let	scrollHeight = wrapper.scrollHeight;
	if ( events.clientY > touchstartY && (wrapper.scrollTop === 0) ) {
	  // 下拉时并且页面已经到顶部时
	  ev.preventDefault();
	} else if ( events.clientY < touchstartY && (scrollTop + offsetHeight >= scrollHeight) ) {
	  // 上拉时并且页面已经到底部时
	  ev.preventDefault();
	}
  }, false );
})
```

引起bug的原因也是因为UIScrollView，这个的回弹效果存在一个缓动时间(到页面完全停止)，在这个时间内再去上拉页面的时候，只会增加缓动时间，这个时候想去下拉页面的时候，由于之前的缓动时间还没完，就会发现页面卡住，过一段时间再下拉才会正常，总体给人的感觉就是不流畅很卡顿。上面代码处理的方式也是针对这个点，在最顶部和最底部的时候，做下拉和上拉的时候把默认时间禁掉，这样就不会增加前面说的缓动时间。







