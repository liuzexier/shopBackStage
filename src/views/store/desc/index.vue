<template>
    <div class="storedesc-container">
        <div class="main">
            <el-row class="select-bar">
                <el-input class="input" v-model="commodityName" placeholder="请输入商品名称"></el-input>
                <el-select class="input" clearable v-model="typeId" placeholder="请选择类别">
                    <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
                <el-button @click="getDataList">搜索</el-button>
                <el-button class="add-btn" type="primary" @click="addCommodity">添加商品</el-button>
            </el-row>
            <el-row class="center">
                <el-card :span="5" v-for="item in tableData" :key="item.id" class="card" shadow="hover" :body-style="{ padding: '0px' }">
                    <div class="edit" @click="handleEdit(item)">
                        <svg-icon style="width:100%;height:100%;" icon-class="icon-edit" />
                    </div>
                    <el-image v-if="item.Images[0]" class="image" :src="$downloadUrl + item.Images[0].imagePath" fit="cover" :preview-src-list="item.Images|previewFilter"></el-image>
                    <el-image v-else class="image" :src="$downloadUrl" fit="cover"></el-image>
                    <div style="padding: 14px;">
                        <div class="title">
                            <p>{{item.commodityName}}</p>
                            <p>￥{{item.commodityPrice}}</p>
                        </div>
                        <div class="bottom">
                            <p>库存：{{item.commodityNumber}}</p>
                            <p type="text" v-if="item.commodityDiscount<1">-{{item.commodityDiscount|discount}}%</p>
                        </div>
                        <template>
                            <el-tag class="tags" v-for="subitem in item.Types" :key="subitem.id" size="mini">{{subitem.typeName}}</el-tag>
                            <!-- <el-tag class="tags" v-for="(item, index) in '11111111111111111'" :key="index" size="mini">giao</el-tag> -->
                        </template>
                    </div>
                </el-card>
            </el-row>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" :current-page.sync="page" :page-size.sync="pageSize" @current-change="handleCurrentChange" background layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            <add-goods-dialog :dataInfo="dataInfo" v-if="dialogVisible" :typeList="typeList" :dialogVisible.sync="dialogVisible"></add-goods-dialog>
        </div>
    </div>
</template>
<script lang ='ts'>
import AddGoodsDialog from '@/views/store/desc/component/dialog/index.vue'
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'
import { getGoodsByStoreAndType } from '@/api/stores.ts'
import { getAllType } from '@/api/type'
import TableMixin from '@/mixins/table-mixin.ts'
@Component({
    components: {
        AddGoodsDialog
    }
})
export default class StoreDesc extends TableMixin {
    private commodityName: string = ''
    private storeId: string | number = ''
    private typeId: string | number = ''
    private typeList: any[] = []
    private dialogVisible: boolean = false
    private tableData: any[] = []
    private dataInfo: any = {}
    created() {
        this.storeId = this.$route.params.id as string
        getAllType().then((res: any) => {
            this.typeList = res.dataSet
        })
        this.getDataList()
    }

    @Watch('dialogVisible')
    dialogVisibleWatcher(newVal: boolean, oldVal: boolean) {
        if (newVal == false) {
            this.dataInfo = {}
            this.getDataList()
        }
    }

    handleEdit(item: any) {
        console.log(item)
        this.dataInfo = item
        this.dialogVisible = true
    }

    getDataList() {
        getGoodsByStoreAndType(
            {
                page: this.page,
                pageSize: this.pageSize,
                storeId: this.storeId
            },
            {
                commodityName: this.commodityName,
                typeId: this.typeId
            }
        ).then((res: any) => {
            this.count = res.dataSet.count
            this.tableData = res.dataSet.rows
        })
    }

    //添加商品
    addCommodity() {
        this.dialogVisible = true
    }
}
</script>
<style lang='less' scoped>
.storedesc-container {
    .main {
        background-color: #fff;
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
            text-align: right;
        }
        .center {
            // margin-top: 10px;
            padding: 20px;
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
                    margin: 0;
                    font-size: 13px;
                    color: #999;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: calc(100% - 60px);
                    display: block;
                }
                .discount {
                    margin: 0;
                    font-size: 13px;
                    color: #999;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: calc(100% - 60px);
                    display: block;
                }
                .title {
                    p {
                        margin: 0;
                    }
                    margin-bottom: 7px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    > p:nth-of-type(2) {
                        color: red;
                    }
                }
                .tags {
                    margin-top: 5px;
                    margin-right: 7px;
                }
                .bottom {
                    // margin-top: 13px;
                    line-height: 12px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    p:nth-of-type(1) {
                        margin: 0;
                        font-size: 13px;
                        color: #909399;
                    }
                    p:nth-of-type(2) {
                        margin: 0;
                        color: #67c23a;
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
    }
}
</style>