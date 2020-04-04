<template>
    <div class="user-container">
        <el-row type="flex" class="title" justify="space-between">
            <el-col :span="9">
                <div class="title-item">
                    <el-button type="primary" @click="choose">选择</el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title-item-right">
                </div>
            </el-col>
        </el-row>
        <div class="table-contain">
            <user-table :tableData="tableData" class="table"></user-table>
            <div class="page-number">
                <el-pagination :page-size.sync="pageSize" :current-page.sync="page" @size-change="pageSizeChange" @current-change="pageNumberChange" background layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import userTable from '@/views/user/user-table/user-table.vue'
import { table_mixin } from '@/mixins/table-mixin'
import { findAllUser } from '@/api/user'
export default {
    mixins: [table_mixin],
    name: 'List',
    data() {
        return {
            tableData: []
        }
    },
    components: {
        userTable
    },
    created() {
        findAllUser({ page: this.page, pageSize: this.pageSize }).then(res => {
            // console.log(res)
            this.tableData = res.data.rows
            this.count = res.data.count
        })
    },
    methods: {
        choose() {},
        pageSizeChange() {},
        pageNumberChange() {}
    }
}
</script>
<style lang="less" scoped>
.user-container {
    padding: 10px;
    width: 100%;
    .title-item-right {
        display: flex;
        justify-content: space-between;
    }
    .table-contain {
        // width: 1000px;
        .table {
            margin-top: 10px;
        }
    }

    /deep/ .add-dialog {
        .el-dialog__body {
            padding-top: 0px;
            padding-bottom: 0px;
        }
    }
    .page-number {
        width: 100%;
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>