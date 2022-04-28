<template>
    <div>
        <div v-if="!type" class="timer w-78px h-18px flex items-center overflow-hidden">
            <div>{{ showTime(hour) }}</div>
            <span>:</span>
            <div>{{ showTime(min) }}</div>
            <span>:</span>
            <div>{{ showTime(second) }}</div>
        </div>
        <div v-if="type" class="flex font-bold text-13px">
            <div>{{ showTime(hour) }}h</div>
            <span>:</span>
            <div>{{ showTime(min) }}m</div>
            <span>:</span>
            <div>{{ showTime(second) }}s</div>
        </div>
    </div>

</template>

<script>
import { getHMS } from '../libs/tools/comm'

export default {
	props: {
		startTime: {
		    type: String,
		    default: ''
		},
		endTime: {
		    type: String,
		    default: ''
		},
        type: {
		    type: Number,
            default: 0
        }
	},
	data() {
		return {
			sTime: 0,
            eTime: 0,
            hour: 0,
            min: 0,
            second: 0
		}
	},
	computed: {
        showTime() {
            return time => (time < 10 ? '0' + time : time)
        }
	},
	created() {
        this.sTime = this.startTime ? Math.ceil((new Date(this.startTime).getTime() / 1000)) : Math.ceil(Date.now() / 1000)
        this.eTime = this.endTime ? this.endTime : (new Date(new Date().getTime()).setHours(0,0,0,0) + 24 * 60 * 60 * 1000) / 1000
        const hmsDate = getHMS(this.sTime, this.eTime)
        this.hour = hmsDate[0]
        this.min = hmsDate[1]
        this.second = hmsDate[2]
	},
    mounted() {
        this.setTime()
    },
    methods: {
        setTime() {
            clearInterval(this.countTime)
            setInterval(this.countTime, 1000)
        },
        countTime() {
            if (this.hour === 0) {
                if (this.min !== 0 && this.second === 0) {
                    this.second = 59
                    this.min -= 1
                } else if (this.min === 0 && this.second === 0) {
                    this.second = 0
                    clearInterval()
                } else {
                    this.second -= 1
                }
            } else {
                if (this.min !== 0 && this.second === 0) {
                    this.second = 59
                    this.min -= 1
                } else if (this.min === 0 && this.second === 0) {
                    this.hour -= 1
                    this.min = 59
                    this.second = 59
                } else {
                    this.second -= 1
                }
            }
        }
	}
}
</script>

<style scoped>
.timer div {
    @apply w-18px h-18px leading-18px text-center text-12px text-white bg-[#222] rounded-sm;
}
.timer span {
    @apply px-4px text-center text-12px text-color-[#222] font-bold;
}
</style>
