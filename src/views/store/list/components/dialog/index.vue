<template>
    <div class="addstoredialog-container">
        <el-dialog :title="title" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="店铺名称">
                    <el-input v-model="form.storeName"></el-input>
                </el-form-item>
                <el-form-item label="店铺介绍">
                    <el-input type="textarea" v-model="form.storeDesc"></el-input>
                </el-form-item>
                <el-form-item label="店铺图片">
                    <el-upload :action="$uploadUrl" :file-list="fileList" list-type="picture-card"
                        :on-success="handleSuccess" :on-remove="handleRemove" accept="image/png, image/jpeg" :limit="1"
                        :multiple="false">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="delete" type="danger" @click="handleDelete()" plain>删 除</el-button>
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component, Emit } from 'vue-property-decorator'
import { createStore, updateStore, deleteStores } from '@/api/stores.ts'
@Component({})
export default class AddStoreDialog extends Vue {
    @Prop() dialogVisible!: boolean
    @Prop() storeData!: any

    private fileList: any[] = []
    private title: string = ''

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

    created() {
        if (this.storeData) {
            this.title = '修改店铺'
            this.form.storeName = this.storeData.storeName
            this.form.storeDesc = this.storeData.storeDesc
            if (this.storeData.Image) {
                this.form.imageName = this.storeData.Image.imageName
                this.form.imagePath = this.storeData.Image.imagePath
                this.fileList[0] = {
                    name: this.storeData.Image.imageName,
                    url: this.$downloadUrl + this.storeData.Image.imagePath
                }
            }
        } else {
            this.title = '新建店铺'
        }
    }

    handleSuccess(res: any, file: File, fileList: File[]) {
        console.log(res)
        this.form.imageName = res.dataSet.fileName
        this.form.imagePath = res.dataSet.filePath
    }

    handleRemove(file: File, fileList: File[]) {}
    handleDelete() {
        this.$confirm('此操作将永久删除店铺, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
                return deleteStores({
                    idList: [this.storeData.id]
                })
            })
            .then((res: any) => {
                this.$message.success(res.msg || '删除成功')
                this.handleClose()
            })
            .catch(() => {})
    }

    submit() {
        if (this.storeData) {
            updateStore({
                imageId: this.storeData.Image ? this.storeData.Image.id : null,
                storeId: this.storeData.id,
                storeName: this.form.storeName,
                storeDesc: this.form.storeDesc,
                imageName: this.form.imageName,
                imagePath: this.form.imagePath
            }).then((res: any) => {
                this.$message.success(res.msg || '修改成功')
                this.handleClose()
            })
        } else {
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
}
</script>
<style lang='less' scoped>
.addstoredialog-container {
    .dialog-footer {
        position: relative;
        width: 100%;
        display: block;
        .delete {
            position: absolute;
            left: 0;
        }
    }
}
</style>