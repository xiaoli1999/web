<template>
    <div v-if="tagList && tagList.length" class="check-tag wrap mx-12px py-12px bg-[#fff] text-color-[#666] flex overflow-x-auto">
        <div v-for="(item, index) in tagList" :key="index" :class="checkTagList.includes(item) ? 'tag tag-active' : 'tag' " @click="checkTag(item)">
            {{ item }}
            <span v-if="checkTagList.includes(item)" class="tag-close">×</span>
        </div>
    </div>
</template>

<script >
export default {
    props: {
        tagList: {
            type: Array,
            required: true
        },
        checkTagList: {
            type: Array,
            required: true
        }
    },
    methods: {
        checkTag (name) {
            this.$emit('clickTag', name)
        }
    }
}

</script>

<style scoped>
.tag {
    @apply relative flex-shrink-0 h-28px leading-28px mr-8px bg-[#f6f6f6] border-1 border-transparent px-12px text-12px cursor-pointer;
}

.tag-active {
    @apply text-color-[#222] border-[#222];
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
</style>
