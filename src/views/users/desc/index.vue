<template>
    <div class="users-desc-container">
        <el-dialog title="用户信息" :visible="visible" :before-close="handleClose">
            <div class="dialog-content">
                <div class="row">
                    <span>用户名：</span>{{detailData.userName}}
                </div>
                <div class="row">
                    <span>账号：</span>{{detailData.userAccount}}
                </div>
                <div class="row">
                    <span>状态：</span>
                    <el-select v-model="userStatus" placeholder="请选择">
                        <el-option v-for="item in userStatusList" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="row">
                    <span>用户类型：</span>{{userType[detailData.userType]}}
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component, Emit } from 'vue-property-decorator'
import { userType, showStatusMap } from '@/config/index.ts'
import { updateOther } from '@/api/users.ts'
@Component
export default class UsersDesc extends Vue {
    @Prop({ type: Boolean, default: false }) dialogShow!: boolean
    @Prop({ type: Object }) detailData!: any

    private userType: string[] = userType
    private showStatusMap: any = showStatusMap
    private visible: boolean = false
    private userStatus: string = ''
    private userStatusList: any = [
        { label: '正常', value: 'DEFAULT' },
        { label: '已删除', value: 'DELEATED' }
    ]

    created() {
        this.$nextTick(() => {
            this.visible = true
            this.userStatus = this.detailData.userStatus
        })
    }

    @Emit('update:dialogShow')
    async submit() {
        const res: any = await updateOther({
            id: this.detailData.id,
            userStatus: this.userStatus
        })
        if (res.resultCode == 'Success') {
            this.$message.success(res.msg)
        }
        return false
    }

    @Emit('update:dialogShow')
    handleClose() {
        this.visible = false
        return false
    }
}
</script>
<style lang='less' scoped>
.users-desc-container {
    /deep/.el-dialog__body {
        padding: 0 20px;
    }
    .dialog-content {
        padding: 20px;
        .row {
            padding: 10px 0;
            line-height: 1.9;
            font-size: 16px;
            color: #999;
            border-bottom: 1px solid #f2f2f2;
            &:last-of-type {
                border: none;
            }
            span {
                color: #000;
            }
        }
    }
}
</style>