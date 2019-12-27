<template>
    <div>
        <el-form :model="formData">
            <div class="form-container">
                <el-form-item label="商品名称" class="el-form-item">
                    <el-input class="input" v-model="formData.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="商品类别">
                    <el-select class="select" v-model="formData.goodsType" placeholder="请选择商品类别">
                        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品价格">
                    <!-- <el-input class="input" v-model="formData.goodsPrice"></el-input> -->
                    <el-input-number v-model="goodsPrice" :min="0" label="描述文字"></el-input-number>
                    <span>(元)</span>
                </el-form-item>
                <el-form-item label="商品详情">
                    <el-input class="input" type="textarea" v-model="formData.goodsDescription"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <!-- <el-input class="input" v-model="formData.goodsCount"></el-input> -->
                    <el-input-number v-model="formData.goodsCount" :min="1" :max="100000" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="商品图片">
                    <el-upload class="upload" action="/api/upload" list-type="picture-card" :file-list="fileList" :on-success="handleSuccess" :on-remove="onRemove" :auto-upload="true" :limit="3" multiple>
                        <i slot="default" class="el-icon-plus"></i>
                        <div slot="file" slot-scope="{file}">
                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                </span>
                            </span>
                        </div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品状态">
                    <el-select class="select" v-model="formData.goodsStatus" placeholder="请选择商品状态">
                        <el-option label="上架" value="1"></el-option>
                        <el-option label="下架" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
import { updateGoods, getGoodsById } from '@/api/goods.js'
export default {
    name: 'edit-goods',
    props: {
        editId: {
            type: Number | String,
            default: -1
        },
        typeList: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            formData: {
                goodsName: '',
                goodsType: '',
                goodsPrice: 0,
                goodsDescription: '',
                goodsCount: 0,
                goodsStatus: '1'
            },
            fileList: []
        }
    },
    created() {
        getGoodsById({
            id: this.editId
        }).then(res => {
            // console.log(res)
            this.formData.goodsName = res.data.title
            this.formData.goodsType = res.data.type_id
            this.formData.goodsPrice = res.data.price
            this.formData.goodsDescription = res.data.description
            this.formData.goodsCount = res.data.count
            ;(this.formData.goodsStatus = res.data.status + ''),
                (this.fileList = res.data.imgs.map(item => {
                    return {
                        name: item.url,
                        percentage: 100,
                        status: 'success',
                        url: 'http://localhost:5000' + item.url,
                        response: item
                    }
                }))
        })
    },
    methods: {
        handleRemove(file) {
            // console.log(file)
            // console.log(this.fileList)
            this.fileList = this.fileList.filter(item => {
                if (item.name === file.name) {
                    return false
                } else {
                    return true
                }
            })
        },
        resetForm() {
            this.formData.goodsName = ''
            this.formData.goodsType = ''
            this.formData.goodsPrice = 0
            this.formData.goodsDescription = ''
            this.formData.goodsCount = 0
            this.formData.goodsStatus = '1'
        },
        handleSuccess(response, file, fileList) {
            this.fileList = fileList
        },
        onRemove(file, fileList) {
            this.fileList = fileList
        },
        submit() {
            let imgs = this.fileList.map(item => {
                if (item.response.url) {
                    return item.response.url
                } else {
                    return item.response.data.filePath
                }
            })
            // console.log(imgs)
            return new Promise((resolve, reject) => {
                updateGoods({
                    id: this.editId,
                    goods: JSON.stringify({
                        title: this.formData.goodsName,
                        type_id: this.formData.goodsType,
                        price: this.formData.goodsPrice,
                        description: this.formData.goodsDescription,
                        count: this.formData.goodsCount,
                        status: this.formData.goodsStatus
                    }),
                    imgs: JSON.stringify(imgs)
                })
                    .then(res => {
                        this.resetForm()
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }
    },
    computed: {
        goodsPrice: {
            get: function() {
                return this.formData.goodsPrice
            },
            set: function(value) {
                this.formData.goodsPrice = value
            }
        }
    }
}
</script>
<style lang="less" scoped>
.form-container {
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
</style>