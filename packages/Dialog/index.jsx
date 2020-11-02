// 自定义指令
import Vue from 'vue'
import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import './index.scss'

import './dialog'

export const ufinDialogProps = {
  // Dialog 的标题
  title: PropTypes.string,
  // 是否显示 Dialog
  visible: PropTypes.bool.def(false),
  // Dialog 的宽度
  width: PropTypes.string.def('600px'),
  // 是否支持拖拽
  dialogIsDrag: PropTypes.bool.def(true),
  // 是否支持改变dialog大小
  dialogIsChange: PropTypes.bool.def(true)
}

const ufinDialog = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Dialog`,
  props: ufinDialogProps,

  data() {
    return {}
  },

  render(h) {
    const {
      dialogIsDrag,
      dialogIsChange,
      title,
      visible,
      showClose,
      top,
      width,
      componentSize
    } = this
    // 关闭弹出框
    const onClose = () => {
      this.$emit('close')
    }
    // dialog open回调事件
    const onOpen = () => {
      this.$emit('open')
    }

    const ufinDialogPrefixCls = `${ufinComponentPrefixCls}-dialog`

    const className = classNames(ufinDialogPrefixCls)

    const TemplateNode = Vue.component('template')

    // dialog的页脚
    const footer =
      this.$scopedSlots.footer &&
      h(
        'template',
        {
          slot: 'footer'
        },
        [this.$scopedSlots.footer()]
      )

    return (
      <el-dialog
        class={className}
        {...{
          directives: [
            { name: 'dialogDrag', value: dialogIsDrag },
            { name: 'dialogChange', value: dialogIsChange }
          ]
        }}
        size={componentSize}
        title={title}
        visible={visible}
        close-on-click-modal={false}
        close-on-press-escape={false}
        show-close={showClose}
        onClose={onClose}
        onOpen={onOpen}
        top={top}
        width={width}>
        {/* slot 内容 */}
        {this.$scopedSlots.default && this.$scopedSlots.default()}
        {/* footer */}
        {footer}
      </el-dialog>
    )
  }
})

/* istanbul ignore next */
ufinDialog.install = function(Vue) {
  Vue.component(ufinDialog.name, ufinDialog)
}

export default ufinDialog
