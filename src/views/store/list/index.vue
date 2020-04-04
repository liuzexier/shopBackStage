<template>
    <div class="storelist-container">
        <el-row class="title">
            <el-col :span="4">
                <el-button type="primary" @click="handleAdd()">新建店铺</el-button>
            </el-col>
        </el-row>
        <el-row class="center">
            <el-col :span="5" v-for="(item,index) in tableData" :key="item.id" :offset="index%4>0?1:0">
                <el-card class="card" shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="edit" @click="handleEdit(item)">
                        <svg-icon style="width:100%;height:100%;" icon-class="icon-edit" />
                    </div>
                    <!-- <img :src="item.Image.imagePath|download" class="image"> -->
                    <el-image class="image" :src="item.Image.imagePath|download" fit="cover"></el-image>
                    <!-- <video class="image" :src="item.Image.imagePath|download"></video> -->
                    <div style="padding: 14px;">
                        <span>{{item.storeName}}</span>
                        <div class="bottom clearfix">
                            <el-button type="text" class="button">进入店铺</el-button>
                            <el-tooltip class="item" effect="dark" :content="item.storeDesc" placement="top">
                                <time class="time">{{item.storeDesc}}</time>
                            </el-tooltip>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="pagination">
            <el-pagination @size-change="handleSizeChange" :current-page.sync="page" :page-size.sync="pageSize" @current-change="handleCurrentChange" background layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
        <add-store-dialog v-if="dialogVisible" :dialogVisible.sync="dialogVisible"></add-store-dialog>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import TableMixin from '@/mixins/table-mixin.ts'
import { findMyStoresByPage } from '@/api/stores.ts'
import AddStoreDialog from './components/dialog/index.vue'
@Component({
    components: {
        AddStoreDialog
    }
})
export default class StoreList extends TableMixin {
    private currentDate: Date = new Date()
    private tableData: any[] = []
    private dialogVisible: boolean = false

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
        this.dialogVisible = true
    }

    handleEdit(item: any) {
        console.log(item)
    }

    getTableData() {
        findMyStoresByPage({
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
.storelist-container {
    background-color: #fff;
    padding: 10px;
    .title {
        padding-bottom: 10px;
        border-bottom: 1px solid #f2f2f2;
    }
    .center {
        margin-top: 10px;
        .card {
            margin-bottom: 20px;
            position: relative;
            .edit {
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
        text-align: right;
    }
}
</style>