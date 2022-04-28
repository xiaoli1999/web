<template>
    <div v-if="option.show" class="toast-mask" style="z-index: 1000">
        <div class="toast">
            <div v-if="icons" class="toast-icon">
                <i :class="'iconfont ' + icons"></i>
            </div>
            <div class="toast-content">{{ option.title }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Toast",
    data () {
        return {
            defaultVal: {
                show: false,
                icon: 'success',  // success error none
                title: '',
                duration: 2000,
            },
            option: {},
            timer: null

        }
    },
    computed: {
        icons () {
            if (this.option.icon === 'success') {
                return 'icon-chenggong'
            } else if (this.option.icon === 'error') {
                return 'icon-cuowu'
            } else if (this.option.icon === 'none') {
                return ''
            } else {
                return ''
            }
        }
    },
    created(){
        this.$bus.off('Open_Toast')
        this.$bus.on('Open_Toast',  (args) => (this.show(args)))
    },
    methods: {
        show(args) {
            // #ifdef H5
            this.option = Object.assign({}, this.defaultVal, args, { show: true })
            // 自动关闭
            if(this.option.duration) {
                this.timer = setTimeout(() => { this.option.show = false }, this.option.duration)
            }
            // #endif
            // #ifdef APP-PLUS
            uni.showToast(args)
            // #endif
        },
    }
}
</script>

<style scoped>
.toast-mask {
    width: 140px;
    height: 90px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
}

.toast {
    max-width: 140px;
    height: auto;
    border-radius: 6px;
    background-color: rgba(0,0,0,.66);
    margin: auto;
    padding: 6px 8px;
    color: #fff;
    animation: toast 500ms linear;
}

.toast-icon {
    width: 76px;
    height: 58px;
    text-align: center;
    line-height: 64px;
    margin: 0 auto;
}

.toast-icon i {
    font-size: 36px;
}

.toast-content {
    width: 100%;
    color: #fff;
    min-height: 20px;
    max-height: 40px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    letter-spacing: 1px;
    overflow: hidden;
}

@keyframes toast {
    0% {
        opacity: 0.8;
    }
    100% {
        opacity: 1;
    }
}
</style>
