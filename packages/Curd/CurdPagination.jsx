import classNames from 'classnames'
import { isObject } from 'lodash'
import ufinCreateComponent, {
  ufinComponentPrefixCls,
  getOptionProps
} from '../utils/component'

import PropTypes from '../utils/prop-types'

import ufinPagination from '../Pagination/index'

const elPaginationProps = {
  total: PropTypes.number,
  current: PropTypes.number,
  size: PropTypes.number
}

export const ufinCurdPaginationProps = {
  pagination: PropTypes.oneOfType([
    PropTypes.shape({
      ...elPaginationProps,
      position: PropTypes.oneOf(['top', 'bottom', 'both'])
    }).loose,
    PropTypes.bool
  ]).def({
    total: 0,
    current: 1,
    size: 10
  }),
  pageTotal: PropTypes.number,
  pageCurrent: PropTypes.number,
  pageSize: PropTypes.number,
  pageLayout: PropTypes.string.def('sizes, prev, pager, next'),
  pageSizes: PropTypes.array.def([5, 10, 30, 50, 100])
}

const ufinCurdPagination = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}CurdPagination`,
  props: ufinCurdPaginationProps,
  data() {
    return {}
  },
  methods: {},
  render(h) {
    // 获取props
    const props = getOptionProps(this)

    const { pageTotal, pageCurrent, pageSize, pageSizes, pageLayout } = props

    const ufinPageToolbarPrefixCls = `${ufinComponentPrefixCls}-curd-toobar`

    const componentCls = classNames(ufinPageToolbarPrefixCls, {})

    return (
      <div class={componentCls}>
        <ufinPagination
          current={pageCurrent}
          total={pageTotal}
          pageSize={pageSize}
          layout={pageLayout}
          pageSizes={pageSizes}
          {...{
            on: {
              'size-change': (size) => {
                this.$emit('size-change', size)
              },
              'current-change': (current) => {
                this.$emit('current-change', current)
              }
            }
          }}
        />
      </div>
    )
  }
})

export default ufinCurdPagination
