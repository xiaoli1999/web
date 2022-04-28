<template>
    <div v-show="backTopShow" class="back">
        <view v-show="backTopShow" class="back-wrap" @tap="goScrollTop">
            <i class="iconfont icon-arrowTop text-18px tetx-[#222]"></i>
        </view>
    </div>
</template>

<script>
import bus from "../libs/tools/bus";

export default {
    props: {
        scrollTop: {
            type: Number,
            default: 0
        },
        isHome: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        backTopShow() {
            return this.scrollTop - 500 >= 0
        }
    },
    methods: {
        // 滚动到顶部
        goScrollTop () {
            if (this.isHome) {
                this.$emit('backTop')
            } else {
                uni.pageScrollTo({
                    scrollTop: 0,
                    duration: 200
                });
            }
        }
    }
}
</script>

<style scoped>
.back {
    position: fixed;
    right: 12px;
    bottom: 20%;
    z-index: 100;
}

.back-wrap {
    display: inline-block;
    width: 38px;
    height: 38px;
    background: #ffffffcc;
    text-align: center;
    line-height: 38px;
    font-weight: 600;
    color: #666;
    font-size: 18px;
    border: 1px solid #f4f4f4;
}
</style>
