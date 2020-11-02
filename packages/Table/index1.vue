<template>
  <el-table
    ref="table"
    class="ufin-table"
    :data="data"
    :size="size"
    border
    style="width: 100%"
    v-loading="loading"
    :selection-change="selectionChange"
  >
    <el-table-column
      type="selection"
      width="55"
      align="center"
      v-if="rowSelection"
    />
    <!-- 数据源 -->
    <template v-for="(column, index) in columns">
      <!-- 链接 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-if="column.scopeType === 'link'"
      >
        <template slot-scope="scope">
          <el-link
            :target="column.target"
            :href="column.href || getPropText(scope.row, column.prop)"
            v-if="column.target"
          >
            {{ getPropText(scope.row, column.prop) }}
          </el-link>
          <el-link @click="handleRoutePush(column, scope.row, $event)" v-else>
            {{ getPropText(scope.row, column.prop) }}
          </el-link>
        </template>
      </el-table-column>
      <!-- 点击事件 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'handle'"
      >
        <template slot-scope="scope">
          <el-link
            @click="handleEvent(column.type, scope.row, scope.$index, $event)"
          >
            {{ getPropText(scope.row, column.prop) }}
          </el-link>
        </template>
      </el-table-column>
      <!-- 状态开关 -->
      <el-table-column
        :min-width="column.minWidth || '100px'"
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'switch'"
        :render-header="column.renderHeader"
      >
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row[column.prop]"
            :disabled="disabledHandle(scope.row, column)"
            @change="handleEvent(column.type, scope.row, scope.$index, $event)"
          ></el-switch>
          <span
            class="switch-text"
            :class="{
              'jee-font-second-light':
                scope.row[column.prop] && !scope.row.disabled,
              'jee-font-hover': !scope.row.disabled
            }"
          >
            {{
              scope.row[column.prop]
                ? column.enableText || '启用'
                : column.disableText || '禁用'
            }}
          </span>
        </template>
      </el-table-column>
      <!-- 输入框 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'input'"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            @blur="sortInput(scope.row, column, $event)"
            v-model="scope.row[column.prop]"
            :disabled="scope.row.disabled || column.disabled"
          ></el-input>
        </template>
      </el-table-column>

      <!--  多行文本省略文字 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'ellipsis'"
      >
        <template slot-scope="scope">
          <ufinEllipsis :lines="column.lines || 1">
            {{
              column.formatter
                ? column.formatter(
                    scope.row,
                    column,
                    getPropText(scope.row, column.prop)
                  )
                : getPropText(scope.row, column.prop)
            }}
          </ufinEllipsis>
        </template>
      </el-table-column>

      <!-- 默认只显示文字 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="!column.scopeType"
      >
        <template slot-scope="scope">
          <span
            :class="{
              'is-disabled': scope.row.disabled,
              'ufin-table-column': true
            }"
          >
            {{
              column.formatter
                ? column.formatter(
                    scope.row,
                    column,
                    getPropText(scope.row, column.prop)
                  )
                : getPropText(scope.row, column.prop)
            }}
          </span>
        </template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'img'"
      >
        <template slot-scope="scope" v-if="getPropText(scope.row, column.prop)">
          <el-image
            class="t-radius"
            :style="column.style || { width: column.width || '40px' }"
            :src="
              column.hasPath
                ? getPropText(scope.row, column.prop)
                : $getPath(getPropText(scope.row, column.prop))
            "
            fit="contain"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <!-- boolean值 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'boolean'"
      >
        <template slot-scope="scope">
          <span>
            {{
              scope.row[column.prop] === '0' || !scope.row[column.prop]
                ? column.noText || '否'
                : column.yesText || '是'
            }}
          </span>
        </template>
      </el-table-column>
      <!-- 时间格式转换 -->
      <el-table-column
        :key="index"
        v-bind="column"
        min-width="175px"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'time'"
      >
        <template slot-scope="scope">
          {{
            scope.row[column.prop] &&
              $moment(scope.row[column.prop]).format(
                column.format || 'YYYY-MM-DD HH:mm:ss'
              )
          }}
        </template>
      </el-table-column>
      <!-- 自定义，通过插槽传入 -->
      <el-table-column
        :key="index"
        v-bind="column"
        :label="$t(column.label)"
        v-else-if="column.scopeType === 'slot'"
      >
        <template slot-scope="scope">
          <slot :name="column.prop" :scope="scope" :column="column"></slot>
        </template>
      </el-table-column>
    </template>

    <slot></slot>
  </el-table>
</template>

<script>
import ufinEllipsis from 'ufinComponents/Ellipsis'

export default {
  name: 'ufinTable',
  components: {
    ufinEllipsis
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    rowSelection: Boolean,

    size: String,
    data: [Array],
    loading: Boolean,
    selectionChange: Function,

    slots: [Array, Object]
  },
  methods: {
    // 获取多层字段
    getPropText(item, prop, formatProp) {
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
  }
}
</script>

<style></style>
