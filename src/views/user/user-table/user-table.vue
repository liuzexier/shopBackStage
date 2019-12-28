<template>
    <div class="user-table-container">
        <el-table ref="goods-table" @selection-change="selectChange" :data="tableData" border stripe style="width: 500px;">
            <el-table-column label="用户">
                <template slot-scope="scope">
                    <div class="username">
                        <el-image style="width: 30px; height: 30px" :src="'http://localhost:5000' + scope.row.avatar" :fit="'contain'"></el-image>
                        <span>{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="E-mail">
                <template slot-scope="scope">
                    <span v-if="!scope.row.email">未填写</span>
                    <span v-else>{{scope.row.email}}</span>
                </template>
            </el-table-column>
            <el-table-column label="电话号码">
                <template slot-scope="scope">
                    <span v-if="!scope.row.phone">未填写</span>
                    <span v-else>{{scope.row.phone}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name: 'UserTable',
    props: {
        tableData: {
            type: Array
        }
    },
    data() {
        return {}
    },
    methods: {
        selectChange() {}
    }
}
</script>
<style lang="less" scoped>
.user-table-container {
    .username {
        display: flex;
        align-items: center;
        span {
            cursor: pointer;
            color: #409eff;
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