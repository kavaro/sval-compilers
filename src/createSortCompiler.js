import { isString, isFunction } from 'lodash/lang'

export default function createSortCompiler(compile, compare) {
  return function compileSort(compileSortOptions = {}) {
    const {
      field = 'id',
      dir = 1,
      ...compileOptions
    } = compileSortOptions
    const dirMultiplier = dir >= 0 ? 1 : -1
    const { expression } = compileOptions
    if (!expression || (!isString(expression) && !isFunction(expression))) {
      return (a, b) => compare(a[field], b[field]) * dirMultiplier
    }
    const run = compile(compileOptions)
    return (a, b) => compare(run({ scope: a }), run({ scope: b })) * dirMultiplier
  }
}
