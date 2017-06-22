<template>
  <div class="shopcart-box">
    <!-- 购物车 -->
    <div class="shopcart">
      <div class="content">
        <div @click="toggleList" class="content-left">
          <!-- 左侧购物车小图标 -->
          <div class="logo-wrapper">
            <div :class="{'logoLight': totalCount>0}" class="logo">
              <i :class="{'logoLight': totalCount>0}" class="iconfont icon-cart"></i>
            </div>
            <div v-show="totalCount>0" class="totalCount">{{totalCount}}</div>
          </div>

          <div :class="{'priceLight':totalCount>0}" class="price">¥{{totalPrice}}</div>

          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>

        <div @click="pay" class="content-right">
          <div :class="{'payLight':this.totalPrice>=this.minPrice}" class="pay">{{payDesc}}</div>
        </div>
      </div>

      <!-- 飞行小球 -->
      <div class="ball-content">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 购物车列表 -->
      <transition name="fold">
        <div v-show="listShow" class="shopcart-list">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span @click="empty" class="empty">清空</span>
          </div>

          <div ref="listContent" class="list-content">
            <ul>
              <li v-for="food in selectFoods" class="food">
                <span class="name">{{food.name}}</span>

                <div class="price">
                  <span>¥{{food.price*food.count}}</span>
                </div>

                <div class="plus-wrapper">
                  <plus :food="food"></plus>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>

    <!-- 模糊背景 -->
    <transition name="fade">
      <div v-show="listShow" @click="hideList" class="list-mask"></div>
    </transition>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import plus from '../plus/plus'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 10,
            count: 0
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    methods: {
      drop (el) {
        for (var i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      beforeDrop (el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping (el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop (el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      },
      // 购物车列表折叠函数
      toggleList () {
        if (this.totalCount === 0) {
          return
        }
        this.fold = !this.fold
      },
      empty () {
        for (var i = 0; i < this.selectFoods.length; i++) {
          this.selectFoods[i].count = 0
        }
      },
      // 关闭购物车列表
      hideList () {
        this.fold = true
      },
      // 去结算
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        alert(`需支付${this.totalPrice}元`)
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差¥${this.minPrice - this.totalPrice}起送`
        } else {
          return '去结算'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        if (!this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return !this.fold
      }
    },
    components: {
      plus
    },
    data () {
      return {
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        fold: true // 购物车列表默认折叠
      }
    },
    created () {
    }
  }
</script>

<style>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 48px;
    z-index: 50;
  }
  .shopcart .content {
    display: flex;
    width: 100%;
    height: 48px;
    font-size: 0;
    background-color: #141d27;
  }
  .shopcart .content-left {
    flex: 1;
  }
  .shopcart .content-left .logo-wrapper {
    display: inline-block;
    vertical-align: top;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #141d27;
    text-align: center;
  }
  .shopcart .content-left .logo-wrapper .logo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2b343c;
  }
  .shopcart .content-left .logo-wrapper .logo .icon-cart {
    font-size: 24px;
    line-height: 44px;
    color: #80858a;
  }
  .shopcart .content-left .logo-wrapper .logoLight {
    background-color: rgb(0, 160, 220);
  }
  .shopcart .content-left .logo-wrapper .logoLight .icon-cart {
    color: #fff;
  }
  .shopcart .content-left .logo-wrapper .totalCount {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 16px;
    line-height: 16px;
    border-radius: 12px 12px;
    font-size: 9px;
    font-weight: 700;
    color: #fff;
    background-color: rgb(240, 20, 20);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
  }
  .shopcart .content-left .price {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin-top: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
  }
  .shopcart .content-left .priceLight {
    color: #fff;
  }
  .shopcart .content-left .desc {
    display: inline-block;
    vertical-align: top;
    line-height: 24px;
    margin: 12px 0 0 12px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 10px;
  }

  .shopcart .content-right {
    flex: 0 0 105px;
    width: 105px;
    text-align: center;
  }
  /* 适配 iPhone 5 */
  @media screen and (max-width: 320px) {
    .shopcart .content-right {
      flex: 0 0 80px;
      width: 80px;
      text-align: center;
    }
  }
  .shopcart .content-right .pay {
    height: 48px;
    line-height: 48px;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    background-color: #2b333b;
  }
  .shopcart .content-right .payLight {
    background-color: #00b43c;
    color: #fff;
  }

/* 飞行小球 */
  .shopcart .ball-content {}
  .shopcart .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
  .shopcart .inner {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(0, 160, 220);
    transition: all 0.4s linear;
  }

/* 购物车列表 */
  .shopcart .shopcart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
  }
  .shopcart .fold-enter-active {
    transition: all 0.5s;
  }
  .shopcart .fold-leave-active {
    transition: all 0.5s;
    transform: translate3d(0, 100%, 0);
  }
  .shopcart .fold-enter, .fold-leave-active {
    transform: translate3d(0, 0, 0);
  }

  .shopcart .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background-color: #f3f5f7;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .shopcart .list-header .title {
    float: left;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .shopcart .list-header .empty {
    float: right;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }

  .shopcart .list-content {
    max-height: 217px;
    padding: 0 18px;
    background-color: #fff;
    overflow: hidden;
  }
  .shopcart .list-content .food {
    position: relative;
    padding: 12px 0;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .shopcart .list-content .food .name {
    line-height: 24px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .shopcart .list-content .food .price {
    position: absolute;
    right: 90px;
    bottom: 12px;
    line-height: 24px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(240, 20, 20);
  }
  .shopcart .list-content .food .plus-wrapper {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

/* 模糊背景 */
  .shopcart-box .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    backdrop-filter: blur(10px);
    background-color: rgba(7, 17, 27, 0.6);
  }
  .shopcart-box .fade-enter-active {
    transition: all .5s;
  }
  .shopcart-box .fade-leave-active {
    transition: all .5s;
  }
  .shopcart-box .fade-enter,
  .shopcart-box .fade-leave-active {
    transition: all .5s;
    background: rgba(7, 17, 27, 0);
    opacity: 0;
  }
</style>
