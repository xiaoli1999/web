<template>
    <div v-if="loading" class="loading-wrap fixed w-full h-screen mx-auto flex justify-between items-center  bg-[#ffffffaa] inset-0 z-2222" :class="small ? 'loading-small' : ''">
        <div class="loading">
            <div class="loading-in"></div>
            <div class="loading-out"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        }
    }

}
</script>

<style scoped>

.loading {
    position: relative;
    box-sizing: border-box;
    margin: auto;
    left: -12px;
    top:0;
    right: 0;
    bottom: 0;
    border: 1px solid;
}

.loading-in {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    position: absolute;
    margin: auto;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
}

.loading-out {
    width: 30px;
    height: 30px;
    border: 3px solid #222;
    border-radius: 50%;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    border-bottom-color: transparent;
    animation: loading 1200ms infinite linear;

}

.loading-small .loading-in {
    width: 30px !important;
    height: 30px !important;
}

.loading-small .loading-out {
    width: 26px !important;
    height: 26px !important;
}

@keyframes loading{
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>
