<template>
    <div class="dialog-container">
        <el-dialog close="dialog" title="更改订单状态" width="540px" :visible="visiable" @close="$emit('update:visiable',false)">
            <!-- 订单编辑 -->
            <div class="container">
                <el-form>
                    <el-form-item label="订单状态">
                        <el-select class="select" v-model="status" placeholder="请选择状态">
                            <el-option v-for="item in statusList" :key="item.id" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="$emit('update:visiable',false)">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { updateOrderStatus } from '@/api/order.js'
export default {
    name: 'OrderDialog',
    props: {
        visiable: {
            type: Boolean,
            default: false
        },
        order: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            status: -1,
            statusList: [
                { label: '未付款', value: 0 },
                { label: '已付款', value: 1 },
                { label: '已发货', value: 2 }
            ]
        }
    },
    created() {
        this.status = this.order.status
    },
    methods: {
        submit() {
            // console.log(this.status)
            // console.log(this.order.id)
            updateOrderStatus({
                orderid: this.order.id,
                status: this.status
            }).then(res => {
                if (res.status === 1) {
                    this.$message.success('修改成功')
                }
                this.$emit('update:visiable', false)
                this.$parent.getData()
            })
        }
    }
}
</script>
<style lang="less" scoped>
.dialog-container {
    /deep/ .dialog {
        .el-dialog__body {
            padding-top: 0px;
            padding-bottom: 0px;
        }
    }
    .container {
        width: 500px;
        .el-form-item {
            display: flex;
            .input {
                width: 420px;
            }
            .select {
                width: 420px;
            }
            .upload {
                width: 420px;
            }
        }
    }
}
</style>