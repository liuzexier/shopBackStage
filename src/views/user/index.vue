<template>
    <div class="user-container">
        <el-row type="flex" class="title" justify="space-between">
            <el-col :span="9">
                <div class="title-item">
                    <el-button type="primary" @click="choose">选择</el-button>
                    <!-- <el-button v-show="selectedRowIds.length!==0" @click="deleteRows(false)" type="danger" plain>下架</el-button>
                    <el-button v-show="selectedRowIds.length!==0" @click="deleteRows(true)" type="success" plain>上架</el-button> -->
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title-item-right">
                    <!-- <el-select clearable class="select" v-model="selectedType" placeholder="请选择商品类别">
                        <el-option v-for="item in goodsTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-button @click="handleSearch" icon="el-icon-search" circle></el-button> -->
                </div>
            </el-col>
        </el-row>
        <div class="table-contain">
            <user-table :tableData="tableData" class="table"></user-table>
            <!-- <goods-table ref="goodsTable" @getEditId="getEditId" @selectChange="selectChange" :showSelection="showSelection" :tableData="tableData" class="table"></goods-table> -->
            <div class="page-number">
                <el-pagination :page-size.sync="pageSize" :current-page.sync="page" @size-change="pageSizeChange" @current-change="pageNumberChange" background layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import userTable from '@/views/user/components/user-table.vue'
import { table_mixin } from '@/mixins/table-mixin.js'
import { findAllUser } from '@/api/user.js'
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
            console.log(res)
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