import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import { on, off } from 'utils/event'
import each from 'lodash/each'

import './index.scss'

export const ufinTreeSelectProps = {
  // v-model,存储的是treeParams.data里面的id
  value: {
    // `String` / `Array` / `Number`
    type: [String, Array, Number],
    // `''`
    default() {
      return ''
    }
  },
  // el-select样式
  styles: {
    type: Object,
    // {}
    default() {
      return {}
    }
  },
  // 下拉框 挂类
  selectClass: {
    type: String,
    default() {
      return ''
    }
  },
  // popover 挂类
  popoverClass: {
    type: String,
    default() {
      return ''
    }
  },
  // 是否禁用文本框
  disabled: {
    type: Boolean,
    // false
    default() {
      return false
    }
  },
  // 弹出框位置
  placement: {
    type: String,
    //  bottom
    default() {
      return 'bottom'
    }
  },
  // 树渲染方法，具体参考el-tree Function(h, { node, data, store }) {}
  treeRenderFun: Function,
  /*
      文本框参数，几乎支持el-select所有的API<br>
      取消参数：<br>
      设定下拉框的弹出框隐藏：<br>
      `:popper-append-to-body="false"` <br>
      搜索从弹出框里面执行： <br>
      `:filterable="false"`
  */
  selectParams: {
    type: Object,
    /*
     Object默认参数：<br><br>
     是否可以清空选项：<br>
     `clearable: true,`<br><br>
     是否禁用：<br>
     `disabled: false,`<br><br>
     搜索框placeholder文字：<br>
     `placeholder: '请选择',`<br><br>
     */
    default() {
      return {
        clearable: true,
        disabled: false,
        placeholder: '请选择'
      }
    }
  },
  /*
   下拉树参数，几乎支持el-tree所有的API<br>
    取消参数:<br>
   `:show-checkbox="selectParams.multiple"`<br>
   使用下拉框参数multiple判断是否对树进行多选<br>
   取消对el-tree的人为传参show-checkbox<br>
   `:node-key="propsValue"`     自动获取treeParams.props.value<br>
   `:draggable="false"`         屏蔽拖动
   */
  treeParams: {
    type: Object,
    /*
     Object默认参数：<br><br>
     在有子级的情况下是否点击父级关闭弹出框,false 只能点击子级关闭弹出框：`clickParent: false`<br><br>
     是否显示搜索框：<br>
     `filterable: false`<br><br>
     下拉树的数据：<br>
     `data:[]`<br><br>
     下拉树的props：<br>
     `props: {`<br>
         `children: 'children',`<br>
         `label: 'name',`<br>
         `value: 'flowId',`<br>
         `disabled: 'disabled'`<br>
     `}`
     */
    default() {
      return {
        clickParent: false,
        filterable: false,
        data: [],
        props: {
          children: 'children',
          label: 'name',
          code: 'code',
          value: 'flowId',
          disabled: 'disabled'
        }
      }
    }
  }
}

