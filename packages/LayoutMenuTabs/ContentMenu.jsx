import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'
import Clickoutside from 'element-ui/src/utils/clickoutside'

import ufinContentMenu from './ContentMenu'
// 样式文件
import './index.scss'

export const ufinLayoutContextMenuProps = {
  visible: PropTypes.bool.def(false),

  itemList: PropTypes.array.def([]),

  left: PropTypes.number.def(0),

  top: PropTypes.number.def(0),

  target: PropTypes.any.def(null)
}

const ufinLayoutContextMenu = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}LayoutContextMenu`,
  props: ufinLayoutContextMenuProps,
  data() {
    return {
      active: null
    }
  },
  directives: { Clickoutside },
  mounted() {
    document.addEventListener('click', () => {
      this.$emit('update:visible', false)
    })
  },
  render() {
    const { active, left, top, itemList, visible, target } = this

    const contentMenuStyle = {
      left: left + 'px',
      top: top + 'px'
    }

    const onHide = () => {
      this.$emit('update:visible', false)
    }
    const onSelect = (key) => {
      this.$emit('select', key, this.target)
      this.$emit('update:visible', false)
    }

    return (
      visible && (
        <el-menu
          default-active={active}
          style={contentMenuStyle}
          class="contextmenu"
          v-clickoutside={onHide}
          {...{
            on: {
              select: onSelect
            },
            nativeOn: {}
          }}>
          {itemList.map((item, index) => (
            <el-menu-item key={index} index={item.key} style="paddingLeft: 0">
              {item.text}
            </el-menu-item>
          ))}
        </el-menu>
      )
    )
  }
})

export default ufinLayoutContextMenu
