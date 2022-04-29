import App from './App'
import { createSSRApp } from 'vue'

export function createApp() {
    const app = createSSRApp(App)

    // TODO 图片懒加载全局指令

    app.directive('lazyImage', {
        created(el, binding) {
            binding.data = {}
            binding.data.isShow = false
            binding.data.id = `lazy-img-${ binding.dir.methods.generateLazyImgId() }`
            binding.data.windowHeight = uni.getSystemInfoSync().windowHeight
            binding.instance.$bus.on('PAGE_SCROLL_TOP', () => {
                if (!binding.data) return
                if (binding.data.isShow) return

                const query = uni.createSelectorQuery().in(binding.instance);
                query.select('#' + binding.data.id).boundingClientRect((data) => {
                    if (data && data.top) {
                        if (data.top < binding.data.windowHeight) {
                            if (!binding.data.ele.src.includes('uploadimages')) {
                                binding.data.ele.src = binding.data.src
                                binding.data.isShow = true
                                binding.data.ele.className = `${binding.data.className} lazy--img--finish`
                            }
                        }
                    }
                }).exec()
            })
        },
        beforeMount(el, binding) {
            el.id = binding.data.id
            binding.data.src = el.src
            binding.data.className = `lazy--img ${el.className}`
            el.className = binding.data.className
            // el.src = '/static/loading.gif'
            el.src = ''

            binding.data.ele = el
            setTimeout(async () => {
                binding.data.top = await binding.dir.methods.getRect(binding)

                if (binding.data.top <= binding.data.windowHeight + 100) {
                    binding.data.ele.src = binding.data.src
                    binding.data.isShow = true
                    binding.data.ele.className = `${binding.data.className} lazy--img--finish`
                }
            })
        },
        methods: {
            generateLazyImgId() {
                return 'xyxyxy'.replace(/[xy]/g, function (c) {
                    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                })
            },
            getRect(binding) {
                const query1 = uni.createSelectorQuery().in(binding.instance)
                return new Promise((resolve, reject) => {
                    query1.select('#' + binding.data.id).boundingClientRect((rect) => {
                        if (rect && rect.top) {
                            resolve(rect.top)
                        } else {
                            return 0
                        }
                    }).exec()
                })
            }
        }

    })

    app.config.globalProperties.$bus = bus
    return {
        app
    }
}


