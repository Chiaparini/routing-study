<template>
    <div class="container" :class="{'is-fixed': isFixed}" >
        <p class="has-text-left">showing: {{ offset }} of {{ total }}</p>
    </div>
</template>
<script>
    
    export default {
        name: 'Indicator',
        props: ['offset', 'total'],
        data() {
            return {
                isFixed: false
            }
        },
        mounted() {
            let offsetTop = this.$el.offsetTop
            window.addEventListener('scroll', evt => {
                (window.scrollY > offsetTop) ? this.isFixed = true : this.isFixed = false
            })
        }
    }
</script>
<style lang="scss" scoped>
    .is-fixed 
    {
        position: fixed;
        top: 0;
        display: inline-block;
        width: 100%;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        text-align: left;
        p 
        {
            padding: 7px 14px;
            border-radius: 20px;
            background-color: white;
            display: inline-block;
            box-shadow: 0px 0px 5px 0px #9E9E9E;
        }
    }
</style>
