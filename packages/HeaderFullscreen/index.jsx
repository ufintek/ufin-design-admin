import ufinCreateComponent, { componentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import screenfull from 'screenfull'

import ufinIcon from '../Icon'

// 样式文件
import './headerFullscreen.scss'

import { isFunction } from '@/utils/validate/data'

export const props = {
  // 是否是全屏状态
  active: PropTypes.bool,
  // 自定义全屏切换
  toggleFullscreen: PropTypes.func,

  activeText: PropTypes.string.def('全屏'),

  cancelText: PropTypes.string.def('退出全屏')
}

const ufinHeader = ufinCreateComponent({
  name: `${componentPrefixCls}HeaderFullscreen`,
  props,
  render(h, content) {
    const { active, activeText, cancelText, toggleFullscreen } = this

    const showText = active ? cancelText : activeText

    const screenFullToggle = () => {
      if (screenfull.isFullscreen) {
        screenfull.exit()
      } else {
        screenfull.request()
      }
    }

    if (screenfull.enabled) {
      screenfull.on('change', () => {
        if (active !== screenfull.isFullscreen) {
          this.$emit('change', screenfull.isFullscreen)
        }
      })
    }

    // 点击切换全屏
    const onToggle = () => {
      if (isFunction(toggleFullscreen)) {
        toggleFullscreen(active)
      } else {
        screenFullToggle()
      }
    }

    return (
      <el-tooltip effect="dark" content={showText} placement="bottom">
        <div onClick={onToggle} style="cursor:pointer;">
          {active ? (
            <ufinIcon name="screen-packup" size="18" />
          ) : (
            <ufinIcon name="screen-full" size="18" />
          )}
        </div>
      </el-tooltip>
    )
  }
})

export default ufinHeader
