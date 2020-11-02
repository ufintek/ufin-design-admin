import ufinCreateComponent, { componentPrefixCls } from '../utils/component'

import PropTypes from '../utils/prop-types'

import ufinIcon from '../Icon/index'

// 样式文件
import './headerLink.scss'

export const props = {
  // 内置图标的名称
  name: PropTypes.string,
  // 说明的描述信息
  desc: PropTypes.string,
  // 跳转地址
  link: PropTypes.string
}

const ufinHeaderLink = ufinCreateComponent({
  name: `${componentPrefixCls}HeaderLink`,
  props,
  render(h) {
    const { name, desc, link, $slots } = this

    // 点击跳转
    const onClickLink = (_) => {
      if (link) {
        // TODO: 1. 区分外部网站和内部网站 2. 添加多种跳转方式(当前页面跳转，还是新开一个页面跳转)
      }
    }

    const content = (
      <span onClick={onClickLink}>
        {$slots.default ? (
          <span> {$slots.default}</span>
        ) : (
          <ufinIcon name={name} />
        )}
      </span>
    )

    return desc ? (
      <el-tooltip effect="dark" content={desc} placement="bottom">
        {content}
      </el-tooltip>
    ) : (
      { content }
    )
  }
})

export default ufinHeaderLink
