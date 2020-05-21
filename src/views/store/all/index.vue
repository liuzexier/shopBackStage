<template>
    <div class="storelist-container">
        <el-row class="select-bar">
            <el-input class="input" clearable v-model="storeName" placeholder="请输入店铺名称"></el-input>
            <el-button @click="getTableData">搜索</el-button>
        </el-row>
        <el-row class="center">
            <el-card :span="5" v-for="item in tableData" :key="item.id" class="card"
                :class="[item.storeStatus=='HIDDEN'?'gray':'']" shadow="hover" :body-style="{ padding: '0px' }">
                <div v-if="item.storeStatus!='HIDDEN'" class="edit" @click="handleDelete(item)">
                    <svg-icon style="width:100%;height:100%;" icon-class="close" />
                </div>
                <div v-else class="edit" @click="handleRecovery(item)">
                    <svg-icon style="width:100%;height:100%;" icon-class="add" />
                </div>
                <el-image v-if="item.Image" class="image" :src="$downloadUrl + item.Image.imagePath" fit="cover">
                </el-image>
                <el-image v-else class="image" fit="cover"></el-image>
                <div style="padding: 14px;">
                    <span>{{item.storeName}}</span>
                    <div class="bottom clearfix">
                        <router-link :to="'desc/' + item.id">
                            <el-button type="text" class="button">进入店铺</el-button>
                        </router-link>
                        <el-tooltip class="item" effect="dark" :content="item.storeDesc" placement="top">
                            <time class="time">{{item.storeDesc}}</time>
                        </el-tooltip>
                    </div>
                </div>
            </el-card>
        </el-row>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" :current-page.sync="page" :page-size.sync="pageSize"
                @current-change="handleCurrentChange" background layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import TableMixin from '@/mixins/table-mixin.ts'
import { findAllStoresByPage, deleteStores } from '@/api/stores.ts'
@Component
export default class AllStoreList extends TableMixin {
    private currentDate: Date = new Date()
    private tableData: any[] = []
    private dialogVisible: boolean = false
    private storeData: any = null
    private storeName: string = ''

    created() {
        this.pageSize = 8
        this.getTableData()
    }

    @Watch('dialogVisible')
    dialogVisibleWatcher(newVal: boolean, oldVal: boolean) {
        if (!newVal) {
            this.getTableData()
        }
    }

    handleAdd() {
        this.storeData = null
        this.dialogVisible = true
    }

    handleRecovery(item: any) {
        this.$confirm('此操作将使店铺恢复为正常状态, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                return deleteStores({
                    idList: [item.id],
                    type: 'recovery'
                })
            })
            .then((res: any) => {
                this.$message.success('恢复成功')
                this.getTableData()
            })
            .catch(() => {})
    }

    handleDelete(item: any) {
        this.$confirm('此操作将关闭店铺, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                return deleteStores({
                    idList: [item.id]
                })
            })
            .then((res: any) => {
                this.$message.success(res.msg || '删除成功')
                this.getTableData()
            })
            .catch(() => {})
    }

    getTableData() {
        findAllStoresByPage({
            page: this.page,
            pageSize: this.pageSize,
            name: this.storeName
        }).then((res: any) => {
            this.count = res.dataSet.count
            this.tableData = res.dataSet.rows
        })
    }
}
</script>
<style lang='less' scoped>
.storelist-container {
    background-color: #fff;
    padding: 10px;
    .gray {
        filter: grayscale(1);
    }
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
    .title {
        padding-bottom: 10px;
        border-bottom: 1px solid #f2f2f2;
    }
    .center {
        margin-top: 10px;
        // display: flex;
        .card {
            display: inline-block;
            margin-right: 20px;
            margin-bottom: 20px;
            position: relative;
            width: 200px;
            .edit {
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.4);
                cursor: pointer;
                position: absolute;
                z-index: 1;
                right: 5px;
                top: 5px;
                width: 20px;
                height: 20px;
            }
            .time {
                font-size: 13px;
                color: #999;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                width: calc(100% - 60px);
                display: block;
            }
            .bottom {
                margin-top: 13px;
                line-height: 12px;
                height: 20px;
                .button {
                    padding: 0;
                    float: right;
                }
                .time {
                    cursor: pointer;
                    font-size: 13px;
                    color: #999;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: calc(100% - 60px);
                    display: block;
                    height: 100%;
                }
            }

            .image {
                width: 100%;
                display: block;
                height: 200px;
            }
            .clearfix:before,
            .clearfix:after {
                display: table;
                content: '';
            }
            .clearfix:after {
                clear: both;
            }
        }
    }

    .pagination {
        padding: 20px;
        background-color: #fff;
        text-align: right;
    }
}
</style>