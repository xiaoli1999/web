<template>
    <div class="tabBlock" v-if="list.length > 0">
        <scroll-view scroll-x="true" scroll-with-animation :scroll-left="tabsScrollLeft" @scroll="scroll">
            <div class="tab" id="tab_list">
                <div v-for="(item, index) in list" :key="index" :class="['tab__item', {'tab__item--active': currentIndex === index || isNew}]" :style="{color: (currentIndex === index ? `${itemColor}`: '')}" id="tab_item" @click="select(index)">{{ item }}</div>
            </div>
            <div class="tab__line" :style="{background: lineColor, width: lineStyle.width, transform: lineStyle.transform,transitionDuration: lineStyle.transitionDuration}"></div>
        </scroll-view>
    </div>
</template>

<script>
export default {
    name: "Tabs",
    props: {
        value: {
            type: Number,
            default: 0
        },
        list: { // 传值
            type: Array,
            default: []
        },
        itemColor: String, // tab主色调
        lineColor: String ,// 下划线主色调
        lineAnimated: { // 是否展示下划线动画
            type: Boolean,
            default: true
        },
        isNew: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentIndex: 0,
            lineStyle: {},
            scrollLeft: 0,
            tabsScrollLeft: 0,
            duration: 0.24
        }
    },
    computed: {
        showTitleSlot() {
            return this.$scopedSlots.title
        }
    },
    watch: {
        list() {
            this.setTabList()
        },
        value() {
            this.currentIndex = this.value
            this.setTabList()
        }
    },
    mounted() {
        this.currentIndex = this.value
        this.setTabList()
        if(!this.lineAnimated) this.duration = 0
    },
    methods: {
        select(index) {
            this.$emit('changeId', index)
        },
        setTabList() {
            this.$nextTick(()=>{
                if(this.list.length > 0) {
                    this.setLine()
                    this.scrollIntoView()
                }
            })
        },
        setLine() {
            let lineWidth = 0, lineLeft = 0
            this.getElementData(`#tab_item`, (data)=> {
                let el = data[this.currentIndex]
                lineWidth = el.width - 24
                // lineLeft = el.width * (this.currentIndex + 0.5)  // 此种只能针对每个item长度一致的
                lineLeft = el.width / 2 + (-data[0].left) + el.left
                this.lineStyle = {
                    width: `${lineWidth}px`,
                    transform: `translateX(${lineLeft}px) translateX(-50%)`,
                    transitionDuration: `${this.duration}s`
                };
            })
        },
        scrollIntoView() {  // item滚动
            let lineLeft = 0;
            this.getElementData('#tab_list', (data)=> {
                let list = data[0]
                this.getElementData(`#tab_item`, (data)=> {
                    let el = data[this.currentIndex]
                    // lineLeft = el.width * (this.currentIndex + 0.5) - list.width / 2 - this.scrollLeft
                    lineLeft = el.width / 2 + (-list.left) + el.left - list.width / 2 - this.scrollLeft
                    this.tabsScrollLeft = this.scrollLeft + lineLeft
                })
            })
        },
        getElementData(el, callback){
            uni.createSelectorQuery().in(this).selectAll(el).boundingClientRect().exec((data) => {
                callback(data[0]);
            });
        },
        scroll(e) {
            this.scrollLeft = e.detail.scrollLeft;
        }
    }
}
</script>

<style>
.tabBlock {
    position: relative;
    background: #fff;
}
.tabBlock .tab {
    position: relative;
    display: flex;
    font-size: 13px;
    padding-bottom: 4px;
    white-space: nowrap;
}
.tabBlock .tab__item {
    flex: 0;
    height: 42px;
    text-align: center;
    line-height: 42px;
    color: #767676;
    padding: 0 12px;
}
.tabBlock .tab__item--active {
    color: #222;
    font-weight: 600;
}
.tabBlock .tab__item-title {
    margin: 14px 12px 16px;
}
.tabBlock .tab__line {
    display: block;
    height: 3px;
    position: absolute;
    bottom: 6px;
    left: 0;
    z-index: 1;
    border-radius: 3px;
    background: #222;
}
</style>
