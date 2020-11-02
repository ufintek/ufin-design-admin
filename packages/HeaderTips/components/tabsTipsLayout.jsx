import ufinCreateComponent, {
  componentPrefixCls
} from 'components/utils/component'

import PropTypes from 'components/utils/prop-types'

import ufinIcon from 'components/base/ufin-icon'

export const props = {
  data: PropTypes.array
}

const ufinHeaderTipsTabsLayout = ufinCreateComponent({
  name: `${componentPrefixCls}HeaderTipsTabsLayout`,
  props,
  render(h) {
    const { data } = this

    let tabPane
    if (Array.isArray(data)) {
      tabPane = data.map((tabPaneItem) => {
        return (
          <el-tab-pane label={tabPaneItem.label}>
            {tabPaneItem.content}
          </el-tab-pane>
        )
      })
    }
    return (
      <el-tabs stretch>
        {/* 消息类型的消息 */}
        <el-tab-pane label="消息" />
        {/* 待办类型的消息  agenda */}
        {tabPane}
        {/* 通知类型的消息  notification */}
      </el-tabs>
    )
  }
})

export default ufinHeaderTipsTabsLayout
