<template>
    <div id='tmpl'>
        <!--1.0 利用mint-ui的mt-swipe组件实现轮播图-->
        <silder :imgs='list'></silder>
    
        <!--2.0 利用MUI的九宫格组件实现实现导航区域-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/news/newslist">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/photo/photolist">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/goods/goodslist">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/feedback">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/video">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/callme">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </router-link>
                </li>
            </ul>
        </div>
    
    </div>
</template>

<script>
// 使用 mint-ui 中的 Toast组件实现弹窗效果
import { Toast } from 'mint-ui';

import common from '../kits/common.js'

import silder from '../components/subcom/silder.vue'

export default {
    components:{
        silder
    },
    data() {
        return {
            list: []
        }
    },
    // 页面中的data和methods对象创建完毕后会自动调用created方法
    created() {
        this.getImgs();
        console.log(this.$store.state.username);
    },
    methods: {
        getImgs() {
            // 实现轮播组件中的数据请求
            // 1.0 确定URL
            const url = common.apidomain + '/api/getlunbo';
            // 2.0 发送get请求 $http.get()
            this.$http.get(url).then(function (response) {
                const data = response.body;
                // 错误处理
                if (data.status != 0) {
                    Toast(data.message);
                    return;
                }

                // 正常逻辑: 将数据赋值给list
                this.list = data.message;
            })
        }
    }
}
</script>

<style scoped>
.mint-swipe {
    height: 300px;
}

.mint-swipe-item {
    background-color: red;
    width: 100%;
    height: 300px;
}

.mint-swipe-item img {
    width: 100%;
    height: 300px;
    display: block;
}

.mui-content,
.mui-content ul {
    background-color: #fff;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border-right: 0px;
    border-bottom: 0px;
}

.mui-grid-view.mui-grid-9 {
    border-top: 0px;
    border-left: 0px;
}

.mui-icon-home:before,
.mui-icon-email:before,
.mui-icon-chatbubble:before,
.mui-icon-location:before,
.mui-icon-search:before,
.mui-icon-phone:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-repeat: round;
}

.mui-icon-home:before {
    background-image: url(../../statics/imgs/1.png);
}

.mui-icon-email:before {
    background-image: url(../../statics/imgs/2.png);
}

.mui-icon-chatbubble:before {
    background-image: url(../../statics/imgs/3.png);
}

.mui-icon-location:before {
    background-image: url(../../statics/imgs/4.png);
}

.mui-icon-search:before {
    background-image: url(../../statics/imgs/5.png);
}

.mui-icon-phone:before {
    background-image: url(../../statics/imgs/6.png);
}
</style>