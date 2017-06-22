<template>
  <div class="ratingsSelect">
    <div class="type">
      <span @click="select(2,$event)" :class="{'active':selectType===2}" class="block positive">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>

      <span @click="select(0,$event)" :class="{'active':selectType===0}" class="block positive">
        {{desc.positive}}<span class="count">{{positiveLength.length}}</span>
      </span>

      <span @click="select(1,$event)" :class="{'active':selectType===1}" class="block negative">
        {{desc.negative}}<span class="count">{{negativeLength.length}}</span>
      </span>
    </div>

    <div @click="toggleContent" :class="{'on':onlyContent===true}" class="switch">
      <i class="iconfont icon-selected"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  // 正面评价、负面评价、所有
  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      // 记录所有评价数组
      ratings: {
        type: Array,
        default () {
          return []
        }
      },
      // 选择哪种评价
      selectType: {
        type: Number,
        default: ALL
      },
      // 只显示有内容的评价(默认显示全部)
      onlyContent: {
        type: Boolean,
        default: false
      },
      // 界面组件文字(外面可以传入)
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    events: {},
    methods: {
      select (type, event) {
        if (!event._constructed) {
          return
        }
        // this.selectType = type
        // 与父组件通讯
        // this.$dispatch('ratingtype.select', type)
        this.$emit('selectRating', type)
      },
      toggleContent (event) {
        if (!event._constructed) {
          return
        }
        // this.onlyContent = !this.onlyContent
        // this.$dispatch('content.toggle', this.onlyContent)
        this.$emit('toggleContent')
      }
    },
    computed: {
      positiveLength () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE
        })
      },
      negativeLength () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE
        })
      }
    },
    components: {},
    data () {
      return {}
    },
    created () {}
  }
</script>

<style>
  .ratingsSelect {}
  .ratingsSelect .type {
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
  }
  .ratingsSelect .type .block {
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 2px;
    font-size: 12px;
    color: rgb(77, 85, 93);
    line-height: 16px;
  }
  .ratingsSelect .type .block.active {
    color: #fff;
  }
  .ratingsSelect .type .positive {
    background-color: rgba(0, 160, 220, 0.2);
  }
  .ratingsSelect .type .positive.active {
    background-color: rgba(0, 160, 220, 1.0);
  }
  .ratingsSelect .type .negative {
    background-color: rgba(77, 85, 93, 0.2);
  }
  .ratingsSelect .type .negative.active {
    background-color: rgba(77, 85, 93, 1.0);
  }
  .ratingsSelect .type .count {
    font-size: 8px;
    margin-left: 2px;
  }

  .ratingsSelect .switch {
    padding: 12px 18px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .ratingsSelect .switch .icon-selected {
    margin-right: 4px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #ccc;
    background-color: #fff;
    color: #fff;
    border-radius: 50%;
    line-height: 16px;
  }
  .ratingsSelect .switch.on .icon-selected {
    background-color: #00c85b;
    color: #fff;
  }
  .ratingsSelect .switch .text {
    font-size: 14px;
  }
</style>
