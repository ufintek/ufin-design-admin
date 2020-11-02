import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'
import ElTooltip from 'element-ui/lib/tooltip'
import debounce from 'lodash/debounce'
import './index.scss'

export const ufinEllipsisProps = {
  ...ElTooltip.props,
  lines: PropTypes.number.def(1)
}

const ufinEllipsis = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Ellipsis`,
  props: ufinEllipsisProps,

  computed: {
    tooltipProps() {
      let props = { ...this.$props }
      delete props.lines
      // 如果没有设置位置，默认设为top
      if (!props.placement) props.placement = 'top'
      return props
    },
    subContent() {
      // 如果没有传入content则直接读取用户传入的默认插槽作为content值
      if (!this.tooltipProps.content) {
        if (this.$slots.default[0].tag) {
          return this.tooltipContent
        } else {
          return this.$slots.default[0].text
        }
      }

      return null
    }
  },
  data() {
    return {
      tooltipContent: ''
    }
  },
  updated() {
    this.tooltipContent =
      this.$slots.default[0].elm && this.$slots.default[0].elm.outerHTML
  },
  methods: {
    handleMouseEnter() {
      const content = this.$refs.content

      const range = document.createRange()
      range.setStart(content, 0)
      range.setEnd(content, content.childNodes.length)
      const rangeHeight = range.getBoundingClientRect().height

      if (
        rangeHeight > content.offsetHeight ||
        content.scrollHeight > content.offsetHeight
      ) {
        const tooltip = this.$refs.tooltip
        tooltip.referenceElm = content
        tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
        tooltip.doDestroy()
        tooltip.setExpectedState(true)
        this.activateTooltip(tooltip)
      }
    },
    handleMouseLeave() {
      const tooltip = this.$refs.tooltip
      if (tooltip) {
        tooltip.setExpectedState(false)
        tooltip.handleClosePopper()
      }
    }
  },
  mounted() {
    this.tooltipContent =
      this.$slots.default[0].elm && this.$slots.default[0].elm.outerHTML
    this.activateTooltip = debounce(
      (tooltip) => tooltip.handleShowPopper(),
      50,
      false,
      this
    )
  },

  render() {
    const {
      handleMouseEnter,
      handleMouseLeave,
      tooltipContent,
      tooltipProps,
      subContent,
      lines
    } = this
    const ufinEllipsisPrefixCls = `${ufinComponentPrefixCls}-ellipsis`

    const className = classNames(`${ufinEllipsisPrefixCls}-container`)
    return (
      <div class={className}>
        <el-tooltip
          ref="tooltip"
          {...{
            props: tooltipProps
          }}>
          (subContent &&{' '}
          <div
            class={`${ufinEllipsisPrefixCls}__tooltip--content`}
            {...{
              slot: 'content',
              domProps: {
                innerHTML: subContent
              }
            }}
          />
          )
        </el-tooltip>

        <div
          ref="content"
          class={`${ufinEllipsisPrefixCls}__content`}
          style={`-webkit-line-clamp: ${lines}`}
          {...{
            on: {
              mouseenter: handleMouseEnter,
              mouseleave: handleMouseLeave
            }
          }}>
          {this.$scopedSlots &&
            this.$scopedSlots.default &&
            this.$scopedSlots.default()}
        </div>
      </div>
    )
  }
})

/* istanbul ignore next */
ufinEllipsis.install = function(Vue) {
  Vue.component(ufinEllipsis.name, ufinEllipsis)
}

export default ufinEllipsis
