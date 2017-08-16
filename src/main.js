// 1.0 导入vue核心包
import Vue from 'vue';

// 2.0 导入App.vue的vue对象
import App from './App.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

// 3.0.2 导入路由规则对应的组件对象
import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
import car from './components/shopcar/car.vue';
import login from './components/account/login.vue';
import userinfo from './components/account/userinfo.vue';

// 导入获取cookie的方法
import {getCookie} from './kits/cookie.js';

// 3.0.2 定义路由规则
var router1 = new vueRouter({
	linkActiveClass: 'mui-active',  //改变路由激活时的class名称
	routes: [
		{ path: '/', redirect: '/home' },// 默认进入home页面(将跟页面重定向到首页home)
		{ path: '/home', component: home },
		{ path: '/shopcar', component: shopcar },
		{ path: '/news/newslist', component: newslist },
		{ path: '/news/newsinfo/:id', component: newsinfo },
		{ path: '/photo/photolist', component: photolist },
		{ path: '/photo/photoinfo/:id', component: photoinfo },
		{ path: '/goods/goodslist', component: goodslist },
		{ path: '/goods/goodsinfo/:id', component: goodsinfo },
		{ path: '/goods/goodsdesc/:id', component: goodsdesc },
		{ path: '/goods/goodscomment/:id', component: goodscomment },
		{ path: '/shopcar/car', component: car },
		{ path: '/login', component: login },
		{
			path: '/userinfo',
			component: userinfo,
			meta: {
				requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
			},
			beforeEnter: (to, from, next) => {
				if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
					if (getCookie('session')) {  // 通过cookie获取当前的token是否存在
						next();
					}
					else {
						next({
							path: '/login',
							query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
						})
					}
				}
				else {
					next();
				}
			}
		}
	]
});

// 导入状态管理vuex
import Vuex from 'vuex';
// 绑定到Vue上
Vue.use(Vuex);

var store = new Vuex.Store({
	// state类似vue实例中的data 用来存放数据
	state: {
		// 可以设置一些需要全局使用的数据
		username: 'zxx'
	},
	// mutations类似vue实例中的methods
	mutations: {
		// 用来处理数据 比喻数据删除更新等操作
		update(state, name) {
			state.username = name;
		}
	}
})

// 4.0 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);

// 5.0 注册mui的css样式
import '../statics/mui/css/mui.css';

// 6.0 导入一个当前系统的全局基本样式
import '../statics/css/site.css';

// 7.0 将vue-resource在vue中绑定，自动在vue实例对象上注入一个$http对象就可以使用ajax方法请求数据
import vueResource from 'vue-resource';
Vue.use(vueResource);

// 8.0 定义一个全局过滤器实现日期格式化
import moment from 'moment';
Vue.filter('datefmt', function (input, fmtstring) {
	// 使用momentjs这个日期格式化类库实现日期的格式化功能
	return moment(input).format(fmtstring);
})

// 9.0 使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
// 利用Vue对象进行解析渲染
new Vue({
	el: '#app',
	// 使用路由对象实例
	router: router1,
	// 使用vuex
	store,
	// render:function(create){create(App)} //es5的写法
	render: c => c(App)  // es6的函数写法 =>：goes to
});