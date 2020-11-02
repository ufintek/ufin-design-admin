// 自定义指令
import Vue from 'vue'

// v-dialogDrag：弹窗拖拽指令
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    if (!binding.value) return false
    // 获取弹框头部
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    // 获取弹框整体
    const dragDom = el.querySelector('.el-dialog')
    // 弹框头部设置为可拖动cursor
    dialogHeaderEl.style.cursor = 'move'
    // 清除选择弹框头部文字效果
    dialogHeaderEl.onselectstart = new Function('return false')
    // 获取原有属性
    //  IE：dom元素.currentStyle
    //  火狐、谷歌： window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

    // 鼠标按下事件
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算鼠标点击位置距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      // 获取到的值带px，使用正则表达式匹配替换
      let styL, styT

      // 在IE中第一次获取到的值为组件自带50%，移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100)
      } else {
        styL = +sty.left.replace(/\px/g, '')
        styT = +sty.top.replace(/\px/g, '')
      }

      // 鼠标拖拽事件
      document.onmousemove = function(e) {
        // 移动时禁用默认事件
        e.preventDefault()

        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX
        const t = e.clientY - disY

        let finallyL = l + styL
        let finallyT = t + styT

        // 限制弹框可拖拽的区域
        // dragDom.offsetParent表示弹窗阴影部分
        let remainHalfWidth =
          (dragDom.offsetParent.clientWidth - dragDom.clientWidth) / 2

        if (finallyL < -remainHalfWidth) {
          finallyL = -remainHalfWidth
        } else if (finallyL > remainHalfWidth) {
          finallyL = remainHalfWidth
        }

        let domMarginTopStr = dragDom.style.marginTop
        let domMarginTopUnit = domMarginTopStr.slice(-2)
        let domMarginTopNum = domMarginTopStr.substring(
          0,
          domMarginTopStr.length - 2
        )
        let domMarginTop = 0
        if (domMarginTopUnit == 'vh') {
          domMarginTop =
            (dragDom.offsetParent.clientHeight / 100) * domMarginTopNum
        } else {
          domMarginTop = domMarginTopNum
        }
        let remainHeight =
          dragDom.offsetParent.clientHeight -
          dragDom.clientHeight -
          domMarginTop

        if (finallyT < -domMarginTop) {
          finallyT = -domMarginTop
        } else if (finallyT > remainHeight) {
          finallyT = remainHeight
        }

        // 移动弹框
        dragDom.style.left = `${finallyL}px`
        dragDom.style.top = `${finallyT}px`
      }

      // 鼠标抬起事件
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})

// v-dialogChange：弹窗拉伸指令
Vue.directive('dialogChange', {
  bind(el, binding, vnode, oldVnode) {
    if (!binding.value) return false
    // 获取弹框整体
    const dragDom = el.querySelector('.el-dialog')

    // 弹框可拉伸最小宽度
    let domWidthStr = '200px'
    let minWidth = domWidthStr.substring(0, domWidthStr.length - 2)

    // 弹框可拉伸最小高度
    let heightStr = '200px'
    let heightUnit = heightStr.slice(-2)
    let heightNum = heightStr.substring(0, heightStr.length - 2)
    let minHeight = 0
    if (heightUnit == 'vh') {
      minHeight = (document.body.clientHeight / 100) * heightNum
    } else {
      minHeight = heightNum
    }

    // 拉伸元素
    let resizeEl = document.createElement('div')
    resizeEl.style.cursor = 'se-resize'
    resizeEl.style.height = '10px'
    resizeEl.style.width = '10px'
    resizeEl.style.position = 'absolute'
    resizeEl.style.right = '0'
    resizeEl.style.bottom = '0'
    dragDom.appendChild(resizeEl)

    // 鼠标按下事件
    resizeEl.onmousedown = (e) => {
      // 记录初始x位置
      const clientX = e.clientX
      // 鼠标按下，计算鼠标点击位置距离可视区的距离
      const disX = e.clientX - resizeEl.offsetLeft
      const disY = e.clientY - resizeEl.offsetTop

      // 鼠标拖拽事件
      document.onmousemove = function(e) {
        // 移动时禁用默认事件
        e.preventDefault()

        // 通过事件委托，计算移动的距离
        const x = e.clientX - disX + (e.clientX - clientX)
        const y = e.clientY - disY

        let domMarginTopStr = dragDom.style.marginTop
        let domMarginTopUnit = domMarginTopStr.slice(-2)
        let domMarginTopNum = domMarginTopStr.substring(
          0,
          domMarginTopStr.length - 2
        )
        let domMarginTop = 0
        if (domMarginTopUnit == 'vh') {
          domMarginTop = (document.body.clientHeight / 100) * domMarginTopNum
        } else {
          domMarginTop = domMarginTopNum
        }
        let remainHeight = document.body.clientHeight - domMarginTop

        if (x < minWidth) {
          dragDom.style.width = minWidth + 'px'
        } else if (x > document.body.clientWidth) {
          dragDom.style.width = document.body.clientWidth + 'px'
        } else {
          dragDom.style.width = `${x}px`
        }

        if (y < minHeight) {
          dragDom.style.height = minHeight + 'px'
        } else if (y > remainHeight) {
          dragDom.style.height = remainHeight + 'px'
        } else {
          dragDom.style.height = `${y}px`
        }
      }

      // 鼠标抬起事件
      document.onmouseup = function(e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
})
