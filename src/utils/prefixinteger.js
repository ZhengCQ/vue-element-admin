
// 输出数字的固定长度，其余用0补充

export function prefixInteger(num, length) {
  return ((Array(length).join('0') + num).slice(-length))
}
