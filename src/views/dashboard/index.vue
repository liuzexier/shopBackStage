<template>
    <div class="dashboard-container">
        <!-- <vue-echarts class="echarts" ref="chart1" :options="orgOptions" :auto-resize="true"></vue-echarts> -->
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class Dashboard extends Vue {
    private orgOptions: any = {}
    mounted() {
        this.orgOptions = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }
            ]
        }
    }
}
</script>
<style lang='less' scoped>
.dashboard-container {
    .echarts {
        width: 300px;
        height: 200px;
    }
}
</style>