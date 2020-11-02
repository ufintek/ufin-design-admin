import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import './index.scss'

export const ufinBadgeStatusProps = {
  text: PropTypes.string,
  type: PropTypes.string
}

const ufinBadgeStatus = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}BadgeStatus`,
  props: ufinBadgeStatusProps,

  data() {
    return {}
  },

  render() {
    const { text , type } = this

    const ufinBadgeStatusPrefixCls = `${ufinComponentPrefixCls}-badge-status`

    const ufinBadgeStatusClassName = classNames(ufinBadgeStatusPrefixCls)

    let ufinBadgeStatusDotTypeCls
    switch (type) {
      case 'processing':
        ufinBadgeStatusDotTypeCls = 'is-status-processing'
        break

      default:
        ufinBadgeStatusDotTypeCls = 'is-status-default'
        break
    }

    const ufinBadgeStatusDotClassName = classNames(
      `${ufinBadgeStatusPrefixCls}__dot`,
      ufinBadgeStatusDotTypeCls
    )

    return (
      <div class={ufinBadgeStatusClassName}>
        <div class={ufinBadgeStatusDotClassName} />
        <span class={classNames(`${ufinBadgeStatusPrefixCls}__text`)}>
          {text}
        </span>
      </div>
    )
  }
})

/* istanbul ignore next */
ufinBadgeStatus.install = function(Vue) {
  Vue.component(ufinBadgeStatus.name, ufinBadgeStatus)
}

export default ufinBadgeStatus
