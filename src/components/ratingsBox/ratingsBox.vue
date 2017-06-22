<template>
  <div class="ratingsBox" ref="ratingsBox">
    <div class="ratingsBox-content">
      <!-- 评分部分 -->
      <div class="grade">
        <!-- 左侧 -->
        <div class="all">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>

        <!-- 右侧 -->
        <div class="desc">
          <div class="serviceScore">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>

          <div class="score">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.score"></star>
            <span class="score">{{seller.score}}</span>
          </div>

          <div class="deliveryTime">
            <span class="title">送达时间</span>
            <span class="score">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <!-- 分割组件 -->
      <split></split>

      <!-- 评论类型组件 -->
      <ratingsSelect @selectRating="selectRating" @toggleContent="toggleContent" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></ratingsSelect>
      <div class="ratings-wrapper">
        <ul>
          <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="ratings-item">
            <!-- 左侧图像 -->
            <div class="avatar-wrapper">
              <img :src="rating.avatar" class="avatar" width="28" height="28">
            </div>

            <!-- 右侧内容 -->
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span v-show="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{rating.text}}</div>

              <!-- 底部推荐 -->
              <div v-show="rating.recommend && rating.recommend.length" class="recommend">
                <span :class="{'icon-smile':rating.rateType===0,'icon-cry':rating.rateType===1}" class="iconfont"></span>
                <span v-for="item in rating.recommend" class="item">{{item}}</span>
              </div>

              <!-- 时间 -->
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>

        <!-- 无评价时的样式 -->
        <div v-show="!ratings || !ratings.length" class="no-rating">暂无评价</div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ratingsSelect from '../ratingsSelect/ratingsSelect'
  import split from '../split/split'
  import star from '../star/star'
  // 引入非 default 时，使用花括号
  import {formatDate} from '../../common/js/date.js'

  const ERR_OK = 0
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    events: {},
    filters: {
      // 格式化时间戳
      formatDate (time) {
        let date = new Date(time)
        return formatDate(date, 'YYYY-MM-DD hh:mm:ss')
      }
    },
    methods: {
      initScroll () {
        this.scroll = new BScroll(this.$refs.ratingsBox, {
          click: true
        })
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
      split,
      ratingsSelect,
      star
    },
    data () {
      return {
        // 传入 ratingsSelect 组件的数据
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratingsBox, {
              click: true
            })
          })
        }
      }, response => {
        // error callback
      })
    }
  }
</script>

<style lang="scss">
  .ratingsBox {
    position: absolute;
    top: 174px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .ratingsBox-content {
      .grade {
        display: flex;
        padding: 18px 0;
        .all {
          flex: 0 0 137px;
          width: 137px;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          text-align: center;
          padding: 6px 0;
          /* 适配 iPhone 5 */
          @media screen and (max-width: 360px) {
            flex: 0 0 120px;
            width: 120px;
          }
          .score {
            line-height: 24px;
            font-size: 24px;
            color: rgb(255, 153, 0);
            margin-bottom: 6px;
          }
          .title {
            line-height: 12px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            margin-bottom: 8px;
          }
          .rankRate {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .desc {
          flex: 1;
          padding: 6px 0 6px 24px;
          /* 适配 iPhone 5 */
          @media screen and (max-width: 360px) {
            padding: 5px;
          }
          .serviceScore {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 0;
            .title {
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .star {
              display: inline-block;
              vertical-align: top;
              margin: 0 12px;
            }
            .score {
              font-size: 12px;
              color: rgb(255, 153, 0);
            }
          }
          .score {
            margin-bottom: 8px;
            line-height: 18px;
            font-size: 0;
            .title {
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .star {
              display: inline-block;
              vertical-align: top;
              margin: 0 12px;
            }
            .score {
              font-size: 12px;
              color: rgb(255, 153, 0);
            }
          }
          .deliveryTime {
            line-height: 18px;
            font-size: 0;
            .title {
              font-size: 12px;
              color: rgb(7, 17, 27);
            }
            .score {
              font-size: 12px;
              margin: 0 12px;
              color: rgb(147, 153, 159);
            }
          }
        }
      }
      .ratings-wrapper {
        padding: 0 18px;
        .ratings-item {
          display: flex;
          padding: 18px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          .avatar-wrapper {
            flex: 0 0 28px;
            width: 28px;
            margin-right: 12px;
            .avatar {
              border-radius: 50%;
            }
          }
          .content {
            position: relative;
            flex: 1;
            .name {
              font-size: 10px;
              line-height: 12px;
              color: rgb(7, 17, 27);
              margin-bottom: 4px;
            }
            .star-wrapper {
              margin-bottom: 4px;
              font-size: 0;
              .star {
                display: inline-block;
                vertical-align: top;
                margin-right: 6px;
              }
              .deliveryTime {
                display: inline-block;
                vertical-align: top;
                font-size: 10px;
                color: rgb(147, 153, 159);
              }
            }
            .text {
              line-height: 18px;
              font-size: 12px;
              color: rgb(7, 17, 27);
              margin-bottom: 8px;
            }
            .recommend {
              line-height: 16px;
              .iconfont {
                display: inline-block;
                margin: 0 8px 4px 0;
                font-size: 9px;
              }
              .icon-smile {
                color: rgb(0, 160, 220);
              }
              .icon-cry {
                color: rgb(147, 153,159);
              }
              .item {
                font-size: 10px;
                padding: 0 6px;
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 5px;
                color: rgb(147, 153,159);
                background-color: #fff;
                margin-right: 4px;
              }
            }
            .time {
              position: absolute;
              top: 0;
              right: 0;
              line-height: 12px;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
        }
        .no-rating {
          padding: 16px 0;
          font-size: 14px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
</style>
