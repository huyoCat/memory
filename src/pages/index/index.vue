<template>
  <view class="h-100vh overflow-hidden bg-#F5F7F8">
    <view class="flex justify-end mt-30rpx p-30rpx items-center">
      <view>
        <span class="iconfont icon-shijian text-50rpx c-#c4da93"></span>
      </view>
    </view>
    <view class="m-20rpx p-20rpx">
      <view
        class="set-top flex flex-col justify-between bg-#fff"
        v-if="memoryList.length > 0">
        <view
          class="bg-#c4da93 text-30rpx px-20rpx c-#fff h-70rpx line-height-70rpx box-border">
          {{
            memoryList[0].opt === "pass"
              ? `${memoryList[0].title}已经`
              : `距离${memoryList[0].title}还有`
          }}
        </view>
        <view
          class="text-130rpx font-bold flex justify-center items-center box-border">
          300
        </view>
        <view
          class="h-70rpx line-height-70rpx text-center c-#c4da93 box-border text-20rpx">
          {{ now }}
        </view>
      </view>

      <view v-else class="set-top c-#fff text-40rpx relative">
        <view class="w-100% h-100% absolute">
          <image
            src="../../static/pic/14.png"
            class="w-100% h-100%"
            mode="aspectFill"></image>
        </view>

        <view class="z-100 relative empty p-40rpx text-50rpx font-bold">
          <view>Remember</view>
          <view>Your First Moment</view>
          <!-- <view>First Moment</view> -->
        </view>
      </view>
      <view class="mt-40rpx">
        <view
          v-for="(item, index) in memoryList"
          :key="item.id"
          v-show="index !== 1"
          class="flex justify-between my-20rpx box-border b-rd-14rpx overflow-hidden c-#121212 shadow bg-#fff">
          <view
            v-if="item.opt === 'pass'"
            class="p-25rpx box-border flex-grow-1 w-0">
            {{ item.title }}已经
          </view>
          <view v-else class="p-25rpx box-border flex-grow-1">
            距离{{ item.title }}还有
          </view>
          <view
            class="w-150rpx p-25rpx font-bold c-#fff flex items-center justify-center"
            :class="[item.opt === 'pass' ? 'bg-#fee2b5' : 'bg-#e1ecc8']">
            {{ item.days }}天
          </view>
        </view>
      </view>
    </view>
    <view></view>

    <!-- 固定+号 #fee2b5  #ccdacc  #cce5e3  #efdff7-->
    <span
      @click="addMemory"
      class="fixed iconfont icon-zengjia text-40rpx bg-#c4da93 c-#fff b-rd-50% p-15rpx right-60rpx bottom-200rpx"></span>
  </view>
</template>

<script setup>
import { ref } from "vue"

function addMemory(params) {
  uni.navigateTo({
    url: "../add/add",
  })
}
let now = ref(new Date())
let memoryList = ref([
  {
    id: 1,
    title:
      "eqwewqdsadwww呜呜呜呜呜呜呜呜呜呜呜问问呜呜呜呜无无无无无无无无无无无无无无无",
    date: "2023-11-06",
    days: "100",
    opt: "pass",
  },
  {
    id: 2,
    title: "eqwewqdsad",
    date: "2024-11-06",
    days: "100",
    opt: "future",
  },
  {
    id: 3,
    title: "eqwewqdsad",
    date: "2023-07-06",
    days: "100",
    opt: "pass",
  },
  {
    id: 4,
    title: "eqwewqdsad",
    date: "2023-12-06",
    days: "100",
    opt: "future",
  },
])

try {
  const value = uni.getStorageSync("memoryList") || []
  if (value) {
    console.log(value)
    memoryList = [].concat(value)
    // memoryList = [...value]
    // TODO:计算日期
    for (let item of memoryList) {
      const dateNow = new Date()
      const date = new Date(memory.date)

      item.opt = date > dateNow ? "future" : "pass"

      // 计算两个日期的毫秒差距
      const timeDifference = Math.abs(dateNow - date)

      // 将毫秒差距转换为天数
      item.days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
    }
  }
} catch (e) {
  // error
  console.log(e)
  uni.showToast({
    icon: "none",
    title: "出错了",
  })
}
</script>

<style lang="less" scoped>
.set-top {
  width: 100%;
  height: 469rpx;
  border-radius: 14rpx;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0rpx 2rpx 4rpx 1rpx rgba(0, 0, 0, 0.06);
  border-radius: 6rpx;
}

.shadow {
  box-shadow: 0rpx 2rpx 4rpx 1rpx rgba(0, 0, 0, 0.06);

  // background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(74,74,74,0.71) 79%, #000000 100%);
}

.empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background: pink;
  width: 100%;
  height: 100%;
  // align-items: center;
  view {
    // background: pink;
    padding: 30rpx 0 30rpx 0;
  }
}
</style>
