export default function createIteratorCompiler(compile) {
  return function compileIterator(compileIteratorOptions = {}) {
    const {
      item = 'item',
      index = 'index',
      list = 'list',
      odd = 'odd',
      even = 'even',
      onRunError,
      expressionExportKey,
      ...compileOptions
    } = compileIteratorOptions
    const run = compile(compileOptions)
    return ($item, $index, $list) => {
      const $even = $index % 2 === 0
      const $odd = !$even
      const scope = {
        [item]: $item, 
        [index]: $index, 
        [list]: $list, 
        [even]: $even, 
        [odd]: $odd, 
        ...$item
      }
      return run({ scope, onError: onRunError, expressionExportKey })
    }
  }
}
