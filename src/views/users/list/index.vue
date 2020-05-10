<template>
    <div class="users-list-container">
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
        <users-desc v-if="showDialog" :dialogShow.sync="showDialog" :detailData="userDetail"></users-desc>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
import UsersDesc from '@/views/users/desc/index.vue'
import { userType, showStatusMap } from '@/config/index.ts'
import { getAllUser } from '@/api/users.ts'
import tableMixin from '@/mixins/table-mixin.ts'
@Component({
    components: {
        UsersDesc
    }
})
export default class UsersList extends tableMixin {
    private tableData: any[] = []
    private userType: string[] = userType
    private showStatusMap: any = showStatusMap
    private showDialog: any = false
    private userDetail: any = {}

    showDetail(row: any) {
        this.userDetail = row
        this.showDialog = true
    }

    created() {
        getAllUser({
            page: this.page,
            pageSize: this.pageSize
        }).then((res: any) => {
            this.count = res.dataSet.count
            this.tableData = res.dataSet.rows
        })
    }
}
</script>
<style lang='less' scoped>
.users-list-container {
    background-color: #fff;
    padding: 20px;
}
</style>