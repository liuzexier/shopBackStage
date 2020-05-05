<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component
export default class Order extends Vue {}
</script>
<style lang='less' scoped>
</style>