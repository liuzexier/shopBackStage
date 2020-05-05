<template>
    <div class="order-list-container">
        <el-table :data="tableData" style="width: 100%" @expand-change="expandChange">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <div class="info">
                        <ul class="goodlist">
                            <li v-for="item in scope.row.Commodities" :key="item.id">
                                <el-image v-if="!item.Images[0]" class="image" :src="''" fit="cover">
                                </el-image>
                                <el-image v-else class="image" :src="$downloadUrl+item.Images[0].imagePath" fit="cover">
                                </el-image>
                                <div class="center">
                                    <div>名称:{{item.commodityName}}</div>
                                    <div>价格:￥{{item.commodityPrice}}</div>
                                    <div>数量:{{item.OrderToCommodity.count}}</div>
                                </div>
                            </li>
                        </ul>
                        <div class="right" v-if="scope.row.Address">
                            <div>收货人:{{scope.row.Address.addressName}}</div>
                            <div>地址:{{scope.row.Address.addressCode|addressFilter}}{{scope.row.Address.addressDetail}}
                            </div>
                            <div>电话:{{scope.row.Address.addressPhone}}</div>
                        </div>
                        <div class="money">
                            ￥{{getTotalPrice(scope.row)}}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="订单号" prop="orderCode">
            </el-table-column>
            <el-table-column label="创建时间" prop="orderCreatTime">
                <template slot-scope="scope">
                    <p>{{scope.row.orderCreatTime|date-filter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="更新时间" prop="orderUpdateTime">
                <template slot-scope="scope">
                    <p>{{scope.row.orderUpdateTime|date-filter}}</p>
                </template>
            </el-table-column>
            <el-table-column label="订单状态" prop="orderStatus">
                <template slot-scope="scope">
                    <!-- <p>{{scope.row.orderStatus|showStatusFilter}}</p> -->
                    <el-tag size="small" v-if="scope.row.orderStatus==orderStatusMap.INIT" effect="dark">
                        {{scope.row.orderStatus|showStatusFilter}}
                    </el-tag>
                    <el-tag size="small" type='danger' v-if="scope.row.orderStatus==orderStatusMap.PAYED" effect="dark">
                        {{scope.row.orderStatus|showStatusFilter}}
                    </el-tag>
                    <el-tag size="small" type='danger' v-if="scope.row.orderStatus==orderStatusMap.TOBEDELIVERED"
                        effect="plain">
                        {{scope.row.orderStatus|showStatusFilter}}
                    </el-tag>
                    <el-tag size="small" type='warning' v-if="scope.row.orderStatus==orderStatusMap.WAITTING"
                        effect="dark">
                        {{scope.row.orderStatus|showStatusFilter}}
                    </el-tag>
                    <el-tag size="small" type='success' v-if="scope.row.orderStatus==orderStatusMap.COMPLETE"
                        effect="dark">
                        {{scope.row.orderStatus|showStatusFilter}}
                    </el-tag>
                    <el-tag size="small" type='info' v-if="scope.row.orderStatus==orderStatusMap.CANCELED"
                        effect="dark">
                        {{scope.row.orderStatus|showStatusFilter}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="店铺" prop="Store.storeName">
            </el-table-column>
            <el-table-column label="操作" align="right">
                <template slot-scope="scope">
                    <!-- <template v-if="condition"> -->
                    <el-button size="small" @click="acceptPay(scope.row)" v-if="scope.row.orderStatus=='PAYED'">确认收款
                    </el-button>
                    <el-button size="small" @click="toDelive(scope.row)" v-if="scope.row.orderStatus=='TOBEDELIVERED'">
                        去发货</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @size-change="getOrderList" :current-page.sync="page" :page-size.sync="pageSize"
                @current-change="getOrderList" background layout="total, prev, pager, next" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator'
import TableMixin from '@/mixins/table-mixin.ts'
import { findOrderByPage, changeOrderStatus } from '@/api/order.ts'
import { getAddressByCode } from '@/utils/area.ts'
import { orderStatusMap } from '@/config'
@Component({
    filters: {
        addressFilter(val: number) {
            return getAddressByCode(val)
        }
    }
})
export default class OrderList extends TableMixin {
    private tableData: any[] = []
    private orderStatusMap: any = orderStatusMap

    created() {
        this.getOrderList()
    }

    expandChange(expandedRows: any, expanded: any) {
        // console.log(expandedRows)
        // console.log(expanded)
    }

    acceptPay(row: any) {
        this.$confirm('确认已付款?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                changeOrderStatus({
                    status: orderStatusMap.TOBEDELIVERED,
                    orderId: row.id
                }).then((res: any) => {
                    this.$message.success(res.msg)
                    this.getOrderList()
                })
            })
            .catch(() => {})
    }

    toDelive(row: any) {
        this.$confirm('确认发货?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                changeOrderStatus({
                    status: orderStatusMap.WAITTING,
                    orderId: row.id
                }).then((res: any) => {
                    this.$message.success('发货成功')
                    this.getOrderList()
                })
            })
            .catch(() => {})
    }

    getOrderList() {
        findOrderByPage({
            page: this.page,
            pageSize: this.pageSize
        }).then((res: any) => {
            this.count = res.dataSet.count
            this.tableData = res.dataSet.rows
        })
    }

    getTotalPrice(row: any) {
        let total: number = 0
        for (let i = 0; i < row.Commodities.length; i++) {
            const element = row.Commodities[i]
            total += element.commodityPrice * element.OrderToCommodity.count
        }
        return total.toFixed(2)
    }
}
</script>
<style lang='less' scoped>
.order-list-container {
    /deep/.el-table__expanded-cell {
        padding: 0;
        margin: 10px 0;
    }
    .info {
        margin: 10px;
        display: flex;
        align-items: center;
        line-height: 1.5;
        border: 1px solid #e3e3e3;
        justify-content: space-between;
        position: relative;
        .goodlist {
            list-style: none;
            margin: 0;
            padding: 0;
            border-right: 1px solid #e3e3e3;
            li {
                display: flex;
                border-bottom: 1px solid #e3e3e3;
                padding: 10px;
                width: 400px;
                &:last-of-type {
                    border-bottom: none;
                }
                .image {
                    width: 100px;
                    height: 100px;
                }
                .center {
                    margin-left: 20px;
                    font-size: 14px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }
            }
        }
        .right {
            width: 100%;
            margin-left: 20px;
        }
        .money {
            color: red;
            padding: 20px;
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            border-left: 1px solid #e3e3e3;
            display: flex;
            align-items: center;
        }
    }
    .pagination {
        text-align: right;
    }
}
</style>