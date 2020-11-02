import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'
import ElTable from 'element-ui/lib/table'
import { loading } from '@/plugins/axios/utils'
import ufinEllipsis from 'ufinComponents/Ellipsis'

import moment from 'moment'

const noop = function() {
  return Promise.resolve()
}

export const ufinTableProps = {
  ...ElTable.props,
  // 表格列定义，对象属性参数完全继承 el-table-column
  columns: PropTypes.array.def([]),

  // // 是否启用列拖拽排序, 可以配置Sortable个性化参数
  // columnSortable: PropTypes.oneOfType(PropTypes.array, PropTypes.bool).def(
  //   false
  // ),
  // // 是否启用列拖拽排序, 可以配置Sortable个性化参数
  // rowSortable: PropTypes.oneOfType(PropTypes.array, PropTypes.bool).def(false),

  // 滚动到距离底部多少距离触发 on-reach-bottom 事件， table需要设置高度才有效
  distanceToButton: PropTypes.number.def(50),
  // 处理打开filter事件，必须返回 Promise实例，如需要显示下拉字典时可以用到
  openFilter: PropTypes.func.def(noop),

  size: PropTypes.string,

  data: PropTypes.array.def([]),

  loading: PropTypes.bool.def(false),

  selectionChange: PropTypes.func.def(noop)
}

