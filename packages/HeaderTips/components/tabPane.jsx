import ufinCreateComponent, {
  componentPrefixCls
} from 'components/utils/component'

import PropTypes from 'components/utils/prop-types'

import ufinIcon from 'components/base/ufin-icon'

export const props = {
  // 是否是全屏状态
  asideCollapse: PropTypes.bool,
  // 自定义全屏切换
  toggleAside: PropTypes.func,

  asideCollapseText: PropTypes.string.def('收起'),

  asideExpansionText: PropTypes.string.def('收起')
}

const ufinHeaderTrigger = ufinCreateComponent({
  name: `${componentPrefixCls}HeaderTrigger`,
  props,
  render(h, content) {
    const {
      num,
      list,
      loadMoreText,
      asideCollapseText,
      asideExpansionText,
      toggleAside
    } = this

    const titleLabel = '消息'

    return (
      <el-tab-pane name="tips" label="消息">
        {/* <span slot="label">
          {titleLabel}({num})
        </span> */}
        {/* 消息内容 */}
        {list && list.length ? (
          <div />
        ) : (
          <div class="header-tips-nodata">您当前没有消息</div>
        )}
        {/* 通用tabPane footer */}
        <div class="header-tips-list-bottombars">
          <div>清空消息</div>
          {/* 查看更多操作  */}
          <div>{loadMoreText}</div>
        </div>
      </el-tab-pane>
    )
  }
})

export default ufinHeaderTrigger
