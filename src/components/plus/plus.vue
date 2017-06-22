<template>
  <div class="plus">
    <transition name="move">
      <div @click.stop.prevent="subClick" v-show="this.food.count>0" class="sub">
        <i class="iconfont icon-subtract"></i>
      </div>
    </transition>

    <div v-show="this.food.count>0" class="num">{{food.count}}</div>

    <div class="add">
      <i @click.stop.prevent="addClick" class="iconfont icon-add"></i>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addClick (event) {
        // 解决移动端响应两次点击事件的问题
        if (!event._constructed) {
          return
        }

        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count ++
        }

        this.$emit('add', event.target)
      },
      subClick () {
        // 解决移动端响应两次点击事件的问题
        if (!event._constructed) {
          return
        }

        if (this.food.count) {
          this.food.count --
        }
      }
    },
    computed: {
    },
    components: {
    },
    data () {
      return {
      }
    },
    created () {
      // console.log(this.food)
    }
  }
</script>

<style>
  .plus {
    font-size: 0;
  }

  .plus .sub {
    padding: 6px;
    display: inline-block;
  }
  .plus .sub .icon-subtract {
    font-size: 20px;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    background-color: #0087e2;
  }

  .plus .num {
    font-size: 16px;
    line-height: 16px;
    padding: 6px;
    display: inline-block;
    text-align: center;
    color: rgb(147, 153, 159)
  }

  .plus .add {
    padding: 6px;
    display: inline-block;
  }
  .plus .add .icon-add {
    font-size: 20px;
    line-height: 20px;
    border-radius: 50%;
    color: #fff;
    background-color: #0087e2;
  }

  .plus .move-enter-active {
    animation: move-in .5s;
  }
  .plus .move-leave-active {
    animation: move-out .5s;
  }
  @keyframes move-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes move-out {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(0);
    }
  }
</style>