const ufinTreeSelect = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}TreeSelect`,
  props: ufinTreeSelectProps,

  data() {
    return {
      propsValue: 'flowId',
      propsLabel: 'name',
      propsCode: null, // 可能有空的情况
      propsDisabled: 'disabled',
      propsChildren: 'children',
      data: [],
      keywords: '',
      labels: '', // 存储名称，用于下拉框显示内容
      ids: [], // 存储id
      visible: false, // popover v-model
      width: 150
    }
  },
  watch: {
    ids: function(val) {
      if (val !== undefined) {
        this.$nextTick(() => {
          this._setSelectNodeFun(val)
        })
      }
    },
    value: function(val) {
      if (this.ids !== val) {
        this._setMultipleFun()
        if (this.selectParams.multiple) {
          this.ids = [...val]
        } else {
          this.ids = val === '' ? [] : [val]
        }
      }
    }
  },

  created() {
    const { props, data } = this.treeParams
    this._setMultipleFun()
    this.propsValue = props.value
    this.propsLabel = props.label
    this.propsCode = props.code || null // 可能为空
    this.propsDisabled = props.disabled
    this.propsChildren = props.children
    this.data = data.length > 0 ? [...data] : []
    if (this.selectParams.multiple) {
      this.labels = []
      this.ids = this.value
    } else {
      this.labels = ''
      this.ids = this.value instanceof Array ? this.value : [this.value]
    }
  },
  mounted() {
    this._updateH()
    this.$nextTick(() => {
      on(document, 'mouseup', this._popoverHideFun)
    })
  },
  methods: {
    // 根据类型判断单选，多选
    _setMultipleFun() {
      let multiple = false
      if (this.value instanceof Array) {
        multiple = true
      }
      this.$set(this.selectParams, 'multiple', multiple)
    },
    // 输入文本框输入内容抛出
    _searchFun() {
      /*
       对外抛出搜索方法，自行判断是走后台查询，还是前端过滤<br>
       前端过滤：this.$refs.treeSelect.$refs.tree.filter(value);<br>
       后台查询：this.$refs.treeSelect.treeDataUpdateFun(data);
       */
      this.$emit('searchFun', this.keywords)
    },
    //  根据id筛选当前树名称，以及选中树列表
    _setSelectNodeFun(ids) {
      const el = this.$refs.tree
      if (!el) {
        throw new Error('找不到tree dom')
      }
      const { multiple } = this.selectParams
      // 长度为0，清空选择
      if (ids.length === 0 || this.data.length === 0) {
        this.labels = multiple ? [] : ''
        if (multiple) {
          el.setCheckedKeys([])
        } else {
          el.setCurrentKey(null)
        }
        return
      }
      if (multiple) {
        // element-ui bug. 如果是父子节点全选 el.setCheckedKeys([非全量id]);之后el.getCheckedNodes()还是全量
        el.getCheckedNodes().forEach((item) => {
          el.setChecked(item, false)
        })
        ids.forEach((id) => {
          el.setChecked(id, true)
        })
        const nodes = el.getCheckedNodes()
        if (this.propsCode) {
          // 如果有code   labels=code(name)
          this.labels =
            nodes.map((item) =>
              item[this.propsCode]
                ? item[this.propsLabel] + '(' + item[this.propsCode] + ')'
                : item[this.propsLabel]
            ) || []
        } else {
          this.labels = nodes.map((item) => item[this.propsLabel]) || []
        }
      } else {
        el.setCurrentKey(ids[0])
        const node = el.getCurrentNode()
        if (node) {
          if (this.propsCode) {
            // 如果有code   labels=code(name)
            this.labels = node[this.propsCode]
              ? node[this.propsLabel] + '(' + node[this.propsCode] + ')'
              : node[this.propsLabel]
          } else {
            this.labels = node[this.propsLabel]
          }
        } else {
          this.labels = ''
        }
      }
      this._updatePopoverLocationFun()
    },
    // 更新popover位置
    _updatePopoverLocationFun() {
      // dom高度还没有更新，做一个延迟
      setTimeout(() => {
        this.$refs.popover.updatePopper()
      }, 50)
    },
    // 获取MouseEvent.path 针对浏览器兼容性兼容ie11,edge,chrome,firefox,safari
    _getEventPath(evt) {
      const path = (evt.composedPath && evt.composedPath()) || evt.path
      const target = evt.target
      if (path != null) {
        return path.indexOf(window) < 0 ? path.concat(window) : path
      }
      if (target === window) {
        return [window]
      }
      function getParents(node, memo) {
        memo = memo || []
        const parentNode = node.parentNode
        if (!parentNode) {
          return memo
        } else {
          return getParents(parentNode, memo.concat(parentNode))
        }
      }
      return [target].concat(getParents(target), window)
    },
    // 树过滤
    _filterFun(value, data, node) {
      if (!value) return true
      return data[this.propsLabel].indexOf(value) !== -1
    },
    // 树点击
    _treeNodeClickFun(data, node, vm) {
      const { multiple } = this.selectParams
      const { clickParent } = this.treeParams
      const { propsValue, propsChildren, propsDisabled } = this
      if (data[propsDisabled]) {
        // 禁用
        return
      }
      if (node.checked) {
        const value = data[this.propsValue]
        this.ids = this.ids.filter((id) => id !== value)
      } else {
        if (!multiple) {
          // 多选，不关闭，单选，判断是否允许点击父级关闭弹出框
          if (!clickParent) {
            const children = data[propsChildren]
            // 如果不允许点击父级,自身为末级，允许点击之后关闭
            if (!children || children.length === 0) {
              this.ids = [data[propsValue]]
              this.visible = false
            } else {
              // 不允许父级，阻止继续派发
              return false
            }
          } else {
            this.ids = [data[propsValue]]
            this.visible = false
          }
        } else {
          this.ids.push(data[propsValue])
        }
      }
      this._emitFun()
      /*
            点击节点，对外抛出   `data, node, vm`<br>
            `data:` 当前点击的节点数据<br>
            `node:` 当前点击的node<br>
            `vm:` 当前组件的vm
            */
      this.$emit('node-click', data, node, vm)
    },
    // 树勾选
    _treeCheckFun(data, node, vm) {
      this.ids = []
      const { propsValue } = this
      node.checkedNodes.forEach((item) => {
        this.ids.push(item[propsValue])
      })
      /*
            点击复选框，对外抛出   `data, node, vm`<br>
            `data:` 当前点击的节点数据<br>
            `node:` 当前点击的node<br>
            `vm:` 当前组件的vm
            */
      this.$emit('check', data, node, vm)
      this._emitFun()
    },
    // 下拉框移除tag时触发
    _selectRemoveTag(tag) {
      const { data, propsValue, propsLabel, propsChildren } = this
      each(
        data,
        (item) => {
          if (item[propsLabel] === tag) {
            const value = item[propsValue]
            this.ids = this.ids.filter((id) => id !== value)
          }
        },
        propsChildren
      )
      this.$refs.tree.setCheckedKeys(this.ids)
      this.$emit('removeTag', this.ids, tag)
      this._emitFun()
    },
    // 下拉框清空数据
    _selectClearFun() {
      this.ids = []
      const { multiple } = this.selectParams
      // 下拉框清空，对外抛出``this.$emit('input', multiple ? [] : '');`
      this.$emit('input', multiple ? [] : '')
      // 下拉框清空，对外抛出``this.$emit('select-clear');`
      this.$emit('select-clear')
      this._updatePopoverLocationFun()
    },
    // 判断类型，抛出当前选中id
    _emitFun() {
      const { multiple } = this.selectParams
      this.$emit(
        'input',
        multiple ? this.ids : this.ids.length > 0 ? this.ids[0] : ''
      )
      this._updatePopoverLocationFun()
    },
    // 更新宽度
    _updateH() {
      this.$nextTick(() => {
        this.width = this.$refs.select.$el.getBoundingClientRect().width
      })
    },
    // 显示弹出框的时候容错，查看是否和el宽度一致
    _popoverShowFun(val) {
      this._updateH()
    },
    // 判断是否隐藏弹出框
    _popoverHideFun(e) {
      const path = this._getEventPath(e)
      let isInside = path.some((list) => {
        // 鼠标在弹出框内部，阻止隐藏弹出框
        return (
          list.className &&
          typeof list.className === 'string' &&
          list.className.indexOf('el-tree-select') !== -1
        )
      })
      if (!isInside) {
        this.visible = false
      }
    },
    /**
     * @vuese
     * 树列表更新数据
     * @arg Array
     */
    treeDataUpdateFun(data) {
      this.data = data
      // 数据更新完成之后，判断是否回显内容
      if (data.length > 0) {
        setTimeout(() => {
          this._setSelectNodeFun(this.ids)
        }, 300)
      }
    },
    /**
     * @vuese
     * 本地过滤方法
     * @arg String
     */
    filterFun(val) {
      this.$refs.tree.filter(val)
    }
  },
  components: {},
  beforeDestroy() {
    off(document, 'mouseup', this._popoverHideFun)
  },
  render() {
    const {
      selectClass,
      styles,
      disabled,
      selectParams,
      labels,
      placement,
      popoverClass,
      width,
      visible,
      treeParams,
      keywords,
      data,
      propsValue,
      ids,
      treeRenderFun,
      _popoverShowFun,
      _searchFun,
      _filterFun,
      _treeNodeClickFun,
      _treeCheckFun,
      $listeners
    } = this

    const ufinTreeSelectPrefixCls = `${ufinComponentPrefixCls}-tree-select`

    const ufinTreeSelectClassName = classNames(
      ufinTreeSelectPrefixCls,
      selectClass
    )

    const popperClass = classNames('el-tree-select-popper', popoverClass, {
      disabled: disabled
    })

    return (
      <div class={ufinTreeSelectClassName}>
        {/* 下拉文本 */}
        <el-select
          style={styles}
          class="el-tree-select-input"
          value={labels}
          onInput={(value) => (labels = value)}
          disabled={disabled}
          popper-class="select-option"
          ref="select"
          {...{
            attrs: selectParams,
            on: $listeners,
            directives: [{ name: 'popover', modifiers: { popover: true } }]
          }}
          popper-append-to-body={false}
          filterable={false}
          multiple={selectParams.multiple}
          onRremoveTag={_selectRemoveTag}
          title={labels}
          onClear={_selectClearFun}
          onFocus={_popoverShowFun}
        />
        <el-popover
          ref="popover"
          placement={placement}
          popper-class={popperClass}
          width={width}
          value={visible}
          onInput={(value) => (visible = value)}
          trigger="click">
          {treeParams.filterable && (
            <el-input
              value={keywords}
              onInput={(value) => (keywords = value)}
              size="mini"
              class="input-with-select mb10"
              onChange={_searchFun}>
              <el-button slot="append" icon="el-icon-search" />
            </el-input>
          )}
          <el-scrollbar
            tag="div"
            wrap-class="el-select-dropdown__wrap"
            view-class="el-select-dropdown__list"
            class="is-empty">
            <el-tree
              ref="tree"
              style={{ display: data.length > 0 ? 'block' : 'none' }}
              {...{
                attrs: treeParams,
                on: $listeners
              }}
              data={data}
              node-key={propsValue}
              draggable={false}
              current-node-key={ids.length > 0 ? ids[0] : ''}
              show-checkbox={selectParams.multiple}
              filter-node-method={_filterFun}
              render-content={treeRenderFun}
              onNodeClick={_treeNodeClickFun}
              onCheck={_treeCheckFun}
            />
            {data.length === 0 && <div class="no-data">暂无数据</div>}
          </el-scrollbar>
        </el-popover>
      </div>
    )
  }
})

/* istanbul ignore next */
ufinTreeSelect.install = function(Vue) {
  Vue.component(ufinTreeSelect.name, ufinTreeSelect)
}

export default ufinTreeSelect
