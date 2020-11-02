import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'
import { VueCropper } from 'vue-cropper'
// 样式文件
import './Image-cropper.scss'
import { isFunction } from '../utils/prop-types/utils'

export const ufinImgCropperProps = {
  dialogVisible: PropTypes.bool.def(false),
  imgType: PropTypes.string.def('blob'),
  cropperImg: PropTypes.string,
  handleClose: PropTypes.fnc,
  updateCropper: PropTypes.fnc,
  uploadImg: PropTypes.fnc,
}

const ufinImgCropper = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}ImgCropper`,

  props: ufinImgCropperProps,
  data() {
    return {
      previews: {},
      option: {
        img: '', // 裁剪图片的地址
        size: 1, // 裁剪生成图片的质量
        full: false, // 是否输出原图比例的截图 默认false
        outputType: 'png', // 裁剪生成图片的格式 默认jpg
        canMove: false, // 上传图片是否可以移动
        fixedBox: true, // 固定截图框大小 不允许改变
        original: false, // 上传图片按照原始比例渲染
        canMoveBox: true, // 截图框能否拖动
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        centerBox: true, // 截图框是否被限制在图片里面
        high: false, // 是否按照设备的dpr 输出等比例图片
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: 'contain', // 图片默认渲染方式
        maxImgSize: 200, // 限制图片最大宽度和高度
        limitMinSize: [100, 120], // 更新裁剪框最小属性
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        fixed: true, // 是否开启截图框宽高固定比例  (默认:true)
        fixedNumber: [1, 1] // 截图框的宽高比例
      }
    }
  },

  render(h) {
    const { option, dialogVisible, handleClose, updateCropper,uploadImg } = this
    // 裁剪时触发的方法，用于实时预览
    const realTime = (data) => {
      this.previews = data
    }
    // 重新上传
    const uploadBth = () => {
       updateCropper()
    }
    // 取消关闭弹框
    // const handleClose = () => {
    //   this.$emit('colse-dialog', false)
    // }
    // 获取裁剪之后的图片，默认blob，也可以获取base64的图片
    const saveImg = () => {
      if (this.imgType === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          uploadImg(data)
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.uploadFile = data
          uploadImg(data)
        })
      }
    }
    var reuploadButton = <el-button onClick={uploadBth}>重新选择</el-button>
    return (
      <div class="Cropper">
        <el-dialog
          visible={dialogVisible}
          before-close={handleClose}
          width="600px">
          <div class="cropper-container">
            <div class="cropper-el">
              <VueCropper
                ref="cropper"
                onRealTime={realTime}
                {...{
                  props: {
                    img: this.cropperImg,
                    'output-size': option.size,
                    'output-type': option.outputType,
                    info: true,
                    full: option.full,
                    'can-move':option.canMove,
                    'can-move-box': option.canMoveBox,
                    'fixed-box': option.fixedBox,
                    original: option.original,
                    'auto-crop': option.autoCrop,
                    'auto-crop-width':option.autoCropWidth,
                    'auto-crop-height': option.autoCropHeight,
                    'center-box': option.centerBox,
                    high: option.high,
                    'info-true': option.infoTrue,
                    enlarge:option.enlarge,
                    fixed: option.fixed,
                    'fixed-number': option.fixedNumber
                  }
                }}></VueCropper>
            </div>
            <div class="prive-el">
              <div
                class="prive-style"
                style="width:200px;height: 200px;overflow:hidden;margin:0 25px;display:flex;align-items:center">
                <div class="preview" style={this.previews.div}>
                  <img src={this.previews.url} style={this.previews.img}></img>
                </div>
              </div>
              {this.cropperImg ? reuploadButton : ''}
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button onClick={handleClose}>取 消</el-button>
            <el-button type="primary" onClick={saveImg}>
              上 传
            </el-button>
          </span>
        </el-dialog>
      </div>
    )
  }
})

export default ufinImgCropper
