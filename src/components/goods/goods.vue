<template>
  <div>
    <div class="goods">
      <!-- 左侧菜单 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="select(index,$event)">
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>

      <!-- 右侧食物列表 -->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" ref="foodList" class="foods-list foods-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="foods-item">
                <div class="icon">
                  <img :src="food.icon" width="57" height="57">
                </div>

                <div class="content">
                  <h2 class="name">{{food.name}}</h2>

                  <p class="desc">{{food.description}}</p>

                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>

                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>

                  <div class="plus-wrapper">
                    <plus :food="food" @add="addFood"></plus>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <shopcart ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>

    <!-- 食品详情页 -->
    <food @add="addFood" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import shopcart from '../shopcart/shopcart'
  import plus from '../plus/plus'
  import food from '../food/food'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {} // 当前选中的食品
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    methods: {
      initScroll () {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      calcHeight () {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      select (index, event) {
        // 解决移动端响应两次点击事件的问题
        if (!event._constructed) {
          return
        }

        let foodList = this.$refs.foodsWrapper.getElementsByClassName('foods-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      addFood (target) {
        this._drop(target)
      },
      _drop (target) {
        // 异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target)
        })
      },
      // 进入食品详情页
      selectFood (food, event) {
        // 解决移动端响应两次点击事件的问题
        if (!event._constructed) {
          return
        }
        this.selectedFood = food
        this.$refs.food.show()
      }
    },
    created () {
      this.$http.get('/api/goods').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          // console.log(this.goods)
          this.$nextTick(() => {
            this.initScroll()
            this.calcHeight()
          })
        }
      }, response => {
        // error callback
      })

      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    components: {
      shopcart,
      plus,
      food
    }
  }
</script>

<style>
  .goods {
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    display: flex;
    overflow: hidden;
  }

  .goods .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background-color: #f3f5f7;
  }
  .goods .menu-item {
    display: table;
    width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 12px;
  }
  .goods .menu-wrapper .current {
    position: relative;
    margin-top: -1px;
    background-color: #fff;
    font-weight: 700;
    z-index: 10;
  }
  .goods .menu-wrapper .current .text {
    border-bottom: 1px solid #f3f5f7;
  }
  .goods .menu-item .text {
    font-size: 12px;
    display: table-cell;
    vertical-align: middle;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .goods .menu-item:last-child .text {
    border-bottom: 1px solid #f3f5f7;
  }
  .goods .menu-item .text .icon {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 2px;
    background-size: 12px 12px;
    background-repeat: no-repeat;
    vertical-align: top;
  }
  .goods .menu-item .decrease {
    background-image: url('./img/decrease_3@2x.png');
  }
  .goods .menu-item .discount {
    background-image: url('./img/discount_3@2x.png');
  }
  .goods .menu-item .guarantee {
    background-image: url('./img/guarantee_3@2x.png');
  }
  .goods .menu-item .invoice {
    background-image: url('./img/invoice_3@2x.png');
  }
  .goods .menu-item .special {
    background-image: url('./img/special_3@2x.png');
  }

  .goods .foods-wrapper {
    flex: 1;
  }
  .goods .foods-list {}
  .goods .foods-list .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background-color: #f3f5f7;
  }
  .goods .foods-item {
    position: relative;
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .foods-item:last-child {
    border-bottom: 1px solid #fff;
  }
  .goods .foods-item .icon {
    flex: 0 0 57px;
    width: 57px;
    height: 57px;
    margin-right: 10px;
  }
  .foods-item .content {
    flex: 1;
  }
  .goods .foods-item .name {
    font-size: 14px;
    margin: 2px 0 8px 0;
    height: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
  }
  .goods .foods-item .desc {
    margin-bottom: 8px;
    line-height: 10px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .goods .foods-item .extra {
    margin-bottom: 8px;
    line-height: 12px;
    font-size: 0;
    color: rgb(147, 153, 159);
  }
  .goods .foods-item .extra .count {
    font-size: 10px;
    margin-right: 12px;
  }
  .goods .foods-item .extra .rating {
    font-size: 10px;
  }

  .goods .foods-item .price {
    font-weight: 700;
    line-height: 24px;
  }
  .goods .foods-item .price .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }
  .goods .foods-item .price .old {
    font-size: 10px;
    text-decoration: line-through;
    color: rgb(147, 153, 159);
  }

  .goods .foods-item .plus-wrapper {
    position: absolute;
    right: 0;
    bottom: 13px;
  }
</style>
