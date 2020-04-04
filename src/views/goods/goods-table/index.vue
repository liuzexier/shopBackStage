<template>
    <div class="table-container">
        <el-table ref="goods-table" @selection-change="selectChange" :data="tableData" border stripe style="width: 100%">
            <el-table-column v-if="showSelection" type="selection" class="choose" width="39">
            </el-table-column>
            <el-table-column prop="title" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="price" label="价格" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>
            <el-table-column prop="count" label="数量">
            </el-table-column>
            <el-table-column label="日期">
                <template slot-scope="scope">
                    <span>{{ scope.row.create_date | date-filter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">
                    <span>{{ scope.row.goodstype.name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span :style="scope.row.status === 1 ? 'color:#67C23A': 'color:#F56C6C'">{{ scope.row.status === 1 ? '上架': '下架' }}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <!-- <span :style="scope.row.status === 1 ? 'color:#67C23A': 'color:#F56C6C'">{{ scope.row.status === 1 ? '上架': '下架' }}</span> -->
                    <!-- <img v-if="scope.row.imgs.length!==0" :src="'http://localhost:5000' + scope.row.imgs[0].url" alt=""> -->
                    <div class="img-container">
                        <el-image v-if="scope.row.imgs.length!==0" style="width: 70px; height: 70px" :src="'http://localhost:5000' + scope.row.imgs[0].url" :fit="'contain'"></el-image>
                        <el-image v-else style="width: 70px; height: 70px" :src="'http://localhost:5000/img/noimg.png'" :fit="'contain'"></el-image>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="150px" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button v-show="scope.row.status===1" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">下架</el-button>
                    <el-button v-show="scope.row.status===0" size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">上架</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import { deleteGoodsById } from '@/api/goods'
export default {
    name: 'goods-table',
    props: {
        tableData: {
            type: Array,
            default: []
        },
        showSelection: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    methods: {
        handleEdit(index, val) {
            let id = val.id
            this.$emit('getEditId', id)
        },
        handleDelete(index, val) {
            let ids = [val.id]
            deleteGoodsById({
                ids: JSON.stringify(ids),
                status: val.status === 0 ? 1 : 0
            }).then(res => {
                // console.log(res)
                this.$message.success(res.msg)
                this.$parent.getTableData()
            })
        },
        selectChange(rows) {
            // console.log(rows)
            this.$emit('selectChange', rows)
        },
        cleanSelect() {
            this.$refs['goods-table'].clearSelection()
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