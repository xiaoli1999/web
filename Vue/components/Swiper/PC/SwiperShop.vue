<template>
    <div ref="swiper" class="swiper">
        <div ref="swiperWrap" class="swiper-wrap">
            <div ref="swiperList" class="swiper-list" :style="'transform: translateX('+translateX+'px); transition-duration:' + duration + 'ms;'" @mousedown="touchStart" @mousemove="touchMove" @mouseup="touchEnd" @mouseleave.prevent="touchEnd">
                <div v-for="(pages, pagesIndex) in pageNum" :key="pagesIndex" class="swiper-list-item">
                    <slot name="swiperItem" :list="list.slice((pages -1) * num, (((pages -1) * num) + num))" :is-last="pages === pageNum"></slot>
                </div>
            </div>
        </div>
        <div v-if="showDot" class="swiper-dot">
            <span v-for="(item, i) in pageNum" :key="i" :style="'background:' + (i === index ? activeColor : '') + ';'" />
        </div>
        <div class="swiper-pointer swiper-pointer-left" :class="index <= 0 ? 'hidden' : ''" @click="changeImg(true)"><i class="suiiconfont-critical sui_icon_nav_back_24px text-2xl"></i></div>
        <div class="swiper-pointer swiper-pointer-right" :class="index >= (pageNum - 1) ? 'hidden' : ''" @click="changeImg(false)"><i class="suiiconfont-critical sui_icon_nav_back_24px text-2xl"></i></div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount, onMounted, reactive, computed } from 'vue'
import { navigate } from 'vite-plugin-ssr/client/router'
const props = defineProps({
    list: {
        type: Array,
        default: []
    },
    num: {
        type: Number,
        default: 6
    },
    time: {
        type: Number,
        default: 3000
    },
    duration: {
        type: Number,
        default: 500
    },
    auto: {
        type: Boolean,
        default: false
    },
    showDot: {
        type: Boolean,
        default: true
    },
    activeColor: {
        type: String,
        default: '#222'
    },
    isTouch: {
        type: Boolean,
        default: false
    }
})
const time = ref(props.time)
const list = reactive(props.list)
// 轮播所需要变量
// 获取dom元素
const swiper = ref()
const swiperWrap = ref()
const swiperList = ref()
// 当前下标
const index = ref(0)
// 过渡时间
const duration = ref(500)
// 轮播容器宽度
const swiperWidth = ref(0)

// 需要的页数
const pageNum = computed(() => {
    return Math.ceil(props.list?.length / props.num)
})

// 移动的距离
const translateX = computed(() => {
    return (index.value * swiperWidth.value) * -1
})

// 获取组件实例
onMounted(() => {
    swiperWidth.value = swiperWrap.value.offsetWidth
    autoPlay()
})
// 定时器容器
let timer:any = null
// 自动轮播
const autoPlay = () => {
    if (!props.auto) return
    clearInterval(timer)
    timer = null
    if (props.list?.length === 0) return
    timer = setInterval(() => (index.value = (index.value + 1) % pageNum.value), time.value)
}
// 是否可拖拽
let isMove = false
const startX = ref(0)
const endX = ref(0)
const offsetX = ref(0)

// 阻止事件冒泡
// 不仅仅要stopPropagation，还要preventDefault
function pauseEvent (e:any) {
    if (e.stopPropagation) e.stopPropagation()
    if (e.preventDefault) e.preventDefault()
    e.cancelBubble = true
    e.returnValue = false
    return false
}

const touchStart = (e:any) => {
    if (!props.isTouch) return
    offsetX.value = 0
    isMove = true
    // 防止鼠标松开失效
    pauseEvent(e)
    duration.value = 0
    clearInterval(timer)
    // 只记录第一根手指触发的值
    startX.value = e.clientX
}
// 鼠标移动
const touchMove = (e:any) => {
    if (isMove) {
        endX.value = e.clientX
        offsetX.value = startX.value - endX.value
        // 处理触摸回弹
        const offestMax :number = swiperWidth.value * 0.9
        if (offsetX.value > 0) {
            offsetX.value = offsetX.value >= offestMax ? offestMax : offsetX.value
        } else if (offsetX.value < 0) {
            offsetX.value = offsetX.value <= (offestMax * -1) ? offestMax * -1 : offsetX.value
        }
        swiperList.value.style.transform = `translateX(${translateX.value - offsetX.value}px)`
    }
}
const touchEnd = (e:any) => {
    isMove = false
    if (endX.value !== 0) {
        // 计算偏移值
        const offestPer = Number((offsetX.value / swiperWidth.value).toFixed(1))
        if (offestPer >= 0.36) {
            if (index.value < pageNum.value - 1) index.value++
        } else if (offestPer <= -0.36) {
            if (index.value > 0) index.value--
        } else {
            swiperList.value.style.transform = `translateX(${translateX.value}px)`
        }
    }
    duration.value = props.duration
    autoPlay()
    // 重置偏移量
    startX.value = 0
    endX.value = 0
    // offsetX.value = 0
}

// 点击箭头切换轮播

const changeImg = (target:boolean) => {
    clearInterval(timer)
    if (target) {
        if (index.value > 0) index.value--
    } else {
        if (index.value < pageNum.value - 1) index.value++
    }
    autoPlay()
}
const emit = defineEmits(['goDetails'])

// 点击跳转
const go = (item:any) => {
    if (offsetX.value === 0) navigate(item.url)
}
// 销毁
onBeforeUnmount(() => (clearInterval(timer)))
</script>

<style scoped>
.swiper {
    width: 100%;
    height: auto;
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
}

.swiper-wrap {
    overflow: hidden;
}

.swiper-list {
    width: auto;
}

.swiper-list-item {
    display: inline-block;
    width: 100%;
}

.swiper-dot {
    position: absolute;
    width: 100%;
    height: 24px;
    text-align: center;
    line-height: 24px;
    bottom: 0;
}

.swiper-dot span {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 6px;
    background: #f4f4f480;
}

.swiper-pointer {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    text-align: center;
    line-height: 38px;
    background: #fffffff0;
    color: #666;
    position: absolute;
    top: calc(50% - 19px);
    opacity: 0.8;
    cursor: pointer;
}

.swiper-pointer i {
    position: absolute;
    top: 4px;
    left: 9px;
    font-size: 20px;
    color: #666;
}

.swiper-pointer:hover {
    opacity: 1;
}

.swiper-pointer-left {
    left: 10px;
}

.swiper-pointer-right {
    right: 10px;
    transform: rotate(180deg);
}
</style>
