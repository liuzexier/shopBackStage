<template>
    <div class="user-table-container">
        <el-table ref="goods-table" @selection-change="selectChange" :data="tableData" border stripe style="width: 100%">
            <el-table-column label="用户"></el-table-column>
            <el-table-column label="用户"></el-table-column>
            <el-table-column label="用户"></el-table-column>
            <el-table-column label="用户"></el-table-column>
            <el-table-column label="用户"></el-table-column>
            <el-table-column label="用户"></el-table-column>
            <el-table-column label="用户"></el-table-column>
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