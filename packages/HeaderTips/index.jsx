import ufinCreateComponent, {
  componentPrefixCls
} from 'components/utils/component'

import PropTypes from 'components/utils/prop-types'

import ufinIcon from 'components/base/ufin-icon'

// 样式文件
// import './headerTrigger.scss'

export const props = {
  // 是否是全屏状态
  asideCollapse: PropTypes.bool,
  // 自定义全屏切换
  toggleAside: PropTypes.func,

  asideCollapseText: PropTypes.string.def('收起'),

  asideExpansionText: PropTypes.string.def('收起'),

  // 当前所以的消息数目
  allNumber: PropTypes.number,
  // 最大展示的消息提示数目
  maxNumber: PropTypes.number.def(99),

  icon: PropTypes.string.def('message')
}

const ufinHeaderTips = ufinCreateComponent({
  name: `${componentPrefixCls}HeaderTips`,
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

    const showText = asideCollapse ? asideExpansionText : asideCollapseText
    // 点击按钮切换状态
    const handleToggleAside = () => {}

    // header 中消息提示 显示内容
    const defaultContent = this.$slots.default ? (
      <div class="header-item-trigger">{this.$slots.default}</div>
    ) : (
      <div class="header-item-trigger">
        <el-badge value={allNumber} max={maxNumber}>
          {/* 消息提示的默认图标 */}
          <ufinIcon name={icon} size="18" />
        </el-badge>
      </div>
    )
    return (
      <el-dropdown trigger="click" placement="bottom-end" ref="dropdown">
        {defaultContent}
        <el-dropdown-menu slot="dropdown" style="width: 360px;">
          {this.$scopedSlots.dropdown}
        </el-dropdown-menu>
      </el-dropdown>
    )
  }
})

export default ufinHeaderTips
