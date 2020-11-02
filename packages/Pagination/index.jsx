import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'
import elPagination from 'element-ui/packages/pagination/index'

import './index.scss'

export const ufinPaginationProps = {
  current: [Number],

  total: [String, Number],

  pageSize: [String, Number],
  // 分页组件布局，子组件名用逗号分隔
  layout: {
    type: String,
    default: 'sizes, prev, pager, next'
  },
  // 每页显示条目个数
  pageSizes: {
    type: Array,
    default() {
      return [5, 10, 30, 50, 100]
    }
  }
}

const ufinPagination = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Table`,
  props: ufinPaginationProps,
  data() {
    return {
      currentPageVal: 1
    }
  },
  watch: {
    current: {
      immediate: true,
      handler(val) {
        this.currentPageVal = val
      }
    }
  },
  methods: {
    handlePageSizeChange(size) {
      this.$emit('size-change', size)
    },
    handleChangeCurrentPage(currentPage) {
      this.$emit('current-change', currentPage)
    }
  },

  render() {
    const {
      layout,
      pageSizes,
      total,
      pageSize,
      componentSize,
      handlePageSizeChange,
      handleChangeCurrentPage
    } = this

    const ufinPaginationPrefixCls = `${ufinComponentPrefixCls}-pagination-footer`

    const className = classNames(
      ufinPaginationPrefixCls,
      `${ufinPaginationPrefixCls}--${componentSize}`
    )

    return (
      <div class={className}>
        <div class={`${ufinPaginationPrefixCls}__container`}>
          <span class={`${ufinPaginationPrefixCls}__extends`}>
            <slot />
          </span>
          <span class={`${ufinPaginationPrefixCls}__pagination`}>
            <span class="pagination-num">
              共有&nbsp;
              <span class="f-color-primary">{total}</span>&nbsp;条数据
            </span>
            <el-pagination
              size={componentSize}
              background
              layout={layout}
              page-sizes={pageSizes}
              {...{
                on: {
                  'update:current-page': (val) => currentPageVal,
                  'size-change': handlePageSizeChange,
                  'current-change': handleChangeCurrentPage
                }
              }}
              page-size={pageSize}
              total={total}
            />
          </span>
        </div>
      </div>
    )
  }
})

/* istanbul ignore next */
ufinPagination.install = function(Vue) {
  Vue.component(ufinPagination.name, ufinPagination)
}

export default ufinPagination
