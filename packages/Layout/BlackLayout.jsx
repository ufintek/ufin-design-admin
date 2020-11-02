import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'

import { ContainerQuery } from 'vue-container-query'
import classNames from 'classnames'

const MediaQueryEnum = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

const ufinBlackLayoutClsPrefix = `${ufinComponentPrefixCls}-layout`

const ufinBlackLayout = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}BlackLayout`,
  props: BlackLayoutProps,
  functional: true,
  render(h, content) {
    ;<ContainerQuery query={MediaQueryEnum} onChange={onContainerQueryChange}>
      <ufinLayout
        class={classNames(
          `${ufinBlackLayoutClsPrefix}`,
          `${ufinBlackLayoutClsPrefix}-${theme}`
        )}
      />
    </ContainerQuery>
  }
})

export default ufinBlackLayout
