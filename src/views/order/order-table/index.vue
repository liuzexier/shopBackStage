<template>
    <div class="order-table-container">
        <el-table :data="tableData" border stripe>
            <el-table-column label="用户">
                <template slot-scope="scope">
                    <div class="username">
                        <el-image style="width: 30px; height: 30px" :src="'http://localhost:5000' + scope.row.user.avatar" :fit="'contain'"></el-image>
                        <span>{{scope.row.user.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="订单号" prop="id"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <span style="color:#F56C6C;" v-if="scope.row.status===0">未支付</span>
                    <span style="color:#67C23A;" v-if="scope.row.status===1">已支付</span>
                    <span style="color:#409EFF;" v-if="scope.row.status===2">已发货</span>
                </template>
            </el-table-column>

            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    <span>{{scope.row.create_date | date-filter}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称">
                <template slot-scope="scope">
                    <el-popover placement="top-start" :title="scope.row.goods.title" width="200" trigger="hover" :content="'单价: $' + scope.row.goods.price">
                        <span slot="reference" class="goods">{{scope.row.goods.title}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="商品数量" prop="amount"></el-table-column>
            <el-table-column label="总价格">
                <template slot-scope="scope">
                    <span>${{scope.row.cost}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="80px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'OrderTable',
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
        handleEdit(index, row) {
            this.$emit('edit',row)
        }
    }
}
</script>
<style lang="less" scoped>
.order-table-container {
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
    .goods {
        cursor: pointer;
        color: #409eff;
    }
    .img-container {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
    }
}
</style>