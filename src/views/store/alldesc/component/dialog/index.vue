<template>
  <div class="addgoods-container">
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        :model="formData"
        label-width="80px"
      >
        <el-form-item
          class="label"
          label="商品名称"
        >
          <el-input
            v-model="formData.commodityName"
            placeholder="商品名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="label"
          label="商品价格"
        >
          <!-- <el-input v-model="formData.commodityPrice" placeholder="商品价格"></el-input> -->
          <el-input-number
            v-model="formData.commodityPrice"
            :precision="2"
            :min="0"
            :step="1"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item
          class="label"
          label="商品折扣"
        >
          <!-- <el-input v-model="formData.commodityDiscount" placeholder="商品折扣"></el-input> -->
          <el-input-number
            v-model="formData.commodityDiscount"
            :precision="2"
            :step="0.01"
            :min="0"
            :max="1"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item
          class="label"
          label="商品数量"
        >
          <el-input-number
            v-model="formData.commodityNumber"
            :precision="0"
            :min="0"
            :step="1"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item
          class="label"
          label="商品类型"
        >
          <el-select
            v-model="formData.types"
            filterable
            multiple
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="label"
          label="商品图片"
        >
          <el-upload
            :action="$uploadUrl"
            :file-list="fileList"
            list-type="picture-card"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            accept="image/png, image/jpeg"
            :multiple="true"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          v-if="dataInfo.id&&dataInfo.commodityStatus!=='DELEATED'"
          @click="deleteCommodity"
          type="danger"
        >删除</el-button>
        <el-button
          v-if="dataInfo.id&&dataInfo.commodityStatus=='DELEATED'"
          @click="reset"
          type="danger"
        >恢复</el-button>
        <el-button
          type="primary"
          v-if="!dataInfo.id"
          @click="onSubmit"
        >立即创建</el-button>
        <el-button
          type="primary"
          v-else
          @click="onUpdate"
        >修改</el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang ='ts'>
import { Vue, Prop, Component, Emit } from 'vue-property-decorator'
import {
  createCommodity,
  deleteCommoditys,
  updateCommoditys,
  resetCommodity
} from '@/api/commodity.ts'
@Component({})
export default class AddGoodsDialog extends Vue {
  // @Prop() title!: string
  @Prop() dialogVisible!: boolean
  @Prop() typeList!: any[]
  @Prop() dataInfo!: any
  private showDialog: boolean = false
  private title: string = ''
  private fileList: any[] = []
  private formData: any = {
    commodityName: '',
    commodityPrice: '',
    commodityDiscount: '1',
    commodityNumber: '',
    types: [],
    images: []
  }

  created() {
    if (this.dataInfo.id) {
      this.title = '修改商品'
      this.formData.commodityName = this.dataInfo.commodityName
      this.formData.commodityPrice = this.dataInfo.commodityPrice
      this.formData.commodityDiscount = this.dataInfo.commodityDiscount
      this.formData.commodityNumber = this.dataInfo.commodityNumber
      this.formData.images = this.dataInfo.Images.map((item: any) => {
        return {
          fileName: item.imageName,
          filePath: item.imagePath
        }
      })
      if (this.dataInfo.Images) {
        this.fileList = this.dataInfo.Images.map((item: any) => {
          return {
            name: item.imageName,
            url: this.$downloadUrl + item.imagePath
          }
        })
      }
      this.formData.types = this.dataInfo.Types.map((item: any) => {
        return item.id
      })
    } else {
      this.title = '添加商品'
    }
  }

  reset() {
    resetCommodity({ id: this.dataInfo.id }).then((res: any) => {
      this.$message.success(res.msg)
      this.handleClose()
    })
  }

  mounted() {
    this.$nextTick(() => {
      this.showDialog = true
    })
  }

  handleSuccess(res: any, file: any, fileList: any[]) {
    this.fileList = fileList
    this.formData.images = fileList.map((item: any) => {
      if (!item.response) return
      return item.response.dataSet
    })
  }

  handleRemove(file: any, fileList: any[]) {
    this.fileList = fileList
    this.formData.images = fileList.map((item: any) => {
      return item.response.dataSet
    })
  }

  onSubmit() {
    createCommodity({
      ...this.formData,
      storeId: this.$route.params.id
    }).then((res: any) => {
      // console.log(res)
      this.$message.success(res.msg)
      this.handleClose()
    })
  }

  deleteCommodity() {
    this.$confirm('此操作将删除商品, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        return deleteCommoditys({
          idList: [this.dataInfo.id]
        })
      })
      .then((res: any) => {
        this.$message.success(res.msg || '删除成功')
        this.handleClose()
      })
      .catch(() => {})
  }

  onUpdate() {
    updateCommoditys({
      commodityId: this.dataInfo.id,
      ...this.formData,
      storeId: this.$route.params.id
    }).then((res: any) => {
      this.$message.success(res.msg || '修改成功')
      this.handleClose()
    })
  }

  @Emit('update:dialogVisible')
  handleClose() {
    return false
  }
}
</script>
<style lang='less' scoped>
.addgoods-container {
  /deep/.label {
    label {
      font-weight: 400;
      color: #000;
    }
  }
}
</style>