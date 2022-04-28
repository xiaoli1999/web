<template>
    <div class="radio-shop wrap bg-[#fff] text-color-[#666] flex overflow-x-auto">
        <div v-for="(item, index) in tagList" :key="index" :class="tagIndex===index ? 'tag tag-active' : 'tag' " @click="checkTag(index)">
            {{ item.name }}
            <span v-if="tagIndex === index" class="tag-close">×</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    tagList: {
        type: Array,
        required: true
    },
    tagIndex: {
        type: Number,
        required: true
    }
})

const emit = defineEmits(['checkTagIndex'])

const checkTag = (index: number) => {
    emit('checkTagIndex', index)
}
</script>

<style scoped>
.tag {
    @apply relative flex-shrink-0 h-28px leading-28px mr-8px  border-1 border-[#e5e5e5] px-12px text-12px cursor-pointer;
}

.tag-active {
    border-color: #222;
}

.tag-active::after {
    @apply absolute w-0 h-0 top-0 right-0;
    content: '';
    border-width: 8px;
    border-style: solid;
    border-color: black black transparent  transparent ;
}

.tag-close {
    @apply block absolute text-12px text-color-[#fff] bg-transparent top-[-1.5px] right-[1.5px] z-2;
}

.wrap::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
}
</style>
