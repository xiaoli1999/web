<template>
    <div :class="GoodsInfoModalVisible ? 'mask' : ''" @click="close"></div>
    <div class="modal-content flex flex-col" :class="GoodsInfoModalVisible  ? '!max-h-[80%]': ''">
        <div class="bg-white text-right pr-8px ">
            <div class="iconfont icon-guanbi text-18px leading-24px text-[#666]" @click="close"></div>
        </div>
        <div class="flex-1" style="height: calc(100% - 88px);overflow-y: auto">
            <div class="pt-6px pt-12px px-12px max-h-full">
                <div v-if="GoodsMainImages && GoodsMainImages.length" class="flex overflow-x-auto warp">
                    <img v-for="(item, index) in GoodsMainImages" :key="index" class="mr-8px w-45/100" :src="SysInfo.cdnBase + item+'-221'" alt="">
                </div>
                <div class="text-14px mt-8px leading-20px text-[#666]">
                    {{ GoodsBasic.name }}
                </div>
                <div class="flex justify-between items-center mt-5px">
                    <strong class="text-16px">{{ GoodsBasic.currency }}{{ SelectGoods.price ? SelectGoods.price : GoodsBasic.price }}</strong>
                    <div class="text-999 text-10px" @click="openDetailsPage">
                        <span class="mr-2px text-13px leading-24px">{{ $L('详情') }}</span><span class="iconfont icon-youjiantou text-12px"></span>
                    </div>
                </div>
                <Spec :flag="false" />
            </div>
        </div>
        <div class="w-full py-6px px-12px bg-white flex items-center">
            <div class="button  text-16px font-bold" @click="addToCart">
                {{ updateIndex!==-1 ? $L('更新') : $L('加入购物袋') }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { $L } from '../libs/uni/uni.comm'
import { openDetailsPage } from '../libs/uni/uni.navigata'
import Spec from './Details/Spec'

export default {
    components: { Spec },
    data() {
        return {
            updateIndex: -1
        }
    },
    computed: mapState({
        SysInfo: state => state.SysInfo,
        GoodsBasic: state => state.Goods.GoodsBasic,
        GoodsMainImages: state => state.Goods.GoodsMainImages,
        GoodsSpecs: state => state.Goods.GoodsSpecs,
        SelectGoods: state => state.Carts.SelectGoods,
        GoodsInfoModalVisible: state => state.Carts.GoodsInfoModalVisible,
        CartList: state => state.Carts.CartList
    }),
    created() {
        this.$bus.off('Open_Goods_Info_Modal')
        this.$bus.on('Open_Goods_Info_Modal', async ({id, index, flag = false}) => {
            if (!flag) {
                await this.$store.dispatch('Goods/getGoodsBasic', { id, flag: true })
                this.$store.commit('setState', ['Carts', 'Placeholder', true])
                this.updateIndex = index ?? -1
            }
            // #ifdef APP-PLUS
            setTimeout(() => {
                uni.hideTabBar()
            }, 100)
            // #endif
            this.$store.commit('setState', ['Carts', 'GoodsInfoModalVisible', true])
        })
        this.$bus.off('Close_Goods_Info_Modal')
        this.$bus.on('Close_Goods_Info_Modal', () => {
            this.close()
        })
    },
    methods: {
        $L,
        close() {
            this.$store.commit('setState', ['Carts', 'GoodsInfoModalVisible', false])
            if (getCurrentPages()[getCurrentPages().length - 1].route.includes('New') || getCurrentPages()[getCurrentPages().length - 1].route.includes('Cart')) {
                setTimeout(() => {
                    // #ifdef APP-PLUS
                    uni.showTabBar()
                    // #endif
                }, 400)
                setTimeout(() => {
                    this.$store.commit('setState', ['Carts', 'HideCartFooter', !this.CartList.length])
                }, 410)
                setTimeout(() => {
                    this.$store.commit('setState', ['Carts', 'Placeholder', false])
                }, 420)
            }
        },
        openDetailsPage() {
            openDetailsPage(this.GoodsBasic.id)
            this.close()
        },
        async addToCart() {
            if(this.updateIndex!==-1) {
                this.$store.commit('Carts/UpdateCartGoods',this.updateIndex)
            } else {
                this.$store.commit('Carts/AddToCart', 1)
            }
        }
    }
}
</script>

<style scoped>

.modal-content {
    @apply fixed left-0 right-0 bottom-0 max-w-[540px] max-h-0 bg-white z-index-1550 mx-auto;
    transition: all ease-in-out .5s;
}
.modal-content-main {
    height: calc(100% - 60px);
    overflow-y: scroll;
}

.text-999 {
    @apply text-[#999];
}

.warp::-webkit-scrollbar {
    display: none;
}

button::after {
    @apply border-0;
}
</style>
