import compare from './compare'
import Range from './Range'
import LatLng from './LatLng'

describe('compare', () => {
  it('should compare string with string', () => {
    expect(compare('b', 'a')).toBe(1)
    expect(compare('a', 'b')).toBe(-1)
    expect(compare('a', 'a')).toBe(0)
  })
  it('should compare number with number', () => {
    expect(compare(1, 0)).toBe(1)
    expect(compare(0, 1)).toBe(-1)
    expect(compare(1, 1)).toBe(0)
  })
  it('should compare number with boolean', () => {
    expect(compare(1, false)).toBe(1)
    expect(compare(0, true)).toBe(-1)
    expect(compare(1, true)).toBe(0)
    expect(compare(0, false)).toBe(0)
  })
  it('should compare number with Range', () => {
    expect(compare(3, new Range(1, 2))).toBe(1)
    expect(compare(0, new Range(1, 2))).toBe(-1)
    expect(compare(1, new Range(1, 2))).toBe(-1 * 0) // jest seems to make a difference between 0 and -0
    expect(compare(2, new Range(1, 2))).toBe(-1 * 0) // jest seems to make a difference between 0 and -0
  })
  it('should compare boolean with boolean', () => {
    expect(compare(true, false)).toBe(1)
    expect(compare(false, true)).toBe(-1)
    expect(compare(true, true)).toBe(0)
    expect(compare(false, false)).toBe(0)
  })
  it('should compare boolean with number', () => {
    expect(compare(true, 0)).toBe(1)
    expect(compare(false, 1)).toBe(-1)
    expect(compare(true, 1)).toBe(0)
    expect(compare(false, 0)).toBe(0)
  })
  it('should compare Range with Range', () => {
    expect(compare(new Range(1, 2), new Range(-1, 0))).toBe(1)
    expect(compare(new Range(1, 2), new Range(3, 4))).toBe(-1)
    expect(compare(new Range(1, 2), new Range(0, 1))).toBe(0)
    expect(compare(new Range(1, 2), new Range(2, 3))).toBe(0)
  })
  it('should compare Range with number', () => {
    expect(compare(new Range(1, 2), 0)).toBe(1)
    expect(compare(new Range(1, 2), 3)).toBe(-1)
    expect(compare(new Range(1, 2), 1)).toBe(0)
    expect(compare(new Range(1, 2), 2)).toBe(0)
  })
  it('should compare LatLng with LatLng', () => {
    expect(compare(new LatLng(1, 2), new LatLng(0, 3))).toBe(1)
    expect(compare(new LatLng(1, 2), new LatLng(1, 1))).toBe(1)
    expect(compare(new LatLng(1, 2), new LatLng(2, 1))).toBe(-1)
    expect(compare(new LatLng(1, 2), new LatLng(1, 3))).toBe(-1)
    expect(compare(new LatLng(1, 2), new LatLng(1, 2))).toBe(0)
  })
})
