<template>
  <div class="seller" ref="seller">
    <div class="seller-wrapper">
      <!-- 顶部概要信息 -->
      <div class="top">
        <div class="collect">
          <div class="name">{{seller.name}}</div>

          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
          </div>

          <div class="sellCount">月售{{seller.sellCount}}单</div>

          <div @click="isFavorites" class="collect-icon">
            <i :class="{'icon-favoritesfilling':favorites}" class="iconfont icon-favorite"></i>
            <div class="text">{{favoritesText}}</div>
          </div>
        </div>

        <div class="param">
          <div class="left">
            <span class="text">起送价</span>
            <span class="price"><span class="num">{{seller.minPrice}}</span>元</span>
          </div>

          <div class="mid">
            <span class="text">商家配送</span>
            <span class="price"><span class="num">{{seller.deliveryPrice}}</span>元</span>
          </div>

          <div class="right">
            <span class="text">平均配送时间</span>
            <span class="price"><span class="num">{{seller.deliveryTime}}</span>分钟</span>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <split></split>

      <!-- 公告与活动 -->
      <div class="notice">
        <h1 class="title">公告与活动</h1>
        <div class="text">{{seller.bulletin}}</div>

        <ul v-if="seller.supports">
          <li v-for="support in seller.supports" class="support">
            <span :class="classMap[support.type]" class="icon"></span>
            <span class="description">{{support.description}}</span>
          </li>
        </ul>
      </div>

      <!-- 分割线 -->
      <split></split>

      <!-- 商家实景 -->
      <div class="photo">
        <h1 class="title">商家实景</h1>

        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="pic in seller.pics" class="pic-item">
              <img :src="pic" width="120" height="90" class="pic">
            </li>
          </ul>
        </div>
      </div>

      <!-- 分割线 -->
      <split></split>

      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li v-for="item in seller.infos" class="item">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'
  import {savaToLocal, getFromLocal} from '../../common/js/store.js'

  export default {
    props: {
      seller: {}
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this.initScroll()
          this.initPics()
        })
      }
    },
    events: {},
    filters: {},
    methods: {
      initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      // 橫向滾動的圖片
      initPics () {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      },
      isFavorites (event) {
        if (!event._constructed) {
          return
        }
        this.favorites = !this.favorites
        // 使用 localstorage 缓存
        // window.localStorage.setItem('id', this.favorites)
        // let getId = window.localStorage.getItem('id')
        // console.log(getId)

        // 上面的方法不使用于多商家

        savaToLocal(this.seller.id, 'favorites', this.favorites)
        // console.log(localStorage.__seller__.this.seller.id.favorites)
      }
    },
    // ready 替换，使用新的 mounted 钩子函数替代。
    mounted () {
      this.$nextTick(() => {
        this.initScroll()
        this.initPics()
      })
    },
    computed: {
      // 已收藏、未收藏
      favoritesText () {
        return this.favorites === true ? '已收藏' : '未收藏'
      }
    },
    components: {
      star,
      split
    },
    data () {
      return {
        favorites: (() => {
          return getFromLocal(this.seller.id, 'favorites', false)
        })()
      }
    },
    created () {
      // console.log(this.seller)
      // seller 是异步获取的，页面初始化时内容不会被撑开，Better-Scroll 就不会生效
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
</script>

<style lang="sass">
  .seller
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-wrapper
      .top
        padding: 18px
        .collect
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          padding-bottom: 18px
          .name
            font-size: 16px
            color: rgb(7, 17, 27)
            line-height: 14px
            margin-bottom: 15px
          .star-wrapper
            display: inline-block
            margin-right: 12px
            .star
              display: inline-block
            .ratingCount
              display: inline-block
              font-size: 14px
              color: rgb(7, 17, 27)
              line-height: 14px
          .sellCount
            display: inline-block
            font-size: 14px
            color: rgb(7, 17, 27)
            line-height: 14px
          .collect-icon
            display: inline-block
            position: absolute
            top: 18px
            right: 24px
            .icon-favorite
              font-size: 24px
              color: rgb(240, 20, 20)
              display: inline-block
              margin-left: 5px
              margin-bottom: 10px
              &.icon-favoritesfilling
            .text
              font-size: 10px
              line-height: 10px
              color: rgb(77, 85, 93)
        .param
          padding-top: 18px
          display: flex
          .left
            flex: 1
            text-align: center
            display: inline-block
            border-right: 1px solid rgba(7, 17, 27, 0.1)
            .text
              display: block
              margin-top: 18px
              margin-bottom: 4px
              color: rgb(147, 153, 159)
              font-size: 10px
              line-height: 10px
            .price
              font-size: 10px
              color: rgb(7, 17, 27)
              font-weight: 200
              line-height: 24px
              margin-bottom: 18px
              .num
                font-size: 24px
          .mid
            flex: 1
            text-align: center
            display: inline-block
            border-right: 1px solid rgba(7, 17, 27, 0.1)
            .text
              display: block
              margin-top: 18px
              margin-bottom: 4px
              color: rgb(147, 153, 159)
              font-size: 10px
              line-height: 10px
            .price
              font-size: 10px
              color: rgb(7, 17, 27)
              font-weight: 200
              line-height: 24px
              margin-bottom: 18px
              .num
                font-size: 24px
          .right
            flex: 1
            text-align: center
            display: inline-block
            .text
              display: block
              margin-top: 18px
              margin-bottom: 4px
              color: rgb(147, 153, 159)
              font-size: 10px
              line-height: 10px
            .price
              font-size: 10px
              color: rgb(7, 17, 27)
              font-weight: 200
              line-height: 24px
              margin-bottom: 18px
              .num
                font-size: 24px
      .notice
        padding: 18px 18px 0 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          margin-bottom: 12px
          line-height: 14px
        .text
          padding: 8px 0 0 12px
          font-size: 12px
          line-height: 24px
          font-weight: 200
          color: rgb(240, 20, 20)
          padding-bottom: 16px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .support
          padding: 16px 12px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          .icon
            display: inline-block;
            width: 18px
            height: 18px
            margin-right: 4px
            background-size: 18px 18px
            background-repeat: no-repeat
            vertical-align: top
            &.decrease
              background-image: url('./img/decrease_1@2x.png')
            &.discount
              background-image: url('./img/discount_1@2x.png')
            &.guarantee
              background-image: url('./img/guarantee_1@2x.png')
            &.invoice
              background-image: url('./img/invoice_1@2x.png')
            &.special
              background-image: url('./img/special_1@2x.png')
          .description
            font-size: 12px
            line-height: 16px
            font-weight: 200
            color: rgb(7, 17, 27)
      .photo
        padding: 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          margin-bottom: 12px
          line-height: 14px
        .pic-wrapper
          width: 100%
          overflow: hidden
          white-space: nowrap
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 6px
              width: 120px
              height: 90px
              .pic
                border-radius: 3px
      .info
        padding: 18px 18px 0 18px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          margin-bottom: 12px
          line-height: 14px
        .item
          font-size: 12px
          line-height: 16px
          font-weight: 200
          color: rgb(7, 17, 27)
          padding: 16px 12px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-bottom: 0px solid rgba(7, 17, 27, 0.1)
</style>