const ufinTable = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Table`,
  props: ufinTableProps,

  data() {
    return {
      // 表格列定义数组
      tableColumns: this.columns,

      // 表格行数据
      tableData: this.data,

      // 列拖拽Sortable实例
      columnSortableInstance: null,

      // 行拖拽Sortable实例
      rowSortableInstance: null,

      // 上次滚动的位置
      lastScrollTop: 0,

      // 筛选框的实例
      filterVM: {}
    }
  },

  watch: {
    data(val) {
      this.tableData = val
    },
    columns(val) {
      this.tableColumns = val
      const data = this.tableData
      this.tableData = []
      this.$nextTick(() => {
        this.tableData = data
      })
    }
  },
  computed: {
    // el-table 参数
    tableOptions() {
      let options = { ...this.$props }
      delete options.columns
      delete options.data
      delete options.columnSortable
      delete options.rowSortable
      delete options.distanceToButton
      delete options.openFilter
      return options
    },
    // 获取多层字段

    renderColumn() {
      return
    }
  },
  render() {
    const {
      loading,
      data,
      size,
      selectionChange,
      rowSelection,
      columns,
      $scopedSlots
    } = this

    const ufinTablePrefixCls = `${ufinComponentPrefixCls}-table`

    const className = classNames(ufinTablePrefixCls)

    const getPropText = (item, prop, formatProp) => {
      var i = prop.indexOf('.')
      if (i > -1) {
        var data = prop.split('.')
        var obj = item
        const loop = function(data) {
          if (data instanceof Array) {
            data.forEach((v) => {
              if (obj[v]) {
                obj = obj[v]
              } else {
                obj = ''
              }
            })
          }
        }
        loop(data)
        if (obj instanceof Array) {
          obj = obj.join(',')
        }
        return obj
      } else {
        if (item[prop] instanceof Array) {
          item[prop] = item[prop].join(',')
        }
        return item[prop]
      }
    }

    const renderBaseLink = (scope, column) => (
      <el-link
        target={column.target}
        href={column.href || getPropText(scope.row, column.prop)}>
        {getPropText(scope.row, column.prop)}
      </el-link>
    )

    const renderRouteLink = (scope, column) => (
      <el-link
        onClick={($event) =>
          handleRoutePush.bind(this, column, scope.row, $event)
        }>
        {getPropText(scope.row, column.prop)}
      </el-link>
    )

    const renderHandleColumn = (scope, column) => (
      <el-link
        onClick={($event) =>
          handleRoutePush.bind(
            this,
            column,
            column.type,
            scope.row,
            scope.$index,
            $event
          )
        }>
        {getPropText(scope.row, column.prop)}
      </el-link>
    )

    const renderSwitchColumn = (scope, column) => (
      <span>
        <el-switch
          {...{
            props: {
              value: scope.row[column.prop],
              disabled: disabledHandle(scope.row, column)
            },
            on: {
              input: (val) => {
                scope.row[column.prop] = val
              },
              change: ($event) =>
                handleEvent.call(
                  this,
                  column.type,
                  scope.row,
                  scope.$index,
                  $event
                )
            }
          }}
        />
        <span class="switch-text">
          {scope.row[column.prop]
            ? column.enableText || '启用'
            : column.disableText || '禁用'}
        </span>
      </span>
    )

    const renderInputColumn = (scope, column) => (
      <el-input
        size="small"
        {...{
          props: {
            value: scope.row[column.prop],
            disabled: scope.row.disabled || column.disabled
          },
          on: {
            input: (val) => {
              scope.row[column.prop] = val
            },
            blur: ($event) => sortInput.call(this, scope.row, column, $event)
          }
        }}
      />
    )

    const renderEllipsisColumn = (scope, column) => {
      return (
        <ufinEllipsis lines={column.lines || 1}>
          {column.formatter
            ? column.formatter(
                scope.row,
                column,
                getPropText(scope.row, column.prop)
              )
            : getPropText(scope.row, column.prop)}
        </ufinEllipsis>
      )
    }

    const renderTextColumn = (scope, column) => {
      return (
        <span
          class={classNames({
            'is-disabled': scope.row.disabled,
            'ufin-table-column': true
          })}>
          {column.formatter
            ? column.formatter(
                scope.row,
                column,
                getPropText(scope.row, column.prop)
              )
            : getPropText(scope.row, column.prop)}
        </span>
      )
    }

    const renderImageColumn = (scope, column) => (
      <el-image
        class="t-radius"
        style={column.style || { width: column.width || '40px' }}
        src={
          column.hasPath
            ? getPropText(scope.row, column.prop)
            : $getPath(getPropText(scope.row, column.prop))
        }
        fit="contain">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline" />
        </div>
      </el-image>
    )

    const renderBooleanColumn = (scope, column) => (
      <span>
        {scope.row[column.prop] === '0' || !scope.row[column.prop]
          ? column.noText || '否'
          : column.yesText || '是'}
      </span>
    )

    const renderTimeColumn = (scope, column) =>
      scope.row[column.prop] &&
      moment(scope.row[column.prop]).format(
        column.format || 'YYYY-MM-DD HH:mm:ss'
      )

    const renderSlotColumn = (scope, column) => {
      console.log('this.$scopedSlots[column.prop]')
      console.log($scopedSlots[column.prop]())
      return (
        $scopedSlots && $scopedSlots[column.prop] && $scopedSlots[column.prop]()
      )
    }

    const renderBaseColumn = (column, index) => {
      if (column.scopeType === 'slot') {
        return (
          $scopedSlots &&
          $scopedSlots[column.prop] &&
          $scopedSlots[column.prop]()[0]
        )
      }
      return (
        <el-table-column
          key={index}
          {...{
            props: {
              ...column,
              label: column.label
            },
            scopedSlots: {
              default: (scope) => {
                let TableColumn
                if (column.scopeType === 'link') {
                  TableColumn = column.target
                    ? renderBaseLink(scope, column)
                    : renderRouteLink(scope, column)
                } else if (column.scopeType === 'handle') {
                  TableColumn = renderHandleColumn(scope, column)
                } else if (column.scopeType === 'switch') {
                  TableColumn = renderSwitchColumn(scope, column)
                } else if (column.scopeType === 'input') {
                  TableColumn = renderInputColumn(scope, column)
                } else if (column.scopeType === 'ellipsis') {
                  TableColumn = renderEllipsisColumn(scope, column)
                } else if (column.scopeType === 'image') {
                  TableColumn = renderImageColumn(scope, column)
                } else if (column.scopeType === 'boolean') {
                  TableColumn = renderBooleanColumn(scope, column)
                } else if (column.scopeType === 'time') {
                  TableColumn = renderTimeColumn(scope, column)
                } else {
                  TableColumn = renderTextColumn(scope, column)
                }
                return TableColumn
              }
            }
          }}
        />
      )
    }

    const renderColumns = () => {
      const Columns = columns.map((column, index) => {
        // const Column;
        return renderBaseColumn(column, index)
      })
      console.log(Columns)
      return Columns
    }

    return (
      <el-table
        ref="table"
        class="ufin-table"
        data={data}
        size={size}
        border
        style="width: 100%"
        {...{
          props: {
            'selection-change': selectionChange
          },
          directives: [
            {
              name: 'loading',
              value: loading
            }
          ]
        }}>
        {/* selection */}
        {rowSelection && (
          <el-table-column
            type="selection"
            width="55"
            align="center"
            v-if="rowSelection"
          />
        )}

        {/* 数据源 */}

        {renderColumns()}

        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </el-table>
    )
  }
})

/* istanbul ignore next */
ufinTable.install = function(Vue) {
  Vue.component(ufinTable.name, ufinTable)
}

export default ufinTable
