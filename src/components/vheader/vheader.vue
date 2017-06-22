<template>
  <!-- 头部 -->
  <div class="vheader">
    <!-- 主要内容 -->
    <div class="content-wrapper">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>

      <!-- 文字描述 -->
      <div class="content">
        <!-- 标题 -->
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>

        <!-- 描述 -->
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>

        <!-- 活动 -->
        <div v-if="seller.supports" class="supports">
          <span class="supports-icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="supports-text">{{seller.supports[0].description}}</span>
        </div>
      </div>

      <!-- 活动个数 -->
      <div @click="showDetail" v-if="seller.supports" class="supports-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="iconfont icon-more"></i>
      </div>
    </div>

    <!-- 公告 -->
    <div @click="showDetail" class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="iconfont icon-more"></i>
    </div>

    <!-- 背景 -->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <!-- 浮层详情 -->
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>

            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>

            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>

            <ul v-if="seller.supports" class="detail-supports">
              <li v-for="(item,index) in seller.supports" class="supports-item">
                <span :class="classMap[seller.supports[index].type]" class="icon"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>

            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>

            <div class="detail-text">
              <p class="text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>

        <div @click="closeDetail" class="detail-close">
          <i class="iconfont icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import star from '../star/star'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      closeDetail () {
        this.detailShow = false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      star
    }
  }
</script>

<style>
  html,body {
    line-height: 1;
    font-weight: 200;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .vheader {
    color: #fff;
    position: relative;
    overflow: hidden;
    background-color: rgba(7, 17, 27, 0.5)
  }
  .vheader .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }
  .vheader .content-wrapper .avatar {
    display: inline-block;
    font-size: 14px;
    vertical-align: top;
    border-radius: 2px;
  }
  .vheader .content-wrapper .avatar img {
    border-radius: 2px;
  }

  .vheader .content-wrapper .content {
    display: inline-block;
    margin-left: 16px;
  }
  .vheader .content .title {
    margin: 2px 0 8px 0;
  }
  .vheader .title .brand {
    width: 30px;
    height: 18px;
    display: inline-block;
    vertical-align: top;
    background-image: url('./img/brand@2x.png');
    background-size: 30px 18px;
    background-repeat: no-repeat;
  }
  @media only screen and (-webkit-min-device-picel-radio: 3) and (min-device-picel-radio: 3) {
    .vheader .title .brand {
      width: 45px;
      height: 27px;
      background-image: url('./img/brand@3x.png');
      background-size: 45px 27px;
    }
  }
  .vheader .title .name {
    margin-left: 6px;
    font-size: 16px;
    font-weight: bold;
    line-height: 18px;
  }
  .vheader .content .description {
    margin-bottom: 10px;
    font-size: 14px;
  }
  .vheader .content .supports {}
  .vheader .supports-icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .vheader .supports .decrease {
    background-image: url('./img/decrease_1@2x.png');
  }
  .vheader .supports .discount {
    background-image: url('./img/discount_1@2x.png');
  }
  .vheader .supports .guarantee {
    background-image: url('./img/guarantee_1@2x.png');
  }
  .vheader .supports .invoice {
    background-image: url('./img/invoice_1@2x.png');
  }
  .vheader .supports .special {
    background-image: url('./img/special_1@2x.png');
  }
  .vheader .supports-text {
    font-size: 10px;
    line-height: 12px;
  }

  .vheader .content-wrapper .supports-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  .vheader .supports-count .count {
    font-size: 10px;
    line-height: 24px;
  }
  .vheader .supports-count .icon-more {
    font-size: 10px;
    margin-left: 2px;
    line-height: 24px;
  }

  .vheader .bulletin-wrapper {
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    background-color: rgba(7, 17, 27, 0.2);
    text-overflow:ellipsis;
    overflow:hidden;
    white-space:nowrap;
  }
  .vheader .bulletin-title {
    display: inline-block;
    width: 22px;
    height: 12px;
    background-image: url('img/bulletin@2x.png');
    background-size: 22px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
    margin-top: 7px;
  }
  .vheader .bulletin-text {
    font-size: 10px;
    margin: 0 4px;
    vertical-align: top;
  }
  .vheader .bulletin-wrapper .icon-more {
    position: absolute;
    top: 0px;
    right: 12px;
    font-size: 10px;
  }

  .vheader .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    filter: blur(10px);
  }

  .vheader .detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(7, 17, 27, 0.8);
    z-index: 100;
    overflow: auto;
    backdrop-filter: blur(10px);
  }
  .vheader .fade-enter-active {
    transition: all .5s ease;
  }
  .vheader .fade-leave-active {
    transition: all .5s ease;
  }
  .vheader .fade-enter, .fade-leave-active {
    transition: all .5s ease;
    opacity: 0;
  }
  .vheader .detail-wrapper {
    min-height: 100%;
  }
  .vheader .detail-main {
    padding-top: 64px;
    padding-bottom: 64px;
  }

  .vheader .detail-main .name {
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 16px;
  }

  .vheader .star-wrapper {
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .vheader .detail .title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px;
  }
  .vheader .detail .line {
    flex: 1;
    position: relative;
    top: -6px;
    left: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2)
  }
  .vheader .detail .text {
    text-align: center;
    padding: 0 12px;
    font-size: 14px;
    font-weight: 600;
  }
  .vheader .detail-supports {
    width: 80%;
    margin: 0 auto;
  }

  .vheader .detail-supports .supports-item {
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .vheader .detail-supports .supports-item:last-child {
    margin-bottom: 0;
  }
  .vheader .detail-supports .icon {
    width: 16px;
    height: 16px;
    vertical-align: top;
    margin-right: 6px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .vheader .supports-item .decrease {
    background-image: url('./img/decrease_2@2x.png');
  }
  .vheader .supports-item .discount {
    background-image: url('./img/discount_2@2x.png');
  }
  .vheader .supports-item .guarantee {
    background-image: url('./img/guarantee_2@2x.png');
  }
  .vheader .supports-item .invoice {
    background-image: url('./img/invoice_2@2x.png');
  }
  .vheader .supports-item .special {
    background-image: url('./img/special_2@2x.png');
  }
  .vheader .detail-supports .text {
    display: inline-block;
    line-height: 16px;
    font-size: 12px;
    font-weight: normal;
  }

  .vheader .detail-text {
    width: 80%;
    margin: 0 auto;
  }
  /* 适配 iPhone 5 */
  @media screen and (max-width: 320px) {
    .vheader .detail-supports {
      width: 90%;
    }
    .vheader .detail-text {
      width: 90%;
      margin: 0 auto;
    }
  }
  .vheader .detail-text .text {
    font-weight: normal;
    text-align: left;
    text-indent: 2em;
    font-size: 12px;
    line-height: 24px;
    padding: 0 12px;
  }

  .vheader .detail-close {
    width: 32px;
    height: 32px;
    position: relative;
    margin: -64px auto 0;
    clear: both;
    font-size: 32px;
  }
</style>
