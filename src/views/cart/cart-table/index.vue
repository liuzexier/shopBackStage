<template>
    <div class="table-container">
        <el-table ref="goods-table" :data="tableData" border stripe style="width: 100%">
            <el-table-column label="用户">
                <template slot-scope="scope">
                    <div class="username">
                        <el-image style="width: 30px; height: 30px" :src="'http://localhost:5000' + scope.row.user.avatar" :fit="'contain'"></el-image>
                        <span>{{scope.row.user.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="名称" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.goods.title}}</span>
                </template>
            </el-table-column>
            <el-table-column label="单价" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.goods.price}}</span>
                </template>
            </el-table-column>
            <el-table-column label="描述">
                <template slot-scope="scope">
                    <span>{{scope.row.goods.description}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="amount" label="数量">
            </el-table-column>
            <el-table-column label="日期">
                <template slot-scope="scope">
                    <span>{{scope.row.create_date | date-filter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="总价">
                <template slot-scope="scope">
                    <span>{{scope.row.goods.price * scope.row.amount }}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="150px" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!-- <el-button v-show="scope.row.status===1" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                    <!-- <el-button v-show="scope.row.status===0" size="mini" type="success" @click="handleDelete(scope.$index, scope.row)">恢复</el-button> -->
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'cart-table',
    props: {
        tableData: {
            type: Array,
            default: []
        }
    },
    data() {
        return {}
    },
    methods:{
        handleEdit() {

        }
    }
}
</script>
<style lang="less" scoped>
.table-container {
    .username {
        display: flex;
        align-items: center;
        span {
            font-size: 20px;
            margin-left: 10px;
        }
    }
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