// 搜索转换列表
export default function transQueryList(queryString, itemData) {
  var list = []
  for (const i of itemData) {
    // 当类型是对象时的处理情况
    if (typeof (i) === 'object') {
      // 在这里为这个数组中每一个对象加一个value字段, 因为autocomplete只识别value字段并在下拉列中显示
      list.push({ value: i.name })
      // 当类型是字符时的处理情况
    } else if (typeof (i) === 'string') {
      list.push({ value: i })
    }
  }
  list = queryString ? list.filter(createFilter(queryString)) : list
  return list
}
// 得到的数据列表再根据字符匹配筛选一次
export function createFilter(queryString) {
  return (result) => {
    return (result.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
  }
}
