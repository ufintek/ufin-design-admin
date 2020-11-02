import classNames from 'classnames'
import { isObject } from 'lodash'
import ufinCreateComponent, {
  ufinComponentPrefixCls,
  getOptionProps
} from '../utils/component'
import PropTypes from '../utils/prop-types'


export const ufinCurdToolbarProps = {
  toolbar: PropTypes.bool.def(true),

  title: PropTypes.string,

  handleTableHeightChange: PropTypes.func,

  handleRefresh: PropTypes.func
}

const ufinCurdToolbar = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}CurdToolbar`,
  props: ufinCurdToolbarProps,
  data() {
    return {}
  },
  methods: {},
  render(h) {
    // 获取props
    const props = getOptionProps(this)

    const { title, handleTableHeightChange, handleRefresh } = props
    const ufinPageToolbarPrefixCls = `${ufinComponentPrefixCls}-curd-toobar`

    const componentCls = classNames(ufinPageToolbarPrefixCls, {})

    // 标题的标题
    const titleNode = title && (
      <div class={classNames(`${componentCls}--title`)}>{title}</div>
    )

    const renderSettingItem = (children, { tableTitle }) => (
      <el-tooltip
        class={classNames(`${componentCls}--settings-item`)}
        effect="dark"
        content={tableTitle}
        placement="top">
        {children}
      </el-tooltip>
    )

    // 刷新按钮
    const RefreshSettingItemNode = renderSettingItem(
      <span onClick={handleRefresh.bind(this)}>
        <ufin-icon name="ucall-admin-reload" />
      </span>,
      {
        tableTitle: '刷新'
      }
    )

    // 密度按钮
    const HeightSettingItemNode = renderSettingItem(
      <el-dropdown
        placement="bottom"
        onCommand={handleTableHeightChange.bind(this)}
        trigger="click">
        <el-tooltip effect="dark" content="密度" placement="top">
          <span class="yfin-space-item">
            <ufin-icon name="ucall-admin-colum-height" />
          </span>
        </el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="small">默认</el-dropdown-item>
          <el-dropdown-item command="medium">中等</el-dropdown-item>
          <el-dropdown-item command="mini">紧凑</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>,
      {
        tableTitle: '密度'
      }
    )

    // 列设置
    const SettingSettingsItemNode = renderSettingItem(
      <span>
        <ufin-icon name="ucall-admin-setting" />
      </span>,
      {
        tableTitle: '列设置'
      }
    )

    const ToobarRightExtendsActions = this.$scopedSlots.actions && (
      <div class={classNames(`${componentCls}--right-actions`)}>
        {this.$scopedSlots.actions()}
        <el-divider direction="vertical" />
      </div>
    )

    return (
      <div class={componentCls}>
        <div class={classNames(`${componentCls}--container`)}>
          <div class={classNames(`${componentCls}--left`)}>{titleNode}</div>
          <div class={classNames(`${componentCls}--right`)}>
            {/* 其他操作按钮 */}
            {ToobarRightExtendsActions}
            {/* 常用的操作 */}
            {/* 刷新按钮 */}
            {RefreshSettingItemNode}
            {/* 密度按钮 */}
            {HeightSettingItemNode}
            {/* 列设置 */}
            {SettingSettingsItemNode}
          </div>
        </div>
      </div>
    )
  }
})

export default ufinCurdToolbar
