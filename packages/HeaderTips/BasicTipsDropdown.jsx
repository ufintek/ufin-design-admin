import ufinCreateComponent, {
  ufinComponentPrefixCls
} from 'components/utils/component'

import PropTypes from 'components/utils/prop-types'

import ufinIcon from 'components/base/ufin-icon'

// 样式文件
// import './headerTrigger.scss'

export const props = {}

const ufinHeaderBasicTipsDropdown = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}HeaderBasicTipsDropdown`,
  props,
  render(h, content) {
    const {
      asideCollapse,
      asideCollapseText,
      asideExpansionText,
      maxNumber,
      allNumber,
      icon
    } = this

    const tipsHeader = (
      <div
        class={classNames(
          `${ufinComponentPrefixCls}-header-tips-dropdown__header`
        )}>
        <span>奥术大师大所多</span>
        <span>12</span>
      </div>
    )

    return (
      <div
        class={classNames(
          `${ufinComponentPrefixCls}-header-tips-dropdown__basic`
        )}>
        {/* 消息头部 */}
        {tipsHeader}
      </div>
    )
  }
})

export default ufinHeaderBasicTipsDropdown
