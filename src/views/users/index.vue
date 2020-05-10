<template>
    <div class="users-container">
        <router-view></router-view>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component
export default class Users extends Vue {
    
}
</script>
<style lang='less' scoped>
.users-container {
}
</style>