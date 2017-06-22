<template>
  <transition name="foodComing">
    <div v-show="foodFlag" ref="food" class="food">
      <div class="food-content">
        <!-- 商品图片 -->
        <div class="image-header">
          <img :src="food.image">
        </div>

        <!-- 返回按钮 -->
        <div @click="hide" class="back">
          <i class="iconfont icon-back"></i>
        </div>

        <!-- 标题信息 -->
        <div class="title-content">
          <div class="name">{{food.name}}</div>

          <div class="detail">
            <div class="sellCount">月售{{food.sellCount}}份</div>
            <div class="rating">好评率{{food.rating}}%</div>
          </div>

          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>

          <!-- 购物车加减按钮 -->
          <div class="plus-wrapper">
            <plus :food="food"></plus>
          </div>

          <!-- 加入购物车按钮 -->
          <transition name="fade">
            <div @click.stop.prevent="addFirst" v-show="!food.count || food.count===0" class="buy">
              加入购物车
            </div>
          </transition>
        </div>

        <!-- 分割组件 -->
        <split v-show="food.info"></split>

        <!-- 商品介绍 -->
        <div v-show="food.info" class="introduce">
          <h1 class="title">商品介绍</h1>
          <div class="desc">{{food.info}}</div>
        </div>

        <!-- 分割组件 -->
        <split></split>

        <!-- 商品评价 -->
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <ratingsSelect @selectRating="selectRating" @toggleContent="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></ratingsSelect>

          <div class="ratings-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="ratings-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" width="12" height="12">
                </div>

                <div class="time">{{rating.rateTime | formatDate}}</div>

                <div class="text">
                  <span :class="{'icon-smile':rating.rateType===0,'icon-cry':rating.rateType===1}" class="iconfont"></span>
                  {{rating.text}}
                </div>
              </li>
            </ul>

            <!-- 无评价时的样式 -->
            <div v-show="!food.ratings || !food.ratings.length" class="no-rating">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import plus from '../plus/plus'
  import Vue from 'vue'
  import split from '../split/split'
  import ratingsSelect from '../ratingsSelect/ratingsSelect'
  // 引入非 default 时，使用花括号
  import {formatDate} from '../../common/js/date.js'

  const ALL = 2

  export default {
    props: {
      food: {
        type: Object
      }
    },
    events: {},
    methods: {
      initScroll () {
        this.scroll = new BScroll(this.$refs.food, {
          probeType: 3,
          click: true
        })
        this.scroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      // 显示商品详情页
      show () {
        this.foodFlag = true
        // 初始化 ratingsSelect 组件
        this.selectType = ALL
        this.onlyContent = false
        // 载入 better-scroll
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      // 隐藏商品详情页
      hide () {
        this.foodFlag = false
      },
      // 加入购物车
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        Vue.set(this.food, 'count', 1)
        this.$emit('add', event.target)
      },
      // 组件间通讯 ratingsSelect
      selectRating (type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent () {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      // 是否显示内容
      needShow (type, text) {
        if (this.onlyContent && !text) {
          return false
        }
        if (this.selectType === ALL) {
          return true
        } else {
          return type === this.selectType
        }
      }
    },
    computed: {},
    components: {
      plus,
      split,
      ratingsSelect
    },
    data () {
      return {
        foodFlag: false,
        // 传入 ratingsSelect 组件的数据
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created () {},
    filters: {
      // 格式化时间戳
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'YYYY-MM-DD hh:mm:ss')
      }
    }
  }
</script>

<style>
  .food {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 48px;
    width: 100%;
    background-color: #fff;
    z-index: 30;
    transform: translate3d(0, 0, 0);
    overflow: hidden;
  }
  .foodComing-enter-active {
    transition: all 0.2s linear;
  }
  .foodComing-leave-active {
    transition: all 0.2s linear;
  }
  .foodComing-enter,
  .foodComing-leave-active {
    transform: translate3d(100%, 0, 0);
  }

  /* 商品图片 */
  .food .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
  }
  .food .image-header img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /* 返回按钮 */
  .food .back {
    position: fixed;
    top: 20px;
    left: 20px;
    width: 40px;
    height: 40px;
    background-color: rgba(7, 17, 27, 0.5);
    border-radius: 50%;
  }
  .food .icon-back {
    display: block;
    padding: 10px;
    font-size: 20px;
    color: #fff;
  }

  /* 标题信息 */
  .food .title-content {
    position: relative;
    padding: 18px;
  }
  .food .title-content .name {
    line-height: 14px;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
    color: rgb(7, 17, 27);
  }
  .food .title-content .detail {
    margin-bottom: 18px;
    line-height: 25px;
    height: 10px;
    font-size: 0;
  }
  .food .title-content .sellCount {
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food .title-content .rating {
    display: inline-block;
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-left: 12px;
  }
  .food .title-content .price {
    font-weight: 700;
    line-height: 24px;
  }
  .food .title-content .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .food .title-content .price .old {
    font-size: 10px;
    text-decoration: line-through;
    color: rgb(147, 153, 159);
  }

  .food .plus-wrapper {
    position: absolute;
    right: 12px;
    bottom: 12px;
  }

  .food .buy {
    position: absolute;
    right: 18px;
    bottom: 18px;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    box-sizing: border-box;
    font-size: 10px;
    border-radius: 12px;
    color: #fff;
    background-color: rgb(0, 160, 220);
  }
  .food .fade-enter-active {
    transition: all 0.4s linear;
  }
  .food .fade-leave-active {
    transition: all 0.4s linear;
  }
  .food .fade-enter,
  .food .fade-leave-active {
    opacity: 0;
  }

  /* 商品介绍 */
  .food .introduce {
    padding: 18px;
  }
  .food .introduce .title {
    line-height: 14px;
    margin-bottom: 6px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .food .introduce .desc {
    padding: 0 8px;
    font-size: 12px;
    font-weight: 200;
    line-height: 24px;
    color: rgb(77, 85, 93);
  }

  /* 商品评价 */
  .food .ratings {
    padding-top: 18px;
  }
  .food .ratings .title {
    line-height: 14px;
    margin-left: 18px;
    font-size: 14px;
    color: rgb(7, 17, 27);
  }
  .food .ratings .ratings-wrapper {
    padding: 0 18px;
  }
  .food .ratings .ratings-wrapper .ratings-item {
    position: relative;
    padding: 16px 0;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .food .ratings .ratings-wrapper .user {
    position: absolute;
    top: 16px;
    right: 0;
    line-height: 12px;
  }
  .food .ratings .ratings-wrapper .name {
    display: inline-block;
    vertical-align: top;
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-right: 6px;
  }
  .food .ratings .ratings-wrapper .avatar {
    border-radius: 50%;
  }
  .food .ratings .ratings-wrapper .time {
    margin-bottom: 6px;
    line-height: 12px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .food .ratings .ratings-wrapper .text {
    line-height: 16px;
    font-size: 12px;
    color: rgb(7, 17, 27);
  }
  .food .ratings .ratings-wrapper .icon-smile {
    line-height: 24px;
    margin-right: 4px;
    font-size: 12px;
    color: rgb(0, 160, 220);
  }
  .food .ratings .ratings-wrapper .icon-cry {
    line-height: 24px;
    margin-right: 4px;
    font-size: 12px;
    color: rgb(147, 153,159);
  }
  .food .ratings .ratings-wrapper .no-rating {
    padding: 16px 0;
    font-size: 12px;
    color: rgb(147, 153, 159);
  }
</style>
