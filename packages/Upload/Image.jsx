import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

// 样式文件
import './Image.scss'
import { isFunction } from '../utils/prop-types/utils'
import ufinImgCropper from './Image-cropper'
export const ufinUploadImageProps = {
  //上传接口名
  action: PropTypes.string,
  //原图片
  imageUrl: PropTypes.string,
  //上传时携带的参数
  data: PropTypes.object,
  // 上传成功回调
  onSuccess: PropTypes.func,
  //  是否显示文件
  showFileList: PropTypes.bool.def(false),
  //  一次上传文件个数
  limit: PropTypes.number.def(1),
  // Image 接受的文件类型
  accept: PropTypes.string.def('.jpg,.gif,.bmp,.png,.jpeg')
  // autoUpload: PropTypes.bool.def(false)
}

const ufinUploadImage = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}UploadImage`,
  props: ufinUploadImageProps,
  data() {
    return {
      cropperImg: '', // 需要裁剪的图片
      showCropper: false, // 是否显示裁剪框
      uploadFile: '', // 裁剪后的文件
      // imgUrl: '', // 上传成功，后台返回的路径
      autoupload: false
    }
  },

  render(h) {
    const { action,imageUrl, data, onSuccess, showFileList, accept } = this
    
    // 选择文件
    const selectChange = (file) => {
      const { raw } = file
      openCropper(raw)
    }
    /**
     * @param {file} 上传的文件
     */
    const openCropper = (file) => {
      var files = file
      let isLt5M = files.size > 5 << 20
      if (isLt5M) {
        this.$message.error('请上传5M内的图片')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.cropperImg = data
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(files)
      this.showCropper = true
    }
    // 上传图片
    const uploadImg = (file) => {
      debugger
      this.uploadFile = file
      this.$refs.fileUpload.submit()
    }
    // 更新图片
    const updateCropper = () => {
      debugger
      this.$refs.fileUpload.$children[0].$el.click()
    }
    // 关闭窗口
    const closeDialog = () => {
      this.showCropper = false
    }
    const uploadSuccess = (response, file, fileList) => {
      // 错误处理
      const { status, errorMsg } = response
      if (status !== '0') {
        this.$message({
          message: `${errorMsg}`,
          type: 'error'
        })
        return
      }
      // 清除上传的内容
      this.$refs.fileUpload.clearFiles()
      closeDialog()
      isFunction(onSuccess) && onSuccess(response, file, fileList)
    }
    const uploadFail = (response, file, fileList) => {
      // 错误处理
      const { status, errorMsg } = response
      if (status !== '0') {
        this.$message({
          message: `${errorMsg}`,
          type: 'error'
        })
        return
      }
      // 清除上传的内容
      this.$refs.fileUpload.clearFiles()
    }
    const imgcropper = (
      <ufinImgCropper
        ref="imgCropperRef"
        dialogVisible={this.showCropper}
        handleClose={closeDialog}
        updateCropper={updateCropper}
        uploadImg={uploadImg}
        {...{
          props: {
            cropperImg: this.cropperImg
          }
        }}></ufinImgCropper>
    )
    const imgPreview = <img src={imageUrl} class="avatar"></img>
    const uploadicon = <i class="el-icon-plus avatar-uploader-icon"></i>
    return (
      <div>
        <el-upload
          class="avatar-uploader"
          accept={accept}
          ref="fileUpload"
          name="pic"
          action={action}
          data={data}
          {...{
            props: {
              'on-change': selectChange,
              'on-success': uploadSuccess,
              'on-error': uploadFail
            }
          }}
          show-file-list={showFileList}
          auto-upload={this.autoupload}>
          {imageUrl && showFileList ? imgPreview : uploadicon}
        </el-upload>
        {this.showCropper ? imgcropper : ''}
      </div>
    )
  }
})

export default ufinUploadImage
