import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

// 样式文件
import './Excel.scss'
import { isFunction } from '../utils/prop-types/utils'
import { isExcel, validateFileSize } from './utils'
import { isObject } from 'lodash'

export const ufinUploadExcelProps = {
  // 文件的上次的 URL 地址
  url: PropTypes.string,
  // 文件上次 url 地址前缀
  urlPrefix: PropTypes.string.def(process.env.VUE_APP_BASE_URL),

  // 上传文件的最大大小
  size: PropTypes.number.def(2 * 1024 * 1024),

  unit: PropTypes.string.def('MB'),

  // 上传时附带的额外参数
  data: PropTypes.object,

  onSuccess: PropTypes.func,

  onError: PropTypes.func,

  autoUpload: PropTypes.bool.def(true),

  // 上传的文件字段名
  name: PropTypes.string.def('file'),

  //  是否显示文件
  showFileList: PropTypes.bool.def(false),

  //  是否显示文件
  limit: PropTypes.string.def(1),

  // excel 接受的文件类型
  accept: PropTypes.string.def(
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  )
}

const ufinUploadExcel = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}UploadExcel`,
  props: ufinUploadExcelProps,
  data() {
    return {
      fileText: 'Excel',
      allowTypes: ['xlsx', 'xlx'],

    }
  },
  computed: {

  },

  render(h) {
    const { url, accept, name, limit, data, onSuccess, showFileList } = this

    const uploadSuccess = (response, file) => {
      // 清除上传的内容
      this.$refs.uploadExcel.clearFiles()

      // 错误处理
      const { status, errorMsg } = response
      if (status !== '0') {
        this.$message({
          message: `${errorMsg}`,
          type: 'error'
        })
        isFunction(this.onError) && this.onError(res, file)
        return
      }

      if (isFunction(onSuccess)) {
        onSuccess(response, file)
        return
      }
      this.$message({
        message: `上传 ${this.file.fileName} 成功`,
        type: 'success'
      })
    }

    // 上传到页面前进行检查
    const beforeExcelUpload = (file) => {
      // 判断文件类型 windows下accept无效
      let isExcelFile = isExcel(file)
      const isLtMaxSize = validateFileSize(file, this.size)

      // 提示错误信息
      if (!isExcelFile) {
        this.$message.error(
          `上传${this.fileText}只能是 ${allowTypes.join(',')} 格式!`
        )
      }
      if (!isLtMaxSize) {
        this.$message.error(
          `上传${this.fileText}大小不能超过 ${this.size}${this.unit || 'KB'}!`
        )
      }
      return isExcelFile && isLtMaxSize
    }

    const onUpload = () => {
      // 创建上传的对象
      const param = new FormData() // 创建form对象
      // 上传的文件
      param.append(this.name, this.file.file.raw, this.file.fileName) // 通过append向form对象添加数据
      // 是否存在其他数据
      if (isObject(this.data)) {
        Object.keys(this.data).forEach((key) => {
          param.append(key, this.data[key]) // 通过append向form对象添加数据
        })
      }

      if (this.autoUpload) {
        const that = this

        this.$axios.upload(url, param, {}).then((res) => {
          uploadSuccess(res, this.file.file)

          // this.percentage = 0
        })
      } else {
        this.$emit('input', param)
      }
    }

    const onChange = (file, fileList) => {
      this.file = {
        file: file,
        fileName: file.name
      }
      onUpload()
    }

    return (
      <el-upload
        ref="uploadExcel"
        action={''}
        accept={accept}
        limit={limit}
        before-upload={beforeExcelUpload}
        {...{
          props: {
            'on-change': onChange,
            'on-success': uploadSuccess
          }
        }}
        show-file-list={showFileList}
        auto-upload={false}
        style="margin-right: 8px">
        {this.$slots.default}
      </el-upload>
    )
  }
})

export default ufinUploadExcel
