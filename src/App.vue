<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component({})
export default class App extends Vue {}
</script>
<style lang="less">
@import url('./assets/css/reset.less');
</style>
