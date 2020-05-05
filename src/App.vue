<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component({})
export default class App extends Vue {
    created() {
        //在页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState(
                Object.assign(
                    {},
                    this.$store.state,
                    JSON.parse(sessionStorage.getItem('store') as any)
                )
            )
        }

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state))
        })
    }
}
</script>
<style lang="less">
@import url('./assets/css/reset.less');
</style>
