import typename from './typename'

export default function createQueryCompiler(compileIterator, compileSort) {
  return function compileQuery(options = {}) {
    const { filter, sort } = options
    const filterFn = filter ? compileIterator(filter) : null
    const sortFn = sort ? compileSort(sort) : null
    return (list, { skip, limit } = {}) => {
      if (typename(list) !== 'Array') {
        return []
      }
      let t = Date.now()
      list = list.slice()
      if (filterFn) {
        list = list.filter(filterFn)
      }
      if (sortFn) {
        list = list.slice().sort(sortFn)
      }
      if (typename(skip) !== 'number') {
        skip = 0
      }
      if (typename(limit) !== 'number') {
        limit = list.length
      }
      const begin = Math.max(0, skip)
      const end = begin + Math.max(0, limit)
      return list.slice(begin, end)
    }
  }
}