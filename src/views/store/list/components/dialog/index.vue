<template>
    <div class="addstoredialog-container">
        <el-dialog title="新建店铺" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="店铺名称">
                    <el-input v-model="form.storeName"></el-input>
                </el-form-item>
                <el-form-item label="店铺介绍">
                    <el-input type="textarea" v-model="form.storeDesc"></el-input>
                </el-form-item>
                <el-form-item label="店铺图片">
                    <el-upload :action="''|upload" list-type="picture-card" :on-success="handleSuccess" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component, Emit } from 'vue-property-decorator'
import { createStore } from '@/api/stores.ts'
@Component({})
export default class AddStoreDialog extends Vue {
    @Prop() dialogVisible!: boolean

    @Emit('update:dialogVisible')
    handleClose() {
        return false
    }

    private form: any = {
        storeName: '',
        storeDesc: '',
        imageName: '',
        imagePath: ''
    }

    handleSuccess(res: any, file: File, fileList: File[]) {
        console.log(res)
        this.form.imageName = res.dataSet.fileName
        this.form.imagePath = res.dataSet.filePath
    }

    handleRemove(file: File, fileList: File[]) {}

    submit() {
        createStore({
            storeName: this.form.storeName,
            storeDesc: this.form.storeDesc,
            imageName: this.form.imageName,
            imagePath: this.form.imagePath
        }).then((res: any) => {
            this.$message.success(res.msg || '创建成功')
            this.handleClose()
        })
    }
}
</script>
<style lang='less' scoped>
.addstoredialog-container {
}
</style>