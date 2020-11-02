import classNames from 'classnames'
import { isObject } from 'lodash'
import ufinCreateComponent, {
  ufinComponentPrefixCls,
  getOptionProps
} from '../utils/component'
import PropTypes from '../utils/prop-types'



import ufinTable from '../Table/index'

import './index.scss'

import ufinCurdToolbar, { ufinCurdToolbarProps } from './CurdToolbar'

import ufinCurdPagination, { ufinCurdPaginationProps } from './CurdPagination'

const ufinCurdTableProps = {
  rowSelection: PropTypes.bool.def(true),
  // 初始化查询条件
  filters: PropTypes.object,

  api: PropTypes.func,
  // 显示分页
  showPagination: PropTypes.bool.def(true)
}

export const ufinCurdProps = {
  // 表格列定义，对象属性参数完全继承 el-table-column
  columns: PropTypes.array.def([]),

  muliteRemoveApi: PropTypes.func,

  muliteRemoveProps: PropTypes.object.def({}),

  ...ufinCurdToolbarProps,

  ...ufinCurdTableProps,

  ...ufinCurdPaginationProps
}

const ufinCurd = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Curd`,
  props: ufinCurdProps,
  data() {
    return {
      tableColumnHeight: 'small',

      needTotalList: [],

      selectedRows: [],
      selectedRowKeys: [],

      localLoading: false,
      localDataSource: [],
      localPagination: { ...this.pagination }
    }
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    'localPagination.current'(val) {
      this.selectedRowKeys = []
      this.selectedRows = []
    },
    current(val) {
      Object.assign(this.localPagination, {
        current: val
      })
    },
    size(val) {
      Object.assign(this.localPagination, {
        size: val
      })
    }
  },
  methods: {
    /**
     * 生成 CURD 的组件
     */
    renderPagination() {},

    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      // eslint-disable-next-line no-unused-expressions
      bool &&
        (this.localPagination = {
          ...{
            current: 1,
            size: this.pagination
              ? this.pagination.size
              : this.localPagination.size
          }
        })
      this.loadData()
    },

    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters, sorter) {
      this.localLoading = true

      let params = {
        current:
          (pagination && pagination.current) ||
          (this.showPagination && this.localPagination.current) ||
          this.current,
        size:
          (pagination && pagination.size) ||
          (this.showPagination && this.localPagination.size) ||
          this.size
      }
      // 排序
      if (sorter && sorter.field) {
        params.sorter = sorter.field
      }
      // 排序
      if (sorter && sorter.order) {
        params.order = sorter.order
      }
      // 其他的判断条件
      // eslint-disable-next-line no-unused-expressions
      filters &&
        isObject(filters) &&
        (params = {
          ...params,
          ...filters
        })

      // 发送HTTP请求
      const result = this.api(params)
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if (
        (typeof result === 'object' || typeof result === 'function') &&
        typeof result.then === 'function'
      ) {
        result.then((resp) => {
          // 关闭 loading
          this.localLoading = false

          // 加载数据异常
          if (resp.status !== '0') {
            return
          }

          const { data } = resp

          // 保存当前的分页数据
          // eslint-disable-next-line no-unused-expressions
          this.showPagination &&
            (this.localPagination = {
              ...this.localPagination,
              current: data.current, // 返回结果中的当前分页数
              total: data.total, // 返回结果中的总记录数
              size: (pagination && pagination.size) || this.localPagination.size
            })

          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (
            data.records.length === 0 &&
            this.showPagination &&
            this.localPagination.current > 1
          ) {
            this.localPagination.current -= 1
            this.loadData()
            return
          }

          this.localDataSource = data.records // 返回结果中的数组数据

          this.$emit('load', data)
        })
      }
    },

    /**
     * 点击批量删除按钮
     */
    handleClickMultiRemove() {
      // 第一步获取入参
      if (!this.muliteRemoveApi) {
        this.$emit('multiremoves', {
          params: this.selectedRows,
          callback: this.loadData
        })
      } else {
        // 如果自定义了
        let ids = this.selectedRows.map(
          (item) => item[this.muliteRemoveProps.id]
        )
        let names = this.selectedRows.map(
          (item) => item[this.muliteRemoveProps.name]
        )
        let params = new FormData()
        params.append('ids', ids)

        const h = this.$createElement
        // 生成提示信息：`是否永久删除以下数据:(共${names.length}个)？
        const tipsMessage = h('p', null, [
          h('span', null, '是否永久删除'),
          h(
            'span',
            {
              attrs: {
                style: 'color:red;'
              }
            },
            `${names.join(',')}`
          ),
          h('span', null, ' 这些数据？')
        ])
        // 点击确认 进行删除操作
        const _deleteSubmitFn = (_) => {
          const loading = this.$loading({
            lock: true,
            text: '删除中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)'
          })

          this.muliteRemoveApi(params)
            .then(({ status, data, errorMsg, errorCode }) => {
              loading.close()
              if (status !== '0') {
                this.$message({
                  message: `${errorMsg}`,
                  type: 'error'
                })
                return
              }
              this.loadData()
              this.$message({
                message: '删除数据成功',
                type: 'success'
              })
            })
            .catch((_) => {
              this.$message({
                message: '删除数据失败。请联系管理员',
                type: 'error'
              })
              loading.close()
            })
        }
        this.$confirm(tipsMessage, '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            _deleteSubmitFn()
          })
          .catch(() => {})
      }
    },

    handleClickClearSelectedRows() {
      this.$refs.table.clearSelection()
      this.selectedRows = []
    },

    handleSizeChange(size) {
      this.pageSizeChange && this.pageSizeChange(size)

      // 修改size的大小
      this.localPagination.size = size
      this.loadData()
    },

    handleCurrentChange(size) {
      this.pageCurrentChange && this.pageCurrentChange(size)

      // 修改size的大小
      this.localPagination.current = size
      this.loadData()
    },

    renderAlert(tableCls) {
      const alertCls = classNames(`${tableCls}-alert`)

      // 绘制统计列数据
      // const needTotalItems = this.needTotalList.map((item) => {
      //   return (
      //     <span style="margin-right: 12px">
      //       {item.title}总计{' '}
      //       <a style="font-weight: 600">
      //         {!item.customRender ? item.total : item.customRender(item.total)}
      //       </a>
      //     </span>
      //   )
      // })

      // 绘制 清空 按钮
      // const clearItem =
      //   typeof this.alert.clear === 'boolean' && this.alert.clear
      //     ? this.renderClear(this.clearSelected)
      //     : this.alert !== null && typeof this.alert.clear === 'function'
      //     ? this.renderClear(this.alert.clear)
      //     : null

      // 绘制 alert 组件
      return (
        <el-alert showIcon={true} type="info" closable={false}>
          <template slot="title">
            <div class={alertCls}>
              <div class={`${alertCls}__title`}>
                <span>已选择</span>
                <span class="ufin-text yfin-blod">
                  {this.selectedRows.length}
                </span>
                <span>项</span>
              </div>
              <div class={`${alertCls}__actions`}>
                <el-button
                  type="text"
                  disabled={!this.selectedRows.length}
                  onClick={this.handleClickMultiRemove.bind(this)}>
                  删除
                </el-button>

                <el-button
                  type="text"
                  disabled={!this.selectedRows.length}
                  onClick={this.handleClickClearSelectedRows.bind(this)}>
                  清空
                </el-button>
              </div>
            </div>
          </template>
        </el-alert>
      )
    },
    /**
     * 表格密度设置
     * @param {*} tableColumnHeight
     */
    handleChangeTableSize(tableColumnHeight) {
      this.tableColumnHeight = tableColumnHeight
    }
  },

  created() {
    if (this.filters && isObject(this.filters)) {
      this.loadData(undefined, this.filters)
    } else {
      this.loadData()
    }
  },
  render() {
    const props = getOptionProps(this)

    const { rowSelection, toolbar } = props

    const {
      localDataSource,
      localLoading,
      tableColumnHeight,
      refresh,
      handleChangeTableSize
    } = this

    const ufinPageHeaderPrefixCls = `${ufinComponentPrefixCls}-curd`
    // table class
    const componentCls = classNames(ufinPageHeaderPrefixCls, {})

    const tableCls = classNames(`${componentCls}--table`)

    const handleSelectionChange = (val) => {
      // eslint-disable-next-line no-useless-return
      if (!rowSelection) return
      this.$emit('selection_change', val)

      this.selectedRows = val
    }

    // 标题的标题
    const renderTable = (
      <ufinTable
        data={localDataSource}
        loading={localLoading}
        selectionChange={handleSelectionChange}
        size={tableColumnHeight}
        columns={this.columns}
        rowSelection
        {...{
          scopedSlots: { ...this.$scopedSlots }
        }}>
        {Object.keys(this.$slots).map((name) => (
          <template slot={name} sclot-scope="scope">
            {this.$slots[name]}
          </template>
        ))}
      </ufinTable>
    )

    return (
      <div class={componentCls}>
        {toolbar && (
          <ufinCurdToolbar
            {...{
              props: {
                ...props,
                handleTableHeightChange: handleChangeTableSize,
                handleRefresh: refresh
              },
              scopedSlots: this.$scopedSlots
            }}
          />
        )}
        {this.selectedRows.length ? this.renderAlert(componentCls) : ''}
        <div class={tableCls}>
          <div class={classNames(`${tableCls}--container`)}>{renderTable}</div>
        </div>
        <ufinCurdPagination
          {...{
            props: {
              pageSize: this.localPagination.size,
              pageTotal: this.localPagination.total,
              pageCurrent: this.localPagination.current,
              pagination: this.localPagination
            },
            scopedSlots: this.$scopedSlots,
            on: {
              'size-change': this.handleSizeChange.bind(this),
              'current-change': this.handleCurrentChange.bind(this)
            }
          }}
        />
      </div>
    )
  }
})

/* istanbul ignore next */
ufinCurd.install = function(Vue) {
  Vue.component(ufinCurd.name, ufinCurd)
}

export default ufinCurd
