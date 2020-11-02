import ufinCreateComponent, { ufinComponentPrefixCls } from '../utils/component'
import PropTypes from '../utils/prop-types'
import classNames from 'classnames'

import ufinUploadExcel from './Excel'

const ufinUpload = ufinCreateComponent({
  name: `${ufinComponentPrefixCls}Upload`,
  data() {
    return {
      active: null
    }
  }
})

export { ufinUploadExcel }

ufinUpload.excel = ufinUploadExcel

export default ufinUpload
