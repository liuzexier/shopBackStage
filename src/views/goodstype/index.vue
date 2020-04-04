<template>
    <div class="goods-type-container">
        <el-row type="flex" class="title" justify="space-between">
            <el-col :span="4">
                <div class="title-item">
                    <el-button type="primary" @click="addType()">添加类别</el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="title-item-right">

                </div>
            </el-col>
        </el-row>
        <div class="table-contain">
            <goods-type-table class="table" :tableData="goodsTypeList"></goods-type-table>
        </div>
    </div>
</template>
<script>
import goodsTypeTable from '@/views/goodstype/goodstype-table/index.vue'
import { getTypeList, addType } from '@/api/goods'
export default {
    name: 'goods-type',
    data() {
        return {
            goodsTypeList: []
        }
    },
    components: {
        goodsTypeTable
    },
    methods: {
        handleGetTypeList() {
            getTypeList().then(res => {
                if (res.status === 1) {
                    this.goodsTypeList = res.data
                }
            })
        },
        addType() {
            this.$prompt('请输入类型名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    if (value) {
                        return addType({ name: value })
                    }
                    return Promise.reject('内容不能为空')
                })
                .then(res => {
                    if (res.status === 1) {
                        this.$message.success(res.msg)
                        this.handleGetTypeList()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(err => {
                    this.$message.error(err)
                })
        }
    },
    created() {
        this.handleGetTypeList()
    }
}
</script>
<style lang="less" scoped>
.goods-type-container {
    padding: 10px;
    width: 100%;
    .table-contain {
        .table {
            margin-top: 10px;
        }
    }
}
</style>