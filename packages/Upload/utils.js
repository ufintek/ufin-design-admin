export const getFileType = (file) => {
  if (!(file instanceof File)) {
    return 'unknown'
  }
  const fileName = file.name
  var startIndex = fileName.lastIndexOf('.')
  if (startIndex != -1)
    return fileName.substring(startIndex + 1, fileName.length).toLowerCase()
  else return ''
}

/**
 * 判断文件是否是Excel类型的文件
 * @param {*} file
 */
export const isExcel = (file) => {
  // 获取文件的类型
  const fileType = getFileType(file)
  return fileType === 'xls' || fileType === 'xlsx'
}

export const getFileSize = (file) => {
  return file.size
}

export const validateFileSize = (file, maxSize, unit = 'MB') => {
  // 文件的大小
  const fileSize = getFileSize(file)
  // 判断文件大小
  let isLt2M = true
  if (Number(maxSize)) {
    const allowSize = unit === 'MB' ? 1024 * 1024 : 1024
    isLt2M = fileSize / allowSize < Number(maxSize)
  }

  return isLt2M
}
