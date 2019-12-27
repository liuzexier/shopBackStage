<template>
    <div class="goods-manage-container">
        <el-row type="flex" class="title" justify="space-between">
            <el-col :span="9">
                <div class="title-item">
                    <el-input class="input" v-model="search" placeholder="请输入用户名"></el-input>
                    <el-button class="button" @click="handleSearch" icon="el-icon-search" circle></el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title-item-right">

                </div>
            </el-col>
        </el-row>
        <div class="table-contain">
            <cart-table class="table" :tableData="tableData"></cart-table>
            <div class="page-number">
                <el-pagination :page-size.sync="pageSize" :current-page.sync="page" @size-change="pageSizeChange" @current-change="pageNumberChange" background layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { table_mixin } from '@/mixins/table-mixin.js'
import cartTable from '@/views/cart/cart-table/index.vue'
import { findAllCartByPage, findCartByName } from '@/api/cart.js'
export default {
    name: 'Cart',
    mixins: [table_mixin],
    data() {
        return {
            tableData: [],
            search: ''
        }
    },
    components: {
        cartTable
    },
    created() {
        this.findCartByPage()
    },
    methods: {
        findCartByPage(page) {
            findAllCartByPage({
                page: page || this.page,
                pageSize: this.pageSize
            }).then(res => {
                // console.log(res)
                this.count = res.data.count
                this.tableData = res.data.rows
            })
        },
        pageSizeChange() {},
        pageNumberChange() {
            this.findCartByPage(this.page)
        },
        handleSearch() {
            // console.log(this.search)
            findCartByName({ name: this.search }).then(res => {
                console.log(res)
                this.count = res.data.count
                this.tableData = res.data.rows[0] ? res.data.rows[0].cart : []
            })
        }
    }
}
</script>
<style lang="less" scoped>
.goods-manage-container {
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