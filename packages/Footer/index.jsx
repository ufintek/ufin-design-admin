import ufinCreateComponent, { componentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

// 样式文件
import './index.scss'

export const ufinFooterProps = {
  links: PropTypes.array,

  copyright: PropTypes.string
}

const ufinFooter = ufinCreateComponent({
  name: `${componentPrefixCls}Footer`,
  props: ufinFooterProps,
  render(h) {
    const { links, copyright } = this

    const ufinGlobalFooterCls = classNames(`${componentPrefixCls}-footer`)

    const footerLinks = links ? (
      <div class="footer-links">
        {links.map((link) => {
          return (
            <a
              href={link.href}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}>
              {link.title}
            </a>
          )
        })}
      </div>
    ) : (
      ''
    )

    const copyrightNode = copyright ? (
      <div class="footer-copyright">{copyright}</div>
    ) : (
      ''
    )

    return (
      <div class={ufinGlobalFooterCls}>
        <footer class="footer-wrapper">
          {/* Links */}
          {footerLinks}
          {/* CopyRight */}
          {copyrightNode}
        </footer>
      </div>
    )
  }
})

export default ufinFooter
