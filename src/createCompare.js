import typename from './typename'

export default function createCompare(compares) {
  return function $compare(a, b) {
    let aTypename = typename(a)
    let bTypename = typename(b)
    const fn = (compares[aTypename] || {})[bTypename]
    if (!fn) {
      throw new Error(`Cannot compare type ${aTypename} with type ${bTypename}`)
    }
    return fn(a, b)
  }
}