<template>
  <view class="h-100vh overflow-hidden bg-#F5F7F8 c-#1E1F20">
    <view class="">
      <view class="p-30rpx pt-60rpx bg-#e1ecc8" @click="uni.navigateBack()">
        <span class="iconfont icon-xitongfanhui text-30rpx"></span>
        <text class="ml-20rpx c-#1E1F20 text-28rpx">添加新日子</text>
      </view>
      <view class="my-40rpx bg-#fff p-25rpx pb-1rpx b-rd-14rpx box-border">
        <view class="item">
          <span class="iconfont icon-shengqian text-35rpx mr-20rpx"></span>
          <input
            type="text"
            :value="userInput.title"
            @input="handleTitle"
            placeholder="请输入事件名称"
            placeholder-class="c-#CCCCCC text-28rpx" />
        </view>

        <view class="item">
          <span class="iconfont icon-shijian text-35rpx mr-20rpx"></span>
          <picker mode="date" :value="userInput.date" @change="handleDate">
            <view
              class="text-28rpx"
              :class="[userInput.dateText === '目标日' ? 'c-#CCCCCC' : '']">
              {{ userInput.dateText }}
            </view>
          </picker>
        </view>

        <view class="item">
          <span class="iconfont icon-xiangqu text-35rpx mr-20rpx"></span>
          <view
            class="text-28rpx c-#1E1F20 flex justify-between items-center w-100%">
            <view>置顶</view>
            <view>
              <switch
                color="#e1ecc8"
                style="transform: scale(0.7)"
                :checked="userInput.setTop"
                @change="handleSetTop" />
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="w-100vw flex justify-between items-center fixed bottom-96rpx">
      <view
        @click="saveMemory"
        class="c-#1E1F20 w-100% mx-32rpx p-20rpx bg-#e1ecc8 b-rd-36rpx text-center">
        保存
      </view>
    </view>
  </view>
</template>
<script setup>
import { uni } from "@dcloudio/uni-h5"
// import { nanoid } from "nanoid"
import { reactive } from "vue"
let userInput = reactive({
  date: "",
  dateText: "目标日",
  title: "",
  setTop: false,
})

function handleDate(e) {
  userInput.date = e.detail.value
  userInput.dateText = e.detail.value
}
function handleTitle(e) {
  userInput.title = e.detail.value
}
function handleSetTop(e) {
  userInput.setTop = e.detail.value
}

function saveMemory() {
  if (judge()) {
    try {
      const value = uni.getStorageSync("memoryList") || []
      if (value) {
        console.log(value)
        let memoryList = [...value]
        let memory = {
          id: new Date().getTime(),
          title: userInput.title,
          date: userInput.date,
          days: "",
          opt: "",
          setTop: userInput.setTop,
        }

        const dateNow = new Date()
        const date = new Date(memory.date)

        memory.opt = date > dateNow ? "future" : "pass"

        // 计算两个日期的毫秒差距
        const timeDifference = Math.abs(dateNow - date)

        // 将毫秒差距转换为天数
        memory.days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        console.log(memory)

        if (userInput.setTop) {
          for (let item of memoryList) {
            item.setTop = false
          }
          memoryList.shift(memory)
        } else {
          memoryList.push(memory)
        }

        try {
          uni.setStorageSync("memoryList", memoryList)
        } catch (e) {
          // error
          console.log(e)
          uni.showToast({
            icon: "none",
            title: "出错了",
          })
        }
        uni.navigateBack()
      }
    } catch (e) {
      // error
      console.log(e)
      uni.showToast({
        icon: "none",
        title: "出错了",
      })
    }
  }
}
function judge() {
  console.log("judge", userInput)
  if (userInput.title === "") {
    uni.showToast({
      icon: "none",
      title: "请输入事件",
    })
    return false
  }

  if (userInput.date === "") {
    uni.showToast({
      icon: "none",
      title: "请选择时间",
    })
    return false
  }

  return true
}
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
  height: 50rpx;
  /* background-color: pink; */
}
</style>
