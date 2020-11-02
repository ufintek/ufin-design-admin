import ufinCreateComponent, { componentPrefixCls } from '../utils/component'

import PropTypes from '../utils/prop-types'

import ufinIcon from '../Icon'

// 样式文件
import './index.scss'

export const ufinHeaderTriggerProps = {
  // 是否是全屏状态
  collapsed: PropTypes.bool,
  // 自定义全屏切换
  toggleAside: PropTypes.func,

  asideCollapseText: PropTypes.string.def('收起'),

  asideExpansionText: PropTypes.string.def('收起')
}

const ufinHeaderTrigger = ufinCreateComponent({
  name: `${componentPrefixCls}HeaderTrigger`,
  props: ufinHeaderTriggerProps,
  render(h, content) {
    const {
      collapsed,
      asideCollapseText,
      asideExpansionText,
      toggleAside
    } = this

    const showText = collapsed ? asideExpansionText : asideCollapseText
    // 点击按钮切换状态
    const handleToggleAside = () => {
      if (toggleAside) toggleAside(collapsed)
    }
    return (
      <el-tooltip effect="dark" content={showText} placement="bottom">
        <span onClick={handleToggleAside}>
          {collapsed ? (
            <ufinIcon name="indent" size="18" />
          ) : (
            <ufinIcon name="dedent" size="18" />
          )}
        </span>
      </el-tooltip>
    )
  }
})

export default ufinHeaderTrigger
