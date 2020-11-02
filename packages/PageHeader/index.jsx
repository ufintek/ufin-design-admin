import ufinCreateComponent, {
  ufinComponentPrefixCls,
  getComponentFromProp,
  getOptionProps
} from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import ufinIcon from '../Icon'

import ufinBreadcrumb from '../Breadcrumb/index'

import './index.scss'

export const PageHeaderProps = {
  backIcon: PropTypes.any,
  prefixCls: PropTypes.string,
  title: PropTypes.any,
  subTitle: PropTypes.any,
  breadcrumb: PropTypes.bool.def(true),
  tags: PropTypes.any,
  footer: PropTypes.any,
  extra: PropTypes.any,
  avatar: PropTypes.object,
  ghost: PropTypes.bool.def(false)
}

const renderBack = (instance, prefixCls, backIcon, onBack) => {
  // eslint-disable-next-line no-unused-vars
  const h = instance.$createElement
  if (!backIcon || !onBack) {
    return null
  }
  return {
    /*

    // <LocaleReceiver componentName="PageHeader">
    //   {({ back }) => (
    //     <div class={`${prefixCls}-back`}>
    //       <TransButton
    //         onClick={(e) => {
    //           instance.$emit('back', e)
    //         }}
    //         class={`${prefixCls}-back-button`}
    //         aria-label={back}>
    //         {backIcon}
    //       </TransButton>
    //     </div>
    //   )}
    // </LocaleReceiver>
    */
  }
}

const renderBreadcrumb = (h) => {
  return <ufinBreadcrumb />
}

/**
 * 生成PageHeader 的 title部分
 * @param {*} h
 * @param {*} prefixCls
 * @param {*} instance
 */
const renderTitle = (h, prefixCls, instance) => {
  const { avatar } = instance
  // 获取 title props
  const title = getComponentFromProp(instance, 'title')
  // 获取 subTitle props
  const subTitle = getComponentFromProp(instance, 'subTitle')
  // 获取 tags props
  const tags = getComponentFromProp(instance, 'tags')
  const extra = getComponentFromProp(instance, 'extra')
  const backIcon =
    getComponentFromProp(instance, 'backIcon') !== undefined ? (
      getComponentFromProp(instance, 'backIcon')
    ) : (
      <ufinIcon name="arrow-left" />
    )
  const onBack = instance.$listeners.back
  const headingPrefixCls = `${prefixCls}__heading`
  if (title || subTitle || tags || extra) {
    const backIconDom = renderBack(instance, prefixCls, backIcon, onBack)
    return (
      <div class={headingPrefixCls}>
        {backIconDom}
        {avatar && <el-avatar {...avatar} />}
        {title && <span class={`${headingPrefixCls}-title`}>{title}</span>}
        {subTitle && (
          <span class={`${headingPrefixCls}-sub-title`}>{subTitle}</span>
        )}
        {tags && <span class={`${headingPrefixCls}-tags`}>{tags}</span>}
        {extra && <span class={`${headingPrefixCls}-extra`}>{extra}</span>}
      </div>
    )
  }
  return null
}

const renderFooter = (h, prefixCls, footer) => {
  if (footer) {
    return <div class={`${prefixCls}-footer`}>{footer}</div>
  }
  return null
}

const renderChildren = (h, prefixCls, children) => {
  return <div class={`${prefixCls}-content`}>{children}</div>
}

const ufinPageHeader = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}PageHeader`,
  props: PageHeaderProps,
  // inject: {
  //   configProvider: { default: () => ConfigConsumerProps }
  // },
  render(h) {
    // const { getPrefixCls, pageHeader } = this.configProvider
    const props = getOptionProps(this)
    const { breadcrumb } = props
    const footer = getComponentFromProp(this, 'footer')
    const children = this.$slots.default

    let ghost = true

    // Use `ghost` from `props` or from `ConfigProvider` instead.
    if ('ghost' in props) {
      ghost = props.ghost
    }

    const ufinPageHeaderPrefixCls = `${ufinComponentPrefixCls}-page-header`
    const breadcrumbDom = breadcrumb ? renderBreadcrumb(h) : null

    const className = classNames(ufinPageHeaderPrefixCls, {
      'has-breadcrumb': breadcrumbDom,
      'has-footer': footer,
      [`${ufinPageHeaderPrefixCls}-ghost`]: ghost
    })

    return (
      <div class={className}>
        {breadcrumbDom}
        {renderTitle(h, ufinPageHeaderPrefixCls, this)}
        {children && renderChildren(h, ufinPageHeaderPrefixCls, children)}
        {renderFooter(h, ufinPageHeaderPrefixCls, footer)}
      </div>
    )
  }
})

/* istanbul ignore next */
ufinPageHeader.install = function(Vue) {
  Vue.component(ufinPageHeader.name, ufinPageHeader)
}

export default ufinPageHeader
