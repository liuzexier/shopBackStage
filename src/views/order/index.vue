<template>
    <div class="order-container">
        <el-row type="flex" class="title" justify="space-between">
            <el-col :span="9">
                <div class="title-item">
                    <el-input class="input" v-model="search" placeholder="请输入用户名"></el-input>
                    <el-button class="button" @click="handleSearch" icon="el-icon-search" circle></el-button>
                </div>
            </el-col>
            <el-col :span="4">
            </el-col>
        </el-row>
        <div class="table-contain">
            <order-table :tableData="tableData" class="table" @edit="handleEdit"></order-table>
            <div class="page-number">
                <el-pagination :page-size.sync="pageSize" :current-page.sync="page" @size-change="pageSizeChange" @current-change="pageNumberChange" background layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
        <order-dialog v-if="showDialog" :visiable.sync="showDialog" :orderMessage="orderMessage" :order="orderMessage"></order-dialog>
    </div>
</template>
<script>
import { table_mixin } from '@/mixins/table-mixin'
import orderTable from '@/views/order/order-table/index.vue'
import orderDialog from '@/views/order/order-dialog/index.vue'
import { findOrderByPage, findOrderByUsername } from '@/api/order'
export default {
    mixins: [table_mixin],
    name: 'Order',
    components: {
        orderTable,
        orderDialog
    },
    data() {
        return {
            search: '',
            tableData: [],
            showDialog: false,
            orderMessage: {}
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            findOrderByPage({
                page: this.page,
                pageSize: this.pageSize
            }).then(res => {
                this.count = res.data.count
                this.tableData = res.data.rows
            })
        },
        handleEdit(row) {
            this.orderMessage = row
            this.showDialog = true
        },
        pageNumberChange() {
            this.getData()
        },
        pageSizeChange() {
            this.getData()
        },
        handleSearch() {
            findOrderByUsername({ username: this.search }).then(res => {
                let order =
                    res.data.rows.length !== 0 ? res.data.rows[0].order : []
                let obj
                if (res.data.rows.length !== 0) {
                    obj = {
                        id: res.data.rows[0].id,
                        name: res.data.rows[0].name,
                        password: res.data.rows[0].password,
                        email: res.data.rows[0].email,
                        phone: res.data.rows[0].phone,
                        identity: res.data.rows[0].identity,
                        paypin: res.data.rows[0].paypin,
                        avatar: res.data.rows[0].avatar
                    }
                } else {
                    obj = null
                }

                order.forEach(item => {
                    item.user = obj
                })
                this.count = res.data.count
                this.tableData = order
            })
        }
    }
}
</script>
<style lang="less" scoped>
.order-container {
    padding: 10px;
    width: 100%;
    .title-item {
        .button {
            margin-left: 10px;
        }
        .input {
            width: 190px;
        }
    }
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