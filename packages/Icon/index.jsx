import classNames from 'classnames'
import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'

// 加载所有的icon
import './loader'

export const iconProps = {
  // 图标的名称 必填
  name: PropTypes.string,
  // 图标附加的 class
  className: PropTypes.string,
  // 定义图标的大小
  size: PropTypes.string.def('24'),

  iconfont: PropTypes.string.def('ucall-icon')
}

const ufinIcon = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Icon`,
  props: iconProps,
  render() {
    const { name, className, size, iconfont } = this

    // 图标的大小
    const iconStyle = size && {
      width: `${size}px`,
      height: `${size}px`,
      lineHeight: `${size}px`
    }
    const isEleIcon = /^el-/.test(name)
    //
    const isIconfont = /^ucall-admin-/.test(name)
    // svg 类型的图标 name
    const iconName =
      isEleIcon || isIconfont ? name : `#${ufinComponentPrefixCls}-${name}`

    // className
    const iconClass = classNames(
      `${ufinComponentPrefixCls}-icon`,
      className,
      iconName,
      {
        [iconfont]: isIconfont
      }
    )

    //  支持 el 内置的 图标
    return isEleIcon || isIconfont ? (
      <i class={iconClass} style={iconStyle} />
    ) : (
      <svg class={iconClass} style={iconStyle} aria-hidden="true">
        <use xlinkHref={iconName} />
      </svg>
    )
  }
})

/* istanbul ignore next */
ufinIcon.install = function(Vue) {
  Vue.component(ufinIcon.name, ufinIcon)
}

export default ufinIcon
