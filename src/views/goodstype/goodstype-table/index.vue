<template>
    <div class="table-container">
        <el-table ref="goods-table" :data="tableData" border stripe style="width: 450px">
            <el-table-column prop="name" align="center" label="名称" width="250">
            </el-table-column>
            <el-table-column width="200px" align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import { deleteTypeById, updateTypeById } from '@/api/goods.js'
export default {
    name: 'goods-table',
    props: {
        tableData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {}
    },
    methods: {
        handleEdit(index, val) {
            this.$prompt('请输入类型名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    return updateTypeById({ id: val.id, name: value })
                })
                .then(res => {
                    if (res.status === 1) {
                        this.$message.success(res.msg)
                        this.$parent.handleGetTypeList()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => {})
        },
        handleDelete(index, val) {
            // console.log(val)
            // TODO: 该写删除了
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    return deleteTypeById({ id: val.id })
                })
                .then(res => {
                    console.log(res)
                    if (res.status === 1) {
                        this.$message.success(res.msg)
                        this.$parent.handleGetTypeList()
                    } else {
                        this.$message.error(res.msg)
                    }
                })
                .catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // })
                })
        }
    }
}
</script>
<style lang="less" scoped>
.table-container {
    .choose {
        display: flex;
        justify-content: center;
    }
    .img-container {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
    }
}
</style>