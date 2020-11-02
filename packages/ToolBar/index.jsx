import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import './index.scss'

import ufinIcon from '../Icon/index'

export const ufinToolBarProps = {
  //
  operation: PropTypes.object.def({
    search: true
  }),

  operationText: PropTypes.object.def({
    search: '查 询',
    reset: '重 置',
    refresh: '刷 新',
    add: '新 增',
    editToolBar: '编 辑',
    deleteToolBar: '删 除'
  })
}

const ufinToolBar = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Toolbar`,
  props: ufinToolBarProps,

  data() {
    return {
      collsaped: false
    }
  },

  render() {
    const { operation, operationText, collsaped, componentSize } = this

    // 切换更多搜索状态
    const onToggleMoew = () => {
      this.collsaped = !this.collsaped
    }

    // 搜索
    const onSearch = () => {
      this.$emit('search')
    }
    // 重置
    const onReset = () => {
      this.$emit('reset')
    }
    // 刷新
    const onRefresh = () => {
      this.$emit('refresh')
    }
    // 新增
    const onAdd = () => {
      this.$emit('add')
    }
    // 编辑
    const onEditToolBar = () => {
      this.$emit('editToolBar')
    }

    // 删除
    const onDeleteToolBar = () => {
      this.$emit('deleteToolBar')
    }

    const ufinToolBarPrefixCls = `${ufinComponentPrefixCls}-toolbar`

    const className = classNames(ufinToolBarPrefixCls)
    // 基础搜索条件
    if (this.$scopedSlots.default) {
      operation.search = true
    }
    // 更多搜索条件
    if (this.$scopedSlots.other) {
      operation.moreSearch = true
      operation.btnSearch = true
      operation.btnReset = true
    }

    return (
      <div class={className}>
        {operation && operation.search && (
          <el-form inline={true} size={componentSize}>
            {/* 基础搜索条件 */}
            {this.$scopedSlots &&
              this.$scopedSlots.default &&
              this.$scopedSlots.default()}
            {/* 其他搜索条件 */}
            {operation.moreSearch && collsaped && this.$scopedSlots.other()}

            {/* 搜索按钮 */}
            {operation.btnSearch && (
              <el-form-item>
                {/* 查询按钮 */}
                <el-button type="primary" onClick={onSearch}>
                  {operationText.search}
                </el-button>
                {/* 重置按钮 */}
                {operation.btnReset && (
                  <el-button onClick={onReset}>{operationText.reset}</el-button>
                )}
              </el-form-item>
            )}
            {/* 更多筛选条件按钮 */}
            {operation.moreSearch && (
              <el-form-item>
                <el-button type="text" onClick={onToggleMoew}>
                  {collsaped ? '收起' : '展开'}
                  <ufinIcon
                    size={0}
                    name={collsaped ? 'el-icon-arrow-up' : 'el-icon-arrow-down'}
                  />
                </el-button>
              </el-form-item>
            )}
          </el-form>
        )}

        {operation && (
          <div class="operate">
            {/* 刷新表格按钮 */}
            {operation.refresh && (
              <el-button
                size={componentSize}
                type="primary"
                onClick={onRefresh}
                v-if="operation && ">
                {operationText.refresh}
              </el-button>
            )}
            {/* 新建按钮 */}
            {operation.add && (
              <el-button
                size={componentSize}
                type="success"
                plain
                onClick={onAdd}>
                {operationText.add}
              </el-button>
            )}

            {/* 修改按钮 */}
            {operation.editToolBar && (
              <el-button
                size={componentSize}
                type="success"
                plain
                onClick={onEditToolBar}>
                {operationText.editToolBar}
              </el-button>
            )}

            {/* 删除 */}
            {operation.deleteToolBar && (
              <el-button size={componentSize} plain onClick={onDeleteToolBar}>
                {operationText.deleteToolBar}
              </el-button>
            )}
            {/* 其他操作按钮 */}
            {this.$scopedSlots &&
              this.$scopedSlots.otherOperate &&
              this.$scopedSlots.otherOperate()}
          </div>
        )}
      </div>
    )
  }
})

/* istanbul ignore next */
ufinToolBar.install = function(Vue) {
  Vue.component(ufinToolBar.name, ufinToolBar)
}

export default ufinToolBar
