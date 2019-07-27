import { isFunction } from 'lodash/lang'

export function mapFields(dst, src, map) {
  if (!map) {
    return Object.assign(dst, src)
  }
  if (isFunction(map)) {
    return map(dst, src)
  }
  if (isPlainObject(map)) {
    return Object.keys(src).reduce((obj, name) => {
      const value = obj[name]
      const field = map[name]
      if (isFunction(field)) {
        field(dst, src, name)
      } else {
        dst[isString(field) ? field : name] = value
      }
    }, dst)
  }
  return Object.assign(dst, src)
}

export function selectFields(src, fields) {
  return Object.keys(fields).reduce((dst, name) => {
    const field = fields[name]
    dst[name] = isFunction(field) ? field(src) : src[name]
  }, {})
}