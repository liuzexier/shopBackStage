<template>
    <div class="storedesc-container">
        <div class="main">
            <el-row class="select-bar">
                <el-input class="input" v-model="commodityName" placeholder="请输入商品名称"></el-input>
                <el-select class="input" clearable v-model="typeId" placeholder="请选择类别">
                    <el-option v-for="item in typeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
                <el-button @click="getDataList">搜索</el-button>
                <el-button class="add-btn" type="primary">添加商品</el-button>
            </el-row>

            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" :current-page.sync="page" :page-size.sync="pageSize" @current-change="handleCurrentChange" background layout="total, prev, pager, next" :total="count">
                </el-pagination>
            </div>
            
        </div>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
import { getGoodsByStoreAndType } from '@/api/stores.ts'
import { getAllType } from '@/api/type'
import TableMixin from '@/mixins/table-mixin.ts'
@Component({})
export default class StoreDesc extends TableMixin {
    private commodityName: string = ''
    private storeId: string | number = ''
    private typeId: string | number = ''
    private typeList: any[] = []
    created() {
        this.storeId = this.$route.params.id as string
        getAllType().then((res: any) => {
            this.typeList = res.dataSet
        })
        this.getDataList()
    }

    getDataList() {
        getGoodsByStoreAndType({
            page: this.page,
            pageSize: this.pageSize,
            storeId: this.storeId,
            typeId: this.typeId,
            commodityName: this.commodityName
        }).then((res: any) => {
            console.log(res)
        })
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
    }
}
</style>