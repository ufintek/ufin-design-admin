function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

const filterProps = (props, propsData = {}) => {
  const res = {}
  Object.keys(props).forEach((k) => {
    if (k in propsData || props[k] !== undefined) {
      res[k] = props[k]
    }
  })
  return res
}

// 组件的样式前缀
export const componentPrefixCls = 'ufin'

export const ufinComponentPrefixCls = 'ufin'

const getPropsData = (ele) => {
  let componentOptions = ele.componentOptions
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions
  }
  return componentOptions ? componentOptions.propsData || {} : {}
}

/**
 * jsx方法中获取组件的 slot 插槽
 * @param {*} ele
 */
const getScopedSlots = (ele) => {
  return (ele.data && ele.data.scopedSlots) || {}
}

export const getComponentFromProp = (
  instance,
  prop,
  options = instance,
  execute = true
) => {
  if (instance.$createElement) {
    const h = instance.$createElement
    const temp = instance[prop]
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp
    }
    return (
      (instance.$scopedSlots[prop] &&
        execute &&
        instance.$scopedSlots[prop](options)) ||
      instance.$scopedSlots[prop] ||
      instance.$slots[prop] ||
      undefined
    )
  } else {
    const h = instance.context.$createElement
    const temp = getPropsData(instance)[prop]
    if (temp !== undefined) {
      return typeof temp === 'function' && execute ? temp(h, options) : temp
    }
    const slotScope = getScopedSlots(instance)[prop]
    if (slotScope !== undefined) {
      return typeof slotScope === 'function' && execute
        ? slotScope(h, options)
        : slotScope
    }
    const slotsProp = []
    const componentOptions = instance.componentOptions || {}
    ;(componentOptions.children || []).forEach((child) => {
      if (child.data && child.data.slot === prop) {
        if (child.data.attrs) {
          delete child.data.attrs.slot
        }
        if (child.tag === 'template') {
          slotsProp.push(child.children)
        } else {
          slotsProp.push(child)
        }
      }
    })
    return slotsProp.length ? slotsProp : undefined
  }
}

export const getOptionProps = (instance) => {
  if (instance.componentOptions) {
    const componentOptions = instance.componentOptions
    const { propsData = {}, Ctor = {} } = componentOptions
    const props = (Ctor.options || {}).props || {}
    const res = {}
    for (const [k, v] of Object.entries(props)) {
      const def = v.default
      if (def !== undefined) {
        res[k] =
          typeof def === 'function' && getType(v.type) !== 'Function'
            ? def.call(instance)
            : def
      }
    }
    return { ...res, ...propsData }
  }
  const { $options = {}, $props = {} } = instance
  return filterProps($props, $options.propsData)
}

const BaseMixins = {
  computed: {
    componentSize() {
      return this.size || (this.$ELEMENT || {}).size
    }
  }
}

export default function ufinCreateComponent(config) {
  config.mixins
    ? config.mixins.push(BaseMixins)
    : (config.mixins = [BaseMixins])
  return config
}
