<template>
  <div>
    <vheader :seller="seller"></vheader>

    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratingsBox">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <!-- 非活动组件将被缓存！ -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vheader from './components/vheader/vheader'
  import {urlParse} from './common/js/util.js'

  const ERR_OK = 0

  export default {
    data () {
      return {
        seller: {
          // 从 URL 中拿到不同商家的 ID，并赋值 给 seller.id
          // 后端根据不同的商家id，去查询不同的商家数据渲染到前台
          id: (() => {
            let queryParam = urlParse()
            // console.log(queryParam)
            // Object {id: "123", key: "vaule"}
            return queryParam.id
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          // this.seller = response.data
          // console.log(this.seller.id) // undefined

          // 给对象添加属性
          this.seller = Object.assign({}, this.seller, response.data)
          // console.log(this.seller.id) // 123
        }
      }, response => {
        // error callback
      })
    },
    components: {
      vheader
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    /* border-bottom: 1px solid rgba(7, 17, 27, 0.1); */
  }
  /* 移动端 1px 边框问题 */
  .tab::after {
    position: absolute;
    display: block;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    content: ' ';
  }
  .tab-item {
    flex: 1;
  }
  .tab-item a {
    display: block;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }
  .tab-item a.router-link-active {
    color: rgb(240, 20, 20);
  }
</style>
