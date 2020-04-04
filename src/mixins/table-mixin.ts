import Vue from 'vue'
import { Component } from 'vue-property-decorator'
@Component
export default class TableMixin extends Vue {
    public page: number = 1
    public pageSize: number = 10
    public count: number = 0

    getTableData() { }

    jumpToTargetPage(val: any) {
        this.page = val
    }

    handleSizeChange() {
        this.getTableData()
    }

    handleCurrentChange() {
        this.getTableData()
    }
}