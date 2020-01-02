<template>
    <div class="goods-manage-container">
        <el-row type="flex" class="title" justify="space-between">
            <el-col :span="9">
                <div class="title-item">
                    <el-button @click="addGoodsDialogShow = true" type="primary">添加商品</el-button>
                    <el-button @click="choose">选择</el-button>
                    <el-button v-show="selectedRowIds.length!==0" @click="deleteRows(false)" type="danger" plain>下架</el-button>
                    <el-button v-show="selectedRowIds.length!==0" @click="deleteRows(true)" type="success" plain>上架</el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title-item-right">
                    <el-select clearable class="select" v-model="selectedType" placeholder="请选择商品类别">
                        <el-option v-for="item in goodsTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-button @click="handleSearch" icon="el-icon-search" circle></el-button>
                </div>
            </el-col>
        </el-row>
        <div class="table-contain">
            <goods-table ref="goodsTable" @getEditId="getEditId" @selectChange="selectChange" :showSelection="showSelection" :tableData="tableData" class="table"></goods-table>
            <div class="page-number">
                <el-pagination :page-size.sync="pageSize" :current-page.sync="page" @size-change="pageSizeChange" @current-change="pageNumberChange" background layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
        </div>
        <el-dialog class="add-dialog" title="编辑商品" :visible.sync="editGoodsDialogShow" width="540px">
            <edit-goods :typeList="goodsTypeList" v-if="editGoodsDialogShow" :editId="editId" ref="editGoodsDialog"></edit-goods>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editGoodsDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="editGoods()">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog class="add-dialog" title="增加商品" :visible.sync="addGoodsDialogShow" width="540px">
            <add-goods :typeList="goodsTypeList" ref="gddGoodsDialog"></add-goods>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addGoodsDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="addGoods()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import goodsTable from '@/views/goods/goods-table/index.vue'
import addGoods from '@/views/goods/add-goods/index.vue'
import editGoods from '@/views/goods/edit-goods/index.vue'
import { table_mixin } from '@/mixins/table-mixin.js'
import {
    findGoodsByPage,
    deleteGoodsById,
    getTypeList,
    getGoodsByType
} from '@/api/goods.js'
export default {
    mixins: [table_mixin],
    name: 'Goodsmanage',
    data() {
        return {
            addGoodsDialogShow: false,
            editGoodsDialogShow: false,
            tableData: [],
            showSelection: false,
            selectedRows: [],
            editId: -1,
            goodsTypeList: [],
            selectedType: ''
        }
    },
    created() {
        this.getTableData()
        this.handleGetTypeList()
    },

    components: {
        goodsTable,
        addGoods,
        editGoods
    },
    computed: {
        selectedRowIds() {
            return this.selectedRows.map(item => {
                return item.id
            })
        }
    },
    methods: {
        handleGetTypeList() {
            getTypeList().then(res => {
                if (res.status === 1) {
                    this.goodsTypeList = res.data
                }
            })
        },
        pageSizeChange() {
            this.getTableData()
        },
        pageNumberChange() {
            if(this.selectedType) {
                this.getTableDataTypes()
            } else {
                this.getTableData()
            }
        },
        getTableData() {
            findGoodsByPage({
                page: this.page,
                pageSize: this.pageSize
            }).then(res => {
                // console.log(res)
                this.count = res.data.count
                this.tableData = res.data.rows
            })
        },
        async addGoods() {
            let res = await this.$refs.gddGoodsDialog.submit()
            // console.log(res)
            if (res.status === 1) {
                this.$message.success(res.msg)
                this.addGoodsDialogShow = false
                this.getTableData()
            } else {
                this.$message.error(res.msg)
            }
        },
        choose() {
            this.showSelection = !this.showSelection
            if (this.showSelection === false) {
                this.$refs.goodsTable.cleanSelect()
            }
        },
        selectChange(rows) {
            this.selectedRows = rows
        },
        deleteRows(val) {
            deleteGoodsById({
                ids: JSON.stringify(this.selectedRowIds),
                status: val ? 1 : 0
            }).then(res => {
                // console.log(res)
                if (res.status == 1) {
                    this.$message.success(res.msg)
                    this.getTableData()
                }
            })
        },
        getEditId(id) {
            // console.log(id)
            this.editId = id
            this.editGoodsDialogShow = true
        },
        async editGoods() {
            // this.$refs.editGoodsDialog.submit()
            let res = await this.$refs.editGoodsDialog.submit()
            if (res.status === 1) {
                this.$message.success(res.msg)
                this.editGoodsDialogShow = false
                this.getTableData()
            } else {
                this.$message.error(res.msg)
            }
        },
        getTableDataTypes() {
            getGoodsByType({
                typeid: this.selectedType,
                page: this.page,
                pageSize: this.pageSize
            }).then(res => {
                this.count = res.data.count
                this.tableData = res.data.rows
            })
        },
        handleSearch() {
            if (this.selectedType) {
                this.getTableDataTypes()
            } else {
                this.getTableData()
            }
        }
    }
}
</script>
<style lang="less" scoped>
.goods-manage-container {
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