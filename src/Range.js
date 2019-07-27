import typename from './typename'

export default class Range {
  constructor(from, to) {
    this.from = from
    this.to = to
  }

  compare(other) {
    const type = typename(other)
    if (type === 'number') {
      return other < this.from ? 1 : other > this.to ? -1 : 0 
    }
    if (type === 'Range') {
      return this.from > other.to ? 1 : this.to < other.from ? -1 : 0
    }
    throw new Error(`Cannot compare Range with ${type}`)
  }
}