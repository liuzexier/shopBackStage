<template>
    <div class="users-list-container">
        <el-row class="select-bar">
            <el-input class="input" clearable v-model="userName" placeholder="请输入用户名"></el-input>
            <el-input class="input" clearable v-model="userAccount" placeholder="请输入账号"></el-input>
            <el-select class="input" clearable v-model="userStatus" placeholder="请选择状态">
                <el-option v-for="item in userStatusList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="getTableData">搜索</el-button>
        </el-row>
        <div style="padding:20px;">
            <el-table :data="tableData" stripe border style="width: 100%">
                <el-table-column prop="userAccount" label="账号" min-width="160">
                    <template slot-scope="scope">
                        <a style="color:#409EFF;" @click.prevent="showDetail(scope.row)"
                            href="#">{{scope.row.userAccount}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="姓名" min-width="160">
                </el-table-column>
                <el-table-column prop="userStatus" label="用户状态">
                    <template slot-scope="scope">
                        <div>{{showStatusMap[scope.row.userStatus]}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="userType" label="用户类型">
                    <template slot-scope="scope">
                        <div>{{userType[scope.row.userType]}}</div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pagination">
            <el-pagination @size-change="getTableData" :current-page.sync="page" :page-size.sync="pageSize"
                @current-change="getTableData" background layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
        <users-desc v-if="showDialog" @update:dialogShow="dialogClose" :dialogShow.sync="showDialog"
            :detailData="userDetail"></users-desc>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
import UsersDesc from '@/views/users/desc/index.vue'
import { userType, showStatusMap, userStatus } from '@/config/index.ts'
import { getAllUser } from '@/api/users.ts'
import tableMixin from '@/mixins/table-mixin.ts'
@Component({
    components: {
        UsersDesc
    }
})
export default class UsersList extends tableMixin {
    private userName: string = ''
    private userAccount: string = ''
    private userStatus: string = ''
    private userStatusList: any[] = userStatus()
    private tableData: any[] = []
    private userType: string[] = userType
    private showStatusMap: any = showStatusMap
    private showDialog: any = false
    private userDetail: any = {}

    showDetail(row: any) {
        this.userDetail = row
        this.showDialog = true
    }

    dialogClose() {
        this.getTableData()
    }

    getTableData() {
        getAllUser({
            page: this.page,
            pageSize: this.pageSize,
            userName: this.userName,
            userAccount: this.userAccount,
            userStatus: this.userStatus
        }).then((res: any) => {
            this.count = res.dataSet.count
            this.tableData = res.dataSet.rows
        })
    }

    created() {
        this.getTableData()
    }
}
</script>
<style lang='less' scoped>
.users-list-container {
    background-color: #fff;
    // padding: 20px;
    .select-bar {
        background-color: #fff;
        border-bottom: 1px solid #f2f2f2;
        display: flex;
        padding: 10px 20px;
        position: relative;
        .input {
            width: 200px;
            margin-right: 20px;
        }
        .add-btn {
            position: absolute;
            right: 20px;
        }
    }
    .pagination {
        border-top: 1px solid #f2f2f2;
        padding: 20px;
        background-color: #fff;
        text-align: right;
    }
}
</style>